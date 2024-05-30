import React from 'react'
import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'
import "./Home.scss"
import Contact from '../../components/Contact/Contact'
import Hero from '../../components/Hero/Hero'
import Subscribe from '../../components/Subscribe/Subscribe'
import Testimony from '../../components/Testimony/Testimony'
import WhyUs from '../../components/WhyUs/WhyUs'
import { useOutletContext } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { clearFormData } from '../../redux/checkoutFormReducer'
import { resetCart } from '../../redux/cartReducer'
import { setSessionId } from '../../redux/checkoutSessionReducer'


const Home = () => {
  const sessionId = useSelector((state) => state.checkoutSession.sessionId);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (sessionId) {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            authorization: 'Basic c2tfdGVzdF9Tc1FMZWplUlZEZlZza1pldldxNER0a3U6'
          }
        };
  
        try {
          const response = await fetch(`https://api.paymongo.com/v1/checkout_sessions/${sessionId}`, options);
          const data = await response.json();
          console.log(data, "CHECKOUT SESSION EXISTING");
          const checkoutStatus = data.data.attributes.payment_intent.attributes.status;
          console.log(checkoutStatus)  

          if (checkoutStatus === "succeeded"){
            dispatch(clearFormData())
            dispatch(resetCart())
            dispatch(setSessionId(""))
            
          }
          
        } catch (err) {
          console.error(err);
        }
      }
    };
  
    fetchData();
  }, []);
  

    
  const [openMenu, setOpenMenu] = useOutletContext();
  return (
    <div className='home'>

      <Hero/>
      <Categories setOpenMenu = {setOpenMenu} openMenu = {openMenu}/>
      <FeaturedProducts type="top"/>
      {/* <WhyUs/> */}
      <Testimony/>
      <Subscribe/>
    </div>
  )
}

export default Home