"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
function extractOrderDetails(jsonData) {
  const orderDetails = {};
  console.log(jsonData, "json data in function");
  // 1. Order ID
  orderDetails.order_id = jsonData.data.attributes.data.id;

  // 2. Order Date/Time (Converting UNIX timestamp to readable format)
  const orderTime = jsonData.data.attributes.data.attributes.paid_at;
  orderDetails.order_date_time = new Date(orderTime * 1000).toISOString();


  // 4. Customer Information
  const billingInfo = jsonData.data.attributes.data.attributes.billing;
  orderDetails.customer_info = {
    name: billingInfo.name,
    email: billingInfo.email,
    phone: billingInfo.phone,
    address: billingInfo.address,
  };

  // 5. Order Total
  const paymentIntent =
    jsonData.data.attributes.data.attributes.payment_intent.attributes;
  orderDetails.order_total = paymentIntent.amount;

  // 6. Line Items
  orderDetails.line_items = jsonData.data.attributes.data.attributes.line_items;

  // 7. Payment Method
  orderDetails.payment_method =
    jsonData.data.attributes.data.attributes.payment_method_used;

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

  return orderDetails;
}

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  // handleWebhook: async (ctx) => {
  //   try {
  //     const eventData = ctx.request.body;

  //     // console.log(eventData, "EVENT DATA!")
  //     if (
  //       eventData?.data?.attributes?.type === "checkout_session.payment.paid"
  //     ) {
  //       const orderDetails = extractOrderDetails(eventData);

  //       const createdOrder = await strapi.service("api::order.order").create({
  //         data: {
  //           order_id: orderDetails.order_id,
  //           order_date_time: orderDetails.order_date_time,
  //           customer_info: orderDetails.customer_info,
  //           order_total: orderDetails.order_total / 100,
  //           payment_method: orderDetails.payment_method,
  //           payment_status: orderDetails.payment_status,
  //         },
  //       });

  //       for (const lineItem of orderDetails.line_items) {
  //         const url = lineItem.images[0];
  //         const fullFilename = url.split("/").pop();


  //         const intermediateFilename = fullFilename.replace(/_/g, "-");

  //         const filename = intermediateFilename.replace(
  //           /-[a-f0-9]{8,}(?=\.[a-z]{3,4}$)/i,
  //           ""
  //         );

  //         console.log("Extracted and Cleaned Filename:", filename);


  //         try {
  //           const files = await strapi.entityService.findMany(
  //             "plugin::upload.file",
  //             {
  //               filters: {
  //                 name: filename,
  //               },
  //             }
  //           );

  //           let mediaId = null;

  //           if (files.length > 0) {
  //             mediaId = files[0].id;
  //             console.log("Media ID:", mediaId);
  //           } else {
  //             console.log("File not found");
  //             console.log("Searched Filename:", filename);
  //           }

  //           const data = {
  //             order: createdOrder.id,
  //             amount: lineItem.amount / 100,
  //             currency: lineItem.currency,
  //             description: lineItem.description,
  //             images: mediaId,
  //             imageLink: url,
  //             name: lineItem.name,
  //             quantity: lineItem.quantity,
  //             shipping_status: "Pending",
  //             customer_info: orderDetails.customer_info,
  //             customer_name: orderDetails.customer_info.name,
  //             customer_email: orderDetails.customer_info.email,
  //             payment_status: orderDetails.payment_status
  //           };

  //           await strapi.service("api::order-item.order-item").create({ data });

  //           console.log(createdOrder.id, "ID of order");
  //           console.log(createdOrder, "Full createdOrder object");
  //           console.log(data, "Data passed to create OrderItem");
  //         } catch (err) {
  //           console.error("An error occurred:", err);
  //         }
  //       }
  //     }
  //     ctx.status = 200;
  //     ctx.body = "Webhook event processed successfully";

  //   } catch (error) {
  //     // Handle any errors that occur during event processing
  //     console.error(error);
  //     console.error("Error details:", error.details);
  //     ctx.throw(500, "Error processing webhook event");
  //   }
  // },

  handleWebhook: async (ctx) => {
    try {
      const eventData = ctx.request.body;
      const newPaymentId = eventData?.data?.attributes?.data?.attributes?.payment_intent_id;

      console.log(newPaymentId, "new")
      console.log(eventData?.data?.attributes?.type, "type")

      if (eventData?.data?.attributes?.type === "payment.paid" || eventData?.data?.attributes?.type === "payment.failed") {
        // 1. Find the order item with the matching payment_intent_id
     
     
        const existingOrderItem = await strapi.entityService.findMany('api::order-item.order-item', {
          filters: { payment_intent_id: newPaymentId }
        });
       
        const existingOrder = await strapi.entityService.findMany('api::order.order', {
          filters: { payment_intent_id: newPaymentId }
        });
        // 2. If found, update the order item
        if (existingOrderItem) {


       
          console.log(existingOrderItem, "order item found")
          console.log("ID to update:", existingOrderItem[0].id);
          const updatedOrderItem = await strapi.entityService.update('api::order-item.order-item', existingOrderItem[0].id, {
            data: {
              payment_status: eventData?.data?.attributes?.type === "payment.paid" ? "Paid" : "Failed"
            }
          });
          console.log(`Updated order with ID ${updatedOrderItem.id} with ${eventData?.data?.attributes?.type === "payment.paid" ? "PAID" : "FAILED"}`);
       
        
        }else {
          console.warn(`Order item not found for payment_intent_id: ${newPaymentId}`);
        }

        if(existingOrder){

          console.log(existingOrder, "order found")
          console.log("ID to update:", existingOrder[0].id);
          const updatedOrder = await strapi.entityService.update('api::order.order', existingOrder[0].id, {
            data: {
              payment_status: eventData?.data?.attributes?.type === "payment.paid" ? "Paid" : "Failed"
            }
          });
          console.log(`Updated order with ID ${updatedOrder.id} with ${eventData?.data?.attributes?.type === "payment.paid" ? "PAID" : "FAILED"}`);
       
       
        }else {
          console.warn(`Order item not found for payment_intent_id: ${newPaymentId}`);
        }
      }
      
      ctx.status = 200;
      ctx.body = "Webhook event processed successfully";

      if (strapi.io) {
        // Notify all connected clients to refresh their data
        strapi.io.emit('dataUpdated');
      }
    } catch (error) {
      // Handle any errors that occur during event processing
      console.error(error);
      console.error("Error details:", error.details);
      ctx.throw(500, "Error processing webhook event");
    }
  },

  
}));
