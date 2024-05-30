import React from "react";
import "./Cart.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { makeRequest } from "../../makeRequest";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers";
const Cart = () => {
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
        
      });

      console.log(response.data)
      const checkoutUrl = response.data.source.data.attributes.checkout_url;
      window.location.replace(checkoutUrl);
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <div className="cart" >
      <h1>Your cart</h1>

<hr />
      <div className={ products.length === 0 ? "cartWrapper cartEmpty" : "cartWrapper"} >
    { products.length === 0 ? 
      <h3 className="emptyCart">Your cart is empty</h3>
:

      products?.map((item, index) => (
        <div className="itemWrapper" key={index}>

        <div className="item" key={item.id}>
          <div className="itemSubWrapper"></div>
          <div className="imgWrapper">
            <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.img} alt="" />
          </div>
          <div className="detailsWrapper">
            <h1>{item.title}</h1>
            <h4><span style={{fontSize: "14px"}}>x</span>{item.quantity}</h4>
          </div>

        </div>
      <div className="deleteWrapper">
      <h3><span style = {{fontFamily: "Arial", fontSize: "15px"}}>₱</span>{item.price}</h3>
      <DeleteOutlineOutlinedIcon className="deleteItem" onClick={() => dispatch(removeItem(item.id))} />
    </div>

        </div>
  
      ))

    }


      </div>

      <hr />
      <div className="total">
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
          
          // if (getToken()){

          //   handlePayment()

          // }else{
          //   console.log("did i ran or nah?")
          //   navigate("/signin", { replace: true });
          // }
 
          if(getToken() && products.length > 0){
            
            navigate("/checkout", { replace: true });
          }
          
    
        
        }}
      >
        Continue to Checkout
      </Button>
      <span className="reset" onClick={() => {
        console.log(products)
        dispatch(resetCart())
      }}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
