import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logocolor.svg";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../../context/AuthContext";
import { getToken, removeToken } from "../../helpers";
import styled from "@emotion/styled";
import AppBarMenu from "./AppBarMenu";
import AppBarMenuAcc from "./AppBarMenuAcc";
import { switchSection } from "../../redux/sectionSwitchReducer";

const Navbar = ({ openMenu, setOpenMenu }) => {
  const products = useSelector((state) => state.cart.products);
  const [openCart, setOpenCart] = useState(false);
  const cartRef = useRef(null);
  const [showCart, setShowCart] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const dispatch = useDispatch();
  const handleCartMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setShowCart(true);
  };

  const handleCartMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowCart(false);
    }, 100);
    setHoverTimeout(timeout);
  };

  const isInitialRender = useRef(true); // Track initial render
  const { user, isLoading, setUser } = useAuthContext();
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const handleClickSubNav = () => {
    setIsActive(!isActive);
  };
  // const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [productMenuOpen2, setProductMenuOpen2] = useState(false);

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  function handleClick2(event) {
    if (anchorEl2 !== event.currentTarget) {
      setAnchorEl2(event.currentTarget);
    }
  }

  function handleClose2() {
    setAnchorEl2(null);
  }

  useEffect(() => {
    if (!openCart && products && !isInitialRender.current) {
      console.log("I ran anyways 2");
      setOpenCart(true);
    }
  }, [products]);

  const sum = products.reduce(
    (accumulator, product) => accumulator + product.quantity,
    0
  );

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  // const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const handleProfileMenuClick = (event) => {
    setAnchorEl2(event.currentTarget);
    console.log("I FUCKING RAN WHY");
  };

  const handleProfileMenuClose = () => {
    // setProfileMenuOpen(false);
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    console.log("logged out");
    removeToken();
    navigate("/signin", { replace: true });
    setAnchorEl2(null);
  };

  return (
    <>
      <div className={`subNav ${isActive ? "subNavActive" : ""}`}>
        <div className="closeWrapper">
          <CloseIcon sx={{ zIndex: 99999999 }} onClick={handleClickSubNav} />
        </div>
        <Link onClick={handleClickSubNav} className="link" to="/">
          <h2>Home</h2>
        </Link>

        <h2>Shop</h2>

        <div className="shopCats">
          <Link onClick={handleClickSubNav} className="link" to="/products/3">
            Beds
          </Link>
          <Link onClick={handleClickSubNav} className="link" to="/products/4">
            Chairs
          </Link>
          <Link onClick={handleClickSubNav} className="link" to="/products/5">
            Tables
          </Link>
          <Link onClick={handleClickSubNav} className="link" to="/products/6">
            Doors
          </Link>
          <Link onClick={handleClickSubNav} className="link" to="/products/7">
            Drawers
          </Link>
        </div>

        <Link onClick={handleClickSubNav} className="link" to="/about">
          <h2>About Us</h2>
        </Link>
      </div>
      <div className="navbar">
        <div className="wrapper">
          <Link to={`/`} className="link">
            <div className="leftNav">
              <h3>
                C & C
                <br /> Motorshop
              </h3>
            </div>
          </Link>
          <div className="middleNav">
            <div className="item">
              <Link className="link" to="/">
                Home
              </Link>
            </div>

            <div className="item">
              <AppBarMenu
                open={openMenu}
                onOpen={() => setOpenMenu(true)}
                onClose={() => setOpenMenu(false)}
                title={
                  <Fragment>
                    <MenuItem
                      component={Link}
                      to="/products/9"
                      className="link"
                      sx={{
                        color: "black",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "14.5px",
                      }}
                      onClick={() => setOpenMenu(false)}
                    >
                      Helmets
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      to="/products/10"
                      className="link"
                      sx={{
                        color: "black",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "14.5px",
                      }}
                      onClick={() => setOpenMenu(false)}
                    >
                      Gear
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      to="/products/11"
                      className="link"
                      sx={{
                        color: "black",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "14.5px",
                      }}
                      onClick={() => setOpenMenu(false)}
                    >
                      Accessories
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      to="/products/12"
                      className="link"
                      sx={{
                        color: "black",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "14.5px",
                      }}
                      onClick={() => setOpenMenu(false)}
                    >
                      Tires
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      to="/products/13"
                      className="link"
                      sx={{
                        color: "black",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: "14.5px",
                      }}
                      onClick={() => setOpenMenu(false)}
                    >
                      Engine Parts
                    </MenuItem>
                  </Fragment>
                }
              >
                <a
                  style={{ display: "flex", cursor: "pointer" }}
                  id="fade-button"
                  className="link"
                >
                  Shop <KeyboardArrowDownIcon />
                </a>
              </AppBarMenu>
            </div>

            <div className="item">
              {/* <Link className="link" to="/about">
                About Us
              </Link> */}
            </div>
          </div>
          <div className="rightNav">
            <div className="accountWrapper">
              <div
                ref={cartRef}
                onMouseEnter={handleCartMouseEnter}
                onMouseLeave={handleCartMouseLeave}
                className="cartIconWrapper"
              >
                <div className="quantityTag">
                  <p>{sum}</p>
                </div>
                <ShoppingCartOutlinedIcon
                  className="cartIcon"
                  onClick={() => setOpenCart(!openCart)}
                />
              </div>
              {/* <h4>Welcome, {user?.username}</h4><AccountCircleOutlinedIcon className="accountIcon" /> <h4 onClick = {removeToken()}>Sign Out</h4> */}
              <MenuIcon onClick={handleClickSubNav} className="menuIcon" />
              <div className="authOptWrapper">
                {user && getToken() ? (
                  <div className="item">
                    <AppBarMenuAcc
                      open={productMenuOpen2}
                      onOpen={() => setProductMenuOpen2(true)}
                      onClose={() => setProductMenuOpen2(false)}
                      title={
                        <Fragment>
                          <MenuItem
                            component={Link}
                            to="/profile"
                            className="link"
                            sx={{
                              color: "black",
                              fontFamily: "Poppins",
                              fontWeight: "500",
                              fontSize: "14.5px",
                            }}
                            onClick={() => {
                              setProductMenuOpen2(false);
                              dispatch(switchSection("editProfile"));
                            }}
                          >
                            My Profile
                          </MenuItem>

                          {/* My Purchase */}
                          <MenuItem
                            component={Link}
                            to="/profile"
                            className="link"
                            sx={{
                              color: "black",
                              fontFamily: "Poppins",
                              fontWeight: "500",
                              fontSize: "14.5px",
                            }}
                            onClick={() => {
                              setProductMenuOpen2(false);
                              dispatch(switchSection("myPurchase"));
                            }}
                          >
                            My Purchase
                          </MenuItem>

                          {/* Log Out */}
                          <MenuItem
                            sx={{
                              color: "black",
                              fontFamily: "Poppins",
                              fontWeight: "500",
                              fontSize: "14.5px",
                            }}
                            onClick={() => {
                              handleLogout();

                              setProductMenuOpen2(false);
                            }}
                          >
                            Log Out
                          </MenuItem>
                        </Fragment>
                      }
                    >
                      <p style={{ cursor: "pointer" }}>
                        Hello, {user?.username}
                      </p>
                    </AppBarMenuAcc>
                  </div>
                ) : (
                  <>
                    <Link
                      style={{ textDecoration: "none", color: "#202020" }}
                      to="/signin"
                    >
                      <p>Login</p>
                    </Link>

                    <p style={{ textDecoration: "none", color: "#202020" }}>
                      {" "}
                      |{" "}
                    </p>

                    <Link
                      style={{ textDecoration: "none", color: "#202020" }}
                      to="/signup"
                    >
                      <p>Sign Up</p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Fade in={showCart} timeout={200}>
          <div
            onMouseEnter={handleCartMouseEnter}
            onMouseLeave={handleCartMouseLeave}
            className="cartComponent"
          >
            <Cart />
          </div>
        </Fade>
      </div>
    </>
  );
};

export default Navbar;
