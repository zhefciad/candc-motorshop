import React, { useEffect } from "react";
import CartCheckoutCSS from "./CartCheckout.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { makeRequest } from "../../makeRequest";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers";
import { setSessionId } from "../../redux/checkoutSessionReducer";

const CartCheckout = ({triggerPayment, setTriggerPayment, formValues, setClickedPayment, formValid}) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, setUser } = useAuthContext();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  const handlePayment = async () => {
    try {
      const response = await makeRequest.post("/checkout-sessions", {
        user,
        products,
        formValues
      });
      
      console.log(response.data, "RESPONSE!!!!!!!")
      const checkoutUrl = response.data.source.data.attributes.checkout_url;
      dispatch(setSessionId(response.data.source.data.id))
      // const checkoutStatus = response.data.source.data.attributes.payment_intent.attributes.status;  
      // console.log(response.data.source.data.attributes.payment_intent.attributes.status)
      //awaiting_payment_method //succeeded
      window.location.replace(checkoutUrl);
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {

    console.log(triggerPayment, "wtf")
    if (triggerPayment === true){
      handlePayment()
    }

    setTriggerPayment(false)
    

  }, [triggerPayment])
  

  return (
    <div className={CartCheckoutCSS.cart} >
  


<div className={products.length === 0 ? CartCheckoutCSS.cartWrapper + ' ' + CartCheckoutCSS.cartEmpty : CartCheckoutCSS.cartWrapper}>
    { products.length === 0 ? 
      <h3 className={CartCheckoutCSS.emptyCart}>Your cart is empty</h3>
:

      products?.map((item, index) => (
        <div className={CartCheckoutCSS.itemWrapper} key={index}>

        <div className={CartCheckoutCSS.item} key={item.id}>
          <div className={CartCheckoutCSS.itemSubWrapper}></div>
          <div className={CartCheckoutCSS.imgWrapper}>
            <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.img} alt="" />
          </div>
          <div className={CartCheckoutCSS.detailsWrapper}>
            <h1>{item.title}</h1>
            <h4><span style={{fontSize: "14px"}}>x</span>{item.quantity}</h4>
          </div>

        </div>
      <div className={CartCheckoutCSS.deleteWrapper}>
      <h3><span style = {{fontFamily: "Arial", fontSize: "15px"}}>₱</span>{item.price}</h3>
      <DeleteOutlineOutlinedIcon sx={{color: "#3e424b"}} className={CartCheckoutCSS.deleteItem} onClick={() => dispatch(removeItem(item.id))} />
    </div>

        </div>
  
      ))

    }


      </div>

      <hr />
      <div className={CartCheckoutCSS.total}>
        <span>Subtotal</span>
        <span><span style = {{fontFamily: "Arial", fontSize: "15px"}}>₱</span>{totalPrice()}</span>
      </div>
  
      <Button
        variant="contained"
        fullWidth
        disableElevation
   
        sx={{
          padding: "0.5rem",
          background: "linear-gradient(to right, #f47b39 0%, #f47b39 100%)",
          "&:hover": {
            background: "linear-gradient(to right, #ed7737 0%, #eb7536 100%)",
          },
          fontFamily: "Poppins",
          borderRadius: "5px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          textTransform: "none",
        }}
        onClick={() => {
          

    
            setClickedPayment(true)
            setTimeout(() => {
              setClickedPayment(false)
            }, 1000);
        

    

          

        
        }}
      >
        {formValues.paymentMethod === "online" ? `Continue to Payment` : `Complete Order`}

      </Button>
      <span className={CartCheckoutCSS.reset} onClick={() => {
        console.log(products)
        dispatch(resetCart())
      
      }}>
        Reset Cart
      </span>
    </div>
  );
};

export default CartCheckout;
