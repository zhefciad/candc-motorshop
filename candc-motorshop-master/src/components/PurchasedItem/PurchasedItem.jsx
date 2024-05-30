import React, { useEffect, useState } from "react";
import './PurchasedItem.scss'

import divan from '../../assets/homesweethome.jpg'
const PurchasedItem = ({name, quantity, description, shipping_status, payment_status, price, imageLink}) => {
  function limitWords(text, limit) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className='purchasedItem'>
        
     <div className="leftContentPurchased">
        <div className="imgWrapperPurchased">
            <img src={imageLink} alt="" />
        </div>
   
     </div>  

       <div className="middleContentPurchased">
        <h4>{name}</h4>
        <p>{limitWords(description, 16)}</p>
        <p>x{quantity}</p>
     </div>   

     <div className="rightContentPurchased">
        <h3>₱{price}</h3>
        <h3>{payment_status}</h3>
        <h3>{shipping_status}</h3>
     </div>   

    </div>
  )
}

export default PurchasedItem