import React from "react";
import "./WhyUs.scss";
import GppGoodIcon from "@mui/icons-material/GppGood";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import chooseImg from '../../assets/choose.png'
const WhyUs = () => {
  return (
    <div className="WhyUs">
      <div className="topWrapper">
        <h2>Why <br/> <span style = {{color: '#f3712b'}}>Choose</span>  Us</h2>
        <p>
          We strive to provide our customers with the best possible shopping
          experience
        </p>
        <div className="imageFill">
        <hr/>
           <img src= {chooseImg} alt="" />
        </div>
      </div>
      <div className="bottomWrapper">
        <div className="leftWhy">
          <div className="logoWrapper">
            <GppGoodIcon sx={{color: "#f3712b"}} />
          </div>
          <div className="leftWhyDesc">
            <h3>2 Years Warranty</h3>
            <p>
              We stand behind the quality of our products and offer a warranty
              on all our furniture pieces. Rest easy knowing that your
              investment is protected
            </p>
          </div>
        </div>

        <div className="middleWhy">
          <div className="logoWrapper">
            <CreditScoreIcon sx={{color: "#f3712b"}}/>
          </div>
          <div className="middleWhyDesc">
            <h3>Affordable Price</h3>
            <p>
              We believe that quality furniture should be accessible to
              everyone. That's why we offer a wide range of products at
              affordable prices
            </p>
          </div>
        </div>

        <div className="rightWhy">
          <div className="logoWrapper">
            <LocalShippingIcon sx={{color: "#f3712b"}}/>
          </div>
          <div className="rightWhyDesc">
            <h3>Free Shipping</h3>
            <p>
              We really understand our customers, so we will free shipping cost
              to any location quickly and safely. Enjoy free shipping on all
              orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
