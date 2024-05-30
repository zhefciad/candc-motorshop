import React, { useLayoutEffect, useState, useRef } from "react";
import "./Products.scss";
import List from "../../components/List/List";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ScrollToTopOnRender = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const PrettoSlider = styled(Slider)({
  color: "#ff772d",
  height: 6,

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 0.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 50,
    height: 50,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#ff772d",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Products = () => {
  const catId = parseInt(useParams().id);
  // const [maxPrice, setMaxPrice] = useState(1000)
  const [sort, setSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { dataFetch, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  const minPrice = 0;
  const maxPrice = 100000;
  const [price, setPrice] = useState([minPrice, maxPrice]);

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
    console.log(price);
  };

  const valuetext = (value) => {
    return `${value}°C`;
  };

  const catLinks = {
    11: {
      Accessories:
        "https://www.dunlopmotorcycletires.com/wp-content/uploads/2021/07/The-Most-Important-Parts-of-Your-Motorcycle-to-Know-About-9.jpg",
    },
    9: {
      Helmets:
        "https://ls2helmets.com/images/lifestyle/challenger/BFFC67-CE6EDD-1675788352.webp",
    },
    10: {
      Gear: "https://www.themanual.com/wp-content/uploads/sites/9/2021/06/harley-davidson-motorcycle-rider.jpg?fit=800%2C800&p=1",
    },
    13: {
      "Engine Parts":
        "https://media.istockphoto.com/id/842682040/photo/motorcycle-engines-gears-and-details.jpg?s=612x612&w=0&k=20&c=Cs5LCM6MWE4pO0pkbfjZ9uTth6CZyDH9dWeRGhTReFE=",
    },
    12: {
      Tires:
        "https://hbhonda.com/portals/hbhonda/motorcycle-tires-for-sale-shallow-crop.jpg",
    },
  };

  const catName = Object.keys(catLinks[catId])[0];
  const catImageSrc = catLinks[catId][catName];

  return (
    <div className="products">
      <ScrollToTopOnRender />
      <div className="leftWrapper">
        <div className="left">
          <div className="filterItem">
            <h2>Filters</h2>

            <h3>Wood Type</h3>
            {dataFetch?.map((item) => (
              <div className="inputItem" key={item.id}>
                <input
                  type="checkbox"
                  id="1"
                  value={item.id}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
            ))}
          </div>
          <div className="filterItemPrice">
            <h2>Price</h2>
            <div className="inputItemPrice">
              <div className="prettoWrapper">
                <PrettoSlider
                  getAriaLabel={() => "Minimum distance shift"}
                  value={price}
                  onChange={handleChangePrice}
                  valueLabelDisplay="auto"
                  defaultValue={minPrice}
                  min={minPrice}
                  max={maxPrice}
                  getAriaValueText={valuetext}
                  disableSwap
                />
              </div>

              <div className="priceLabels">
                <span>0</span>
                <span>{maxPrice}</span>
              </div>
            </div>
          </div>
          <div className="filterItem">
            <h2>Sort By</h2>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => setSort("asc")}
              />
              <label htmlFor="asc">Price (Lowest First)</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => setSort("desc")}
              />
              <label htmlFor="desc">Price (Highest First)</label>
            </div>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="banner">
          <img src={catImageSrc} alt={catName} />
          <h1>{catName}</h1>
        </div>

        <List
          catId={catId}
          price={price}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};

export default Products;
