// import React from 'react'
// import './Cart.scss'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { removeItem, resetCart } from '../../redux/cartReducer'
// import { makeRequest } from "../../makeRequest";

// const Cart = () => {

// const products = useSelector(state => state.cart.products)
// const totalPrice = () => {
//     let total = 0
//     products.forEach(item => (total += item.quantity * item.price))
//     return total.toFixed(2)
// }

// const handlePayment = async () => {
//   try {
//     const response = await makeRequest.post('/orders', {
//       products,
//     });

//     const checkoutUrl = response.data.source.attributes.redirect.checkout_url;

//     // console.log(checkoutUrl)
//     window.location.replace(checkoutUrl);
//   } catch (error) {
//     console.error(error);
//   }
// };



// const dispatch = useDispatch();


//   return (
//     <div className='cart'>
//         <h1>Products in your cart</h1>
//         {products?.map(item => (
//             <div className="item" key = {item.id}>
//                 <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.img} alt="" />
//                 <div className="details">
//                     <h1>{item.title}</h1>
//                     <p>{item.desc?.substring(0,100)}</p>
//                     <div className="price"> {item.quantity} x ${item.price}</div>
//                 </div>
//                 <button className='delete' onClick={() => dispatch(removeItem(item.id))}>Delete</button>
//             </div>
//         ))}
//         <div className="total">
//             <span>SUBTOTAL</span>
//             <span>${totalPrice()}</span>
//         </div>
//         <button className='addCart' onClick={handlePayment}>PROCEED TO CHECKOUT</button>
//         <span className='reset' onClick={() => dispatch(resetCart())}>Reset Cart</span>
//     </div>
//   )
// }

// export default Cart