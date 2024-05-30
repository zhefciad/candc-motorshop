import React, { useState } from 'react'
import './Card.scss'
import { Link } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { addToCart } from '../../redux/cartReducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './toastStyles.css';



const Card = ({item, outline, scale}) => {


  const { dataFetch, loading, error } = useFetch(`/products/${item.id}?populate=*`);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1)
  return (
    <div className='card'>
       <Link className='link' to = {`/product/${item.id}`}>
       
            <div className="image">
                {item?.attributes.isNew && <span>SALE</span>}
                <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url} alt="" className="mainImg" />
                {/* <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url} alt="" className="secondImg" /> */}
            </div>

            <div className="bottomWrapper">


            <div className="detailsWrapper">
            <h2>{item?.attributes.title}</h2>
            <div className="leftPrices">
               <h3><span style = {{fontFamily: "Arial", fontSize: "18px"}}>₱</span>{item?.attributes.price}</h3>
               <h3><span style = {{fontFamily: "Arial", fontSize: "14px"}}>₱</span>{item.oldPrice || item?.attributes.price + 20}</h3>
            </div>
            </div>
            <div className="rightButton">
            <Link className='link'>
          <Button 
              variant="contained"
              style={{padding: "0px", minHeight: "47px", marginLeft: "20px", borderRadius: "5px", background: "#ff772d" }}
              sx={{minWidth: "47px !important",}}
              onClick={
                () => {
                  dispatch(addToCart({
                  id: dataFetch.id,
                  title: dataFetch.attributes.title,
                  desc: dataFetch.attributes.desc,
                  price: dataFetch.attributes.price,
                  img: dataFetch?.attributes?.img?.data?.attributes?.url,
                  imgLink: import.meta.env.VITE_APP_UPLOAD_URL + dataFetch?.attributes?.img?.data?.attributes?.url,
                  imgId: dataFetch?.attributes?.img?.data?.id,
                  quantity
                }))

             
                toast.success('Added to cart', {
                  position: toast.POSITION.BOTTOM_CENTER,
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeButton: false,
                  classNameName: 'custom-toast',
                });
              }
              }
            >
              <AddShoppingCartIcon fontSize='small' />
            </Button>
            </Link>
          </div>
            </div>
        
       </Link>
    </div>
  )
}

export default Card