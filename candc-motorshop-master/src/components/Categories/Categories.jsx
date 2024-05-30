import React, { useLayoutEffect, useRef } from "react";
import "./Categories.scss";
import CategoryCard from "../CategoryCard/CategoryCard";
import catData from "../../data/catData";
import { Button } from "@mui/material";
import { CallMade } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";

const Categories = ({ openMenu, setOpenMenu }) => {
  return (
    <div className="categories">
      <div className="topCatWrapper">
        <h2>
          Top <br />
          Categories
        </h2>
        <p>
          We offer a wide variety of everything motorcycle to suit your unique
          style and needs
        </p>

        <div className="buttonDiscWrapper">
          <Button
            variant="contained"
            className="discoverButton"
            disableElevation
            onClick={() => setOpenMenu(!openMenu)}
            sx={{
              padding: "0.8rem 1rem",
              background: "white",
              "&:hover": {
                background: "white",
                boxShadow: "rgba(1, 1, 1, 0.2) 0px 7px 29px 0px",
              },

              fontFamily: "Poppins",
              borderRadius: "10px",
              // boxShadow: "rgba(1, 1, 1, 0.2) 0px 7px 29px 0px",
              textTransform: "none",
              color: "#30383d",
              whiteSpace: "noWrap",
              fontSize: "14px",
              outline: "2px solid black",
            }}
          >
            Discover More
            <CallMade sx={{ marginLeft: "5px" }} fontSize="small" />
          </Button>
        </div>
      </div>

      <div className="container-wrapper">
        {catData?.map((item, index) => {
          return (
            <div
              className={`grid-${index + 1}  grid-item-hover`}
              key={index}
              catId={item.catId}
              name={item.name}
              link={item.link}
              style={{ cursor: "pointer" }}
            >
              <Link to={`/products/${item.catId}`} className="link">
                <div className="overlay"></div>
                <img src={item.link} alt="" />

                <div className="catDesc">
                  <div className="leftCatDesc">
                    <h3> {item.name}</h3>
                    <p>43 Items</p>
                  </div>
                  <CallMade fontSize="large" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
