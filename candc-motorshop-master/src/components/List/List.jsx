import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, price, sort, catId }) => {
    
      const subCatFilters = subCats.map((subCat) => {
        return `[filters][sub_categories][id][$eq]=${subCat}`;
      }).join('&');
      
      const categoryFilter = `[filters][categories][id]=${catId}`;
      
      // const priceFilter = `[filters][price][$lte]=${maxPrice}`;
      const priceFilter = `[filters][price][$gte]=${price[0]}&[filters][price][$lte]=${price[1]}`;

      const sortFilter = `sort=price:${sort}`;
      
      const { dataFetch, loading, error } = useFetch(
        `/products?populate=*&${categoryFilter}&${subCatFilters}&${priceFilter}&${sortFilter}`
      );
      

  console.log(dataFetch)
  return (
    <div className="list">
      {loading
        ? ""//loading
        : dataFetch?.map((item) => <Card outline = {true} item={item} key={item.id} scale = {true} />)}
    </div>
  );
};

export default List;
