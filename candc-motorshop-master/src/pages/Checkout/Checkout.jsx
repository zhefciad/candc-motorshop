import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,

} from "@mui/material";
import styled from "@emotion/styled";
import Cart from "../../components/Cart/Cart";
import { Typography } from "antd";
import visa from '../../assets/visa.png'
import gcash from '../../assets/gcash.png'
import paymaya from '../../assets/paymaya.png'
import CartCheckout from "../../components/CartCheckout/CartCheckout";
import { useSelector, useDispatch } from 'react-redux';
import { setFormData } from "../../redux/checkoutFormReducer";
import { getToken } from "../../helpers";
import { useAuthContext } from "../../context/AuthContext";


const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().trim().required("Address is required"),
  barangay: Yup.string().trim().required("Barangay is required"),
  province: Yup.string().trim().required("Province is required"),
  mobileNumber: Yup.string().trim().required("Mobile number is required"),
  city: Yup.string().trim().required("City is required"),
  zip: Yup.string()
    .trim()
    .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid ZIP code")
    .required("ZIP code is required"),
  paymentMethod: Yup.string().required("Required"),
});

const Checkout = ({isCancelled}) => {

  useEffect(() => {
    if (isCancelled) {
      console.log("CANCELLED")
    }else{
      console.log("NOT CANCELLED")
    }
  }, [isCancelled]);


  const { user, isLoading, setUser } = useAuthContext();

  console.log(user)
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.checkoutForm.values);
  

  const [initialValues, setInitialValues] = useState({
    name: (user?.first_name || "") + " " + (user?.last_name || ""),
    email: user?.email || "",
    mobileNumber: user?.contact_number || "",
    city: user?.city || "",
    zip: user?.zip || "",
    barangay: user?.barangay || "",
    province: user?.province || "",
    address: user?.address || "",
    paymentMethod: formData?.paymentMethod || "",
    note: formData?.note || ""
  });  


  
  useEffect(() => {
    if (user) {
      const initialFormValues = {
        name: `${user.first_name || ""} ${user.last_name || ""}`,
        email: user.email || "",
        mobileNumber: user.contact_number || "",
        city: user.city || "",
        zip: user.zip || "",
        barangay: user.barangay || "",
        province: user.province || "",
        address: user.address || "",
        paymentMethod: formData.paymentMethod || "",
        note: formData.note || "",
      };
      setInitialValues(initialFormValues);
    }
  }, [user]);

  const CustomFormControlLabel = styled(FormControlLabel)({
    color: "#30402c",
    fontWeight: "600",
    fontSize: "14px",
    fontFamily: "Poppins",
  });
  
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    city: "",
    zip: "",
    barangay: "",
    province: "",
    address: "",
    paymentMethod: "",
    note: ""
  });

  
  const [formValid, setFormValid] = useState(false)

  // useEffect(() => {
  //   console.log(formValues)
  //     }, [formValues])


  const handleSubmit = (values) => {
    // console.log(formValues);
    // dispatch(setFormData(formValues));
  };
   const [clickedPayment, setClickedPayment] = useState(false)
   const [triggerPayment, setTriggerPayment] = useState(false);

   const handleTriggerPayment = () => {
     setTriggerPayment(true);
   }
  return (
    <div className="checkout">
       <div className="leftCheckout">
  


        <div className="cardWrapperLeft">
      <div className="headerTop">
        <h2>Delivery Information</h2>
      </div>
      <Formik
        key = {JSON.stringify(user)}
        initialValues={initialValues}
        validationSchema={validationSchema}
        style = {{height: "100%"}}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({values, errors, touched, handleChange, submitForm}) => {
              useEffect(() => {
                setFormValues(values);
                dispatch(setFormData(values));
              }, [values]);


              useEffect(() => {

                if (clickedPayment === true){
                  console.log(formValues);
                 
                  submitForm()
                              .then(() => {
                                console.log(errors)
                                if (!Object.keys(errors).length){
                                  console.log("am i running")
                                  if (getToken()){

                                    setTriggerPayment(true)

                                  }else{
                                    console.log("did i ran or nah?")
                                    navigate("/signin", { replace: true });
                                  }
                                }
                                    
                              })
                              .catch(() => {
                                console.log(errors)
                              });
                }
               
              }, [clickedPayment]);

return (
  <Form style = {{height: "100%"}} onChange={handleChange}>
           
  <div className="leftCheckoutWrapper">
     <div className="leftCheckoutTop">


<div className="cardWrapperTopTwice">

<div className="cardWrapperTop">
         <div className="leftInfo">
           <div className="nameField fieldHeight">
             <h4 style={{marginTop: "0px"}}>Name</h4>
             <Field
               fullWidth
               as={TextField}
               type="text"
               id="name"
               name="name"
               InputLabelProps={{
                 shrink: true,
                 fontSize: "210px",
               }}
               placeholder="John Doe"
               variant="outlined"
               helperText={<ErrorMessage name="name" />}
               error={touched.name && errors.name}
               
             />
           </div>

           <div className="emailField fieldHeight">
             <h4>Email</h4>
             <Field
               fullWidth
               as={TextField}
               type="email"
               id="email"
               name="email"
               InputLabelProps={{
                 shrink: true,
                 fontSize: "210px",
                 
               }}
               placeholder="johndoe@gmail.com"
               variant="outlined"
               helperText={<ErrorMessage name="email" />}
               error={touched.email && errors.email}
               InputProps={{
                readOnly: true,
              }}
             />
           </div>

           <div className="stateField fieldHeight">
             <h4>Province</h4>
             <Field
               fullWidth
               as={TextField}
               type="text"
               id="province"
               name="province"
               InputLabelProps={{
                 shrink: true,
                 fontSize: "210px",
               }}
               placeholder="Bulacan"
               variant="outlined"
               helperText={<ErrorMessage name="province" />}
               error={touched.province && errors.province}
             />
           </div>
         </div>
         <div className="rightInfo ">
           <div className="mobileNumberField fieldHeight">
             <h4  style={{marginTop: "0px"}}>Mobile Number</h4>
             <Field
                 fullWidth
               as={TextField}
               type="text"
               id="mobileNumber"
               name="mobileNumber"
               InputLabelProps={{
                 shrink: true,
                 fontSize: "210px",
               }}
               placeholder="+63 "
               variant="outlined"
               helperText={<ErrorMessage name="mobileNumber" />}
               error={touched.mobileNumber && errors.mobileNumber}
             />
           </div>

           <div className="cityField fieldHeight">
             <h4>City</h4>
             <Field
                 fullWidth
               as={TextField}
               type="text"
               id="city"
               name="city"
               InputLabelProps={{
                 shrink: true,
                 fontSize: "210px",
               }}
               placeholder="San Jose Del Monte"
               variant="outlined"
               helperText={<ErrorMessage name="city" />}
               error={touched.city && errors.city}
             />
           </div>

           <div className="zipStateWrapper fieldHeight">

           <div className="barangayField fieldHeight">
               <h4>Barangay</h4>
               <Field
                   fullWidth
                 as={TextField}
                 type="text"
                 id="barangay"
                 name="barangay"
                 InputLabelProps={{
                   shrink: true,
                   fontSize: "210px",
                 }}
                 placeholder="Poblacion"
                 variant="outlined"
                 helperText={<ErrorMessage name="barangay" />}
                 error={touched.barangay && errors.barangay}
               />
             </div>
             <div className="zipField">
               <h4>ZIP</h4>
               <Field
                   fullWidth
                 as={TextField}
                 type="text"
                 id="zip"
                 name="zip"
                 InputLabelProps={{
                   shrink: true,
                   fontSize: "210px",
                 }}
                 placeholder="3025"
                 variant="outlined"
                 helperText={<ErrorMessage name="zip" />}
                 error={touched.zip && errors.zip}
               />
             </div>

           
           </div>
         </div>



       </div>
         <div className="addressInfo">
           <div className="addressField fieldHeight">
             <h4>Complete Address</h4>
             <Field
                   fullWidth
               as={TextField}
               type="text"
               id="address"
               name="address"
               InputLabelProps={{
                 shrink: true,
                 fontSize: "210px",
               }}
               placeholder="123 Elm Street, Barangay Poblacion, San Jose del Monte, Bulacan"
               variant="outlined"
               helperText={<ErrorMessage name="address" />}
               error={touched.address && errors.address}
             />
           </div>
         </div>
</div>

     </div>

     <div className="leftCheckoutMiddle">
       <div className="header">
         <h2>Additional Notes</h2>
       </div>

       <div className="cardWrapperMiddle">
         <div className="noteField">
           <h4>Note</h4>
           <Field
           fullWidth
             as={TextField}
             type="text"
             id="note"
             name="note"
             InputLabelProps={{
               shrink: true,
             }}
             multiline
             rows={4}
             placeholder="Type your note"
             variant="outlined"
             helperText={<ErrorMessage name="note" />}
           />
         </div>
       </div>
     </div>

     <div className="leftCheckoutEnd">
       <div className="header">
         <h2>Payment Method</h2>
       </div>

       <div className="cardWrapperEnd">
         <Field
           as={RadioGroup}
           name="paymentMethod"
          
         >
           <div className="controlLabels">
           <CustomFormControlLabel
             helperText={<ErrorMessage name="paymentMethod" />}
             value="online"
             control={<Radio />}
             error={touched.paymentMethod && errors.paymentMethod}
             label={
               <div className="labelOnline">
               <Typography
               variant="body1"
               className="custom-form-label"
             >
               Online Payment
             </Typography>
               {/* <img style={{marginLeft: "30px"}} src={visa} alt="" />
               <img src= {paymaya} alt="" /> */}
               <img src= {gcash} alt="" />
             </div>
             }
       
/>

             <hr style={{color: "#f4f4f2"}}/>
             <CustomFormControlLabel
             helperText={<ErrorMessage name="paymentMethod" />}
             value="cash"
             control={<Radio />}
             error={touched.paymentMethod && errors.paymentMethod}
             sx={{mr: "50px"}}
             label={
               <div className="labelCash">
               <Typography
               variant="body1"
               className="custom-form-label"
             >
               Cash on Delivery
             </Typography>
         
             </div>
             }
           />
           </div>
 
         </Field>
       </div>
     </div>
  </div>

  
 </Form>
);


        }
        
        

        
        
        }
      </Formik>
        </div>



      </div>
      <div className="rightCheckout">

        <div className="cardWrapperRight">
          <div className="headerTop">
          <h2>Order Summary</h2>
        </div>

        <div className="rightCartWrapper">
          <CartCheckout formValid = {formValid} triggerPayment={triggerPayment} setTriggerPayment={setTriggerPayment} formValues = {formValues} setClickedPayment = {setClickedPayment}/> 
        </div>
   
        </div>
      </div>
    </div>
  );
};

export default Checkout;
