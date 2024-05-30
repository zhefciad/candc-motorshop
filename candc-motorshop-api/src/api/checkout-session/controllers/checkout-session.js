"use strict";

const axios = require("axios");
const { createCoreController } = require("@strapi/strapi").factories;

function extractOrderDetails(jsonData) {
  const orderDetails = {};

  // 1. Order ID
  orderDetails.order_id = jsonData.data.id;

  // 2. Order Date/Time (Converting UNIX timestamp to readable format)
  const orderTime = jsonData.data.attributes.created_at;
  orderDetails.order_date_time = new Date(orderTime * 1000).toISOString();


  // 4. Customer Information
  const billingInfo = jsonData.data.attributes.billing;
  orderDetails.customer_info = {
    name: billingInfo.name,
    email: billingInfo.email,
    phone: billingInfo.phone,
    address: billingInfo.address,
  };

  // 5. Order Total
  const paymentIntent = jsonData.data.attributes.payment_intent.attributes;
  orderDetails.order_total = paymentIntent.amount;

  // 6. Line Items
  orderDetails.line_items = jsonData.data.attributes.line_items;

  // 7. Payment Method
  // The JSON does not provide a specific payment method used, so taking available methods for now.
  orderDetails.payment_method = jsonData.data.attributes.payment_method_types.join(", ");

  // 8. Payment Status
  switch (paymentIntent.status) {
    case 'awaiting_payment_method':
    case 'awaiting_next_action':
    case 'processing':
      orderDetails.payment_status = 'Processing';
      break;
    case 'succeeded':
      orderDetails.payment_status = 'Paid';
      break;
    default:
      console.error("Unexpected paymentIntent.status:", paymentIntent.status);
      orderDetails.payment_status = 'n/a';  // You can set a default or handle this case as required.
      break;
  }

  orderDetails.payment_intent_id = jsonData.data.attributes.payment_intent.id;


  return orderDetails;
}


module.exports = createCoreController(
  "api::checkout-session.checkout-session",
  ({ strapi }) => ({
    async create(ctx) {
      const { products, user, formValues } = ctx.request.body;
      const lineItems = products.map((product) => ({
        amount: Math.round(product.price * 100),
        currency: "PHP",
        description: product.desc.substring(0, 249),
        name: product.title,
        quantity: product.quantity,
        images: [product.imgLink],
        imgId: product.imgId
      }));

      console.log(products)
      console.log(formValues, "formValues");
      console.log(lineItems)
      const options = {
        method: "POST",
        url: "https://api.paymongo.com/v1/checkout_sessions",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Basic c2tfdGVzdF9Tc1FMZWplUlZEZlZza1pldldxNER0a3U6",
        },
        data: {
          data: {
            attributes: {
              billing: {
                address: {
                  country: "PH",
                  city: formValues.city,
                  line1: formValues.address,
                  postal_code: formValues.zip,
                  state: formValues.province,
                },
                email: formValues.email,
                name: formValues.name,
                phone: formValues.mobileNumber,
              },

              line_items: lineItems,
              payment_method_types: ["card", "gcash"],
              send_email_receipt: false,
              show_description: true,
              show_line_items: true,
              cancel_url: "http://localhost:5173/checkout-session",
              success_url: "http://localhost:5173/",
              description: `Anciado Furniture`,
            },
          },
        },
      };

      try {
        const response = await axios.request(options);
        const source = response.data;
        console.log(source, "HAHAHHAHAHHA");

        console.log(source.data.id, "hhaha");
        await strapi
          .service("api::checkout-session.checkout-session")
          .create({
            data: {
              products,
              paymongo_checkout_id: source.data.id,
              customer_name: `${user.first_name} ${user.last_name}`,
            },
          });



      try {
 

      if (true) {
        const orderDetails = extractOrderDetails(source);
        console.log(orderDetails, "ORDER DEETS")

        const createdOrder = await strapi.service("api::order.order").create({
          data: {
            order_id: orderDetails.order_id,
            order_date_time: orderDetails.order_date_time,
            customer_info: orderDetails.customer_info,
            order_total: orderDetails.order_total / 100,
            payment_method: "n/a",
            payment_status: "Processing",
            payment_intent_id: orderDetails.payment_intent_id
          },
        });

        for (const lineItem of orderDetails.line_items) {
          const url = lineItem.images[0];
          const fullFilename = url.split("/").pop();


          const intermediateFilename = fullFilename.replace(/_/g, "-");

          const filename = intermediateFilename.replace(
            /-[a-f0-9]{8,}(?=\.[a-z]{3,4}$)/i,
            ""
          );

          console.log("Extracted and Cleaned Filename:", filename);


          try {
            const files = await strapi.entityService.findMany(
              "plugin::upload.file",
              {
                filters: {
                  name: filename,
                },
              }
            );

            let mediaId = null;

            if (files.length > 0) {
              mediaId = files[0].id;
              console.log("Media ID:", mediaId);
            } else {
              console.log("File not found");
              console.log("Searched Filename:", filename);
            }

            const data = {
              order: createdOrder.id,
              amount: lineItem.amount / 100,
              currency: lineItem.currency,
              description: lineItem.description,
              images: mediaId,
              imageLink: url,
              name: lineItem.name,
              quantity: lineItem.quantity,
              shipping_status: "Pending",
              customer_info: orderDetails.customer_info,
              customer_name: orderDetails.customer_info.name,
              customer_email: orderDetails.customer_info.email,
              payment_status: orderDetails.payment_status,
              payment_intent_id: orderDetails.payment_intent_id
            };

            await strapi.service("api::order-item.order-item").create({ data });

            console.log(data, "Data passed to create OrderItem");
          } catch (err) {
            console.error("Error details:", err.details);
            console.error(err);
          }
        }
      }
  
      

    } catch (error) {
      console.error("Error details:", error.details);
      console.error(error);
      
    }

          
        // await populatePurchases()

        ctx.send({ source });
      } catch (error) {
        console.log(lineItems);
        console.error(error, "heheheh");
        console.error(error.response.data, "AHHAHAH"); // Print the API response data
        ctx.badRequest(error);
      }
    },
  })
);
