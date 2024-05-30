import React, { useState } from 'react'
import './FeaturedProducts.scss'
import Card from '../Card/Card'
import { useEffect } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'
import { makeRequest } from '../../makeRequest'
import useFetch from '../../hooks/useFetch'

const FeaturedProducts = ({type}) => {

 


  const {dataFetch, loading, error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)
  console.log(dataFetch)




  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          We offer a wide variety of furniture products to suit your unique styles and needs.
        </p>
      </div>
      <div></div>
      <div className="bottom">
        {error
          ? "Something went wrong!"
          : loading
          ? "" //loading
          : dataFetch?.map((item) => {
              return <Card item={item} key={item.id} />;
            })}
      </div>
    </div>
  );
}

export default FeaturedProducts