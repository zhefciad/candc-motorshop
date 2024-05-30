import React, { useLayoutEffect } from "react";
import "./AboutUs.scss";
import ceo from "../../assets/ceo.jpg"
import TeamCard from "../../components/TeamCard/TeamCard";
import { East } from "@mui/icons-material";
import { Button } from "@mui/material";
const ScrollToTopOnRender = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};
const AboutUs = () => {
  return (
    
    <div className="aboutUs">
<ScrollToTopOnRender/>
<div className="topAboutUs">

<div className="aboutHeader">
        <h1>Everything <span>you</span> need to make your home truly yours.</h1>
      </div>

      <div className="aboutCaption">
    
        <p>
        Welcome to Anciado Furniture, a growing family-owned business dedicated to creating beautiful and functional furniture. With a commitment to quality craftsmanship, we strive to bring elegance and style to your living spaces. Explore our curated collection or get in touch with us and let us help you transform your home with our carefully designed pieces.        </p>
      </div>

      <Button
        variant="contained"
        className="catButton"
        disableElevation
        sx={{
            marginTop: "35px",
          padding: "0.75rem 0.8rem",
          background: "linear-gradient(to right, #ff772d 0%, #ff772d 100%)",
          "&:hover": {
            background: "linear-gradient(to right, #f3712b 0%, #f3712b 100%)",
          },
            
          fontFamily: "Poppins",
          borderRadius: "5px",
          boxShadow: "rgba(1, 1, 1, 0.1) 0px 0.5px 14px 0px",
          textTransform: "none",
          color: "#ffffff",
          whiteSpace: "noWrap"
        }}
      >
            
      Get In Touch
           

        <East sx = {{marginLeft: "10px"}} fontSize="small"/>
      </Button>

</div>

    <div className="teamSection">
        <h2>Meet our team </h2>
        <p>To become the company the customers want,   it takes a group of passionate people. Get to know the people who lead</p>
    </div>
      <div className="teamCards">  
        <TeamCard ceo={ceo}  />
        <TeamCard ceo={ceo}  />
        <TeamCard ceo={ceo}  />
        <TeamCard ceo={ceo}  />
      </div>

 
    </div>

    
  );
};

export default AboutUs;

  