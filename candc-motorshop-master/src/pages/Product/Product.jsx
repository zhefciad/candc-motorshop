import React, { useEffect } from "react";
import "./Product.scss";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { Button, Rating } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const { dataFetch, loading, error } = useFetch(`/products/${id}?populate=*`);
  console.log(dataFetch);
  console.log(
    import.meta.env.VITE_APP_UPLOAD_URL +
      dataFetch?.attributes?.img?.data?.attributes?.url
  );

  const dispatch = useDispatch();

  return (
    <div className="product">
      {loading ? (
        "" //loading
      ) : (
        <>
          <div className="left">
            <div className="images">
              <div className="mainImg">
                <img
                  src={
                    import.meta.env.VITE_APP_UPLOAD_URL +
                    dataFetch?.attributes?.[selectedImg]?.data?.attributes?.url
                  }
                  alt=""
                />
              </div>
              <div className="bottomImages">
                {dataFetch?.attributes?.img?.data?.attributes?.url && (
                  <img
                    src={
                      import.meta.env.VITE_APP_UPLOAD_URL +
                      dataFetch.attributes.img.data.attributes.url
                    }
                    alt=""
                    onClick={(e) => setSelectedImg("img")}
                  />
                )}

                {dataFetch?.attributes?.img2?.data?.attributes?.url && (
                  <img
                    src={
                      import.meta.env.VITE_APP_UPLOAD_URL +
                      dataFetch.attributes.img2.data.attributes.url
                    }
                    alt=""
                    onClick={(e) => setSelectedImg("img2")}
                  />
                )}

                {dataFetch?.attributes?.img3?.data?.attributes?.url && (
                  <img
                    src={
                      import.meta.env.VITE_APP_UPLOAD_URL +
                      dataFetch.attributes.img3.data.attributes.url
                    }
                    alt=""
                    onClick={(e) => setSelectedImg("img3")}
                  />
                )}

                {dataFetch?.attributes?.img4?.data?.attributes?.url && (
                  <img
                    src={
                      import.meta.env.VITE_APP_UPLOAD_URL +
                      dataFetch.attributes.img4.data.attributes.url
                    }
                    alt=""
                    onClick={(e) => setSelectedImg("img4")}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <h1>{dataFetch?.attributes?.title}</h1>
            <div className="ratings-sold">
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.5}
                size="small"
                readOnly
              />
              <hr />
              <p>135 Sold</p>
            </div>
            <p>{dataFetch?.attributes?.desc}</p>
            <span className="price">
              <span style={{ fontFamily: "Arial", fontSize: "30px" }}>₱</span>
              {dataFetch?.attributes?.price}
            </span>
            <div className="quantity">
              <div className="swiper-buttonsP">
                <IconButton
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                  className="leftTestButtonP"
                  sx={{
                    color: "white",
                    width: "40px !important",
                    height: "40px !important",
                  }}
                >
                  <RemoveIcon sx={{ color: "black" }} />
                </IconButton>

                <h3>{quantity}</h3>

                <IconButton
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="rightTestButtonP"
                  sx={{ color: "white" }}
                >
                  <AddIcon sx={{ color: "black" }} />
                </IconButton>
              </div>
            </div>

            <Button
              variant="contained"
              className="catButton"
              disableElevation
              sx={{
                padding: "0.75rem 1rem",
                background:
                  "linear-gradient(to right, #ff772d 0%, #ff772d 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #f3712b 0%, #f3712b 100%)",
                },
                marginTop: "20px",
                fontFamily: "Poppins",
                borderRadius: "5px",
                boxShadow: "rgba(1, 1, 1, 0.1) 0px 0.5px 14px 0px",
                textTransform: "none",
                color: "#ffffff",
                whiteSpace: "noWrap",
              }}
              onClick={() => {
                dispatch(
                  addToCart({
                    id: dataFetch.id,
                    title: dataFetch.attributes.title,
                    desc: dataFetch.attributes.desc,
                    price: dataFetch.attributes.price,
                    img: dataFetch?.attributes?.img?.data?.attributes?.url,
                    quantity,
                    imgLink:
                      import.meta.env.VITE_APP_UPLOAD_URL +
                      dataFetch?.attributes?.img?.data?.attributes?.url,
                    imgId: dataFetch?.attributes?.img?.data?.id,
                  })
                );

                toast.success("Added to cart", {
                  position: toast.POSITION.BOTTOM_CENTER,
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeButton: false,
                  classNameName: "custom-toast",
                });
              }}
            >
              ADD TO CART
            </Button>

            <div className="info1">
              <span>Vendor: C & C Furniture</span>
              {/* <span>Product Type: Bed</span> */}
              <span>Tag: Motorcycle, Parts, Accessories</span>
            </div>
            <hr />
            <div className="info2">
              <span>ADDITIONAL INFORMATION</span>

              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
