import React from "react";
import { useRef } from "react";
import "./Hero.scss";
import heroImg from "../../assets/divan2.png";
import search from "../../assets/search.svg";
import { Button } from "@mui/material";
import { East } from "@mui/icons-material";
import { Link } from "react-router-dom";
import GLTFModel from "../GLTFModel/GLTFModel";

const Hero = () => {
  const handleImageClick = () => {
    searchInput.current.focus();
  };

  const searchInput = useRef(null);
  return (
    <div className="Hero">
      <div className="leftWrapper">
        <p>Best Collection 2023</p>
        <h1>
          <span>Discover</span> the best
          <br /> Motorcycle Parts
        </h1>
        <h2>
          Experience the Rush of the Open Road - Discover Top-Quality
          Motorcycles, Expertly Crafted Gear, and Accessories Designed for the
          Ultimate Riding Adventure
        </h2>

        <div className="searchGroup">
          <img
            onClick={handleImageClick}
            src={search}
            className="search2"
            alt=""
          />

          <input
            type="text"
            ref={searchInput}
            placeholder="Search helmets, engines..."
            className="search"
          />
          <Link to={`/products/3`} className="link">
            <Button
              variant="contained"
              className="catButton"
              disableElevation
              sx={{
                padding: "0.75rem 0.8rem",
                background:
                  "linear-gradient(to right, #ff772d 0%, #ff772d 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #f3712b 0%, #f3712b 100%)",
                },

                fontFamily: "Poppins",
                borderRadius: "5px",
                boxShadow: "rgba(1, 1, 1, 0.1) 0px 0.5px 14px 0px",
                textTransform: "none",
                color: "#ffffff",
                whiteSpace: "noWrap",
              }}
            >
              Search
              <East sx={{ marginLeft: "10px" }} fontSize="small" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="rightWrapper">
        <div
          style={{
            //add margin top

            marginTop: "14rem",
          }}
        >
          <GLTFModel
            modelPath="/scene.gltf"
            scale={[2.3, 2.3, 2.3]}
            width="100%"
            height="600px "
          />
        </div>

        <div className="modelWrapper"></div>
      </div>
    </div>
  );
};

export default Hero;
