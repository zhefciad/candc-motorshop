import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";
const Footer = ({ setOpenMenu, openMenu }) => {
  return (
    <div className="Footer">
      <div className="topFooter">
        <div className="introFooter">
          <h3>C & C Motorshop</h3>
          {/* <p>The advantage of hiring a workspace with us is that we give you comfortable service and all-around facilities</p> */}
        </div>

        <div className="companyFooter">
          <h3>Company</h3>
          <Link className="linkFooter firstLink">About us</Link>
          <Link className="linkFooter">Catalog</Link>
          <Link className="linkFooter">Shop</Link>
          <Link className="linkFooter">Contact</Link>
        </div>

        <div className="productsFooter">
          <h3>Products</h3>
          <Link to={"/products/9"} className="linkFooter firstLink">
            Helmets
          </Link>
          <Link to={"/products/10"} className="linkFooter">
            Gears
          </Link>
          <Link to={"/products/11"} className="linkFooter">
            Accessories
          </Link>
          <Link onClick={() => setOpenMenu(!openMenu)} className="linkFooter">
            All
          </Link>
        </div>

        <div className="socialsFooter">
          <h3>Follow Us</h3>
          <Link className="linkFooter firstLink">Facebook</Link>
          <Link className="linkFooter">Twitter</Link>
          <Link className="linkFooter">Instagram</Link>
        </div>

        <div
          className="upButtonWrapper"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <IconButton className="iconButtonUp" sx={{ color: "white" }}>
            <ArrowUpwardIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      </div>

      <div className="bottomFooter">
        <hr />

        <div className="subBottomFooter">
          <div className="leftFooter">
            ©C & C Motorshop 2024. All rights reserved.
          </div>
          <div className="rightFooter">
            <div className="rightFooterWrapper">
              <Link className="linkBottomFooter">Privacy Policy</Link>
              <hr />
              <Link className="linkBottomFooter">Terms & Conditions</Link>
              <hr />
              <Link className="linkBottomFooter">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
