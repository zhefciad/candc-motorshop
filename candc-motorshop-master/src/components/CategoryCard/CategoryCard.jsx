import React from "react";
import "./CategoryCard.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
const CategoryCard = ({catId, name, link}) => {
  return (
    <div className="CategoryCard">
      <div className="catCardWrapper">
        <img
          src={link}
          alt=""
        />
        <Link to={`/products/${catId}`} className="link">
        <Button
          variant="contained"
          className="catButton"
          disableElevation
          sx={{
            padding: "0.5rem 1rem",
            background: "#f3712b",
            "&:hover": {
              background: "#e26826",
            },
            
            fontFamily: "Poppins",
            borderRadius: "5px",
            boxShadow: "rgba(1, 1, 1, 0.2) 0px 7px 29px 0px",
            textTransform: "none",
            color: "#ffffff",
            whiteSpace: "noWrap",
            fontSize: '12px'
            
          }}
        >
            
        Shop {name}
           

          <EastIcon sx = {{marginLeft: "10px"}} fontSize="small"/>
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
