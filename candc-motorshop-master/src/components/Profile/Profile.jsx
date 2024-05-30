import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { useState } from "react";
import { getToken } from "../../helpers";
import "./Profile.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { InventoryOutlined } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { switchSection } from "../../redux/sectionSwitchReducer";
import PurchasedItem from "../PurchasedItem/PurchasedItem";
import useFetch from "../../hooks/useFetch";
import io from "socket.io-client";


const ScrollToTopOnRender = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};


function EditProfile({user, handleProfileUpdate, loading}) {
  return (
  
  <Form
    layout="vertical"
    initialValues={{
      username: user?.username,
      email: user?.email,
      twitter_username: user?.twitter_username,
      linkedin_username: user?.linkedin_username,
      github_username: user?.github_username,
      avatar_url: user?.avatar_url,
      website_url: user?.website_url,
      about: user?.about,
      address: user?.address,
      city: user?.city,
      zip: user?.zip,
      barangay: user?.barangay,
      province: user?.province,
      contact_number: user?.contact_number,
      first_name: user?.first_name,
      last_name: user?.last_name
    }}
    onFinish={handleProfileUpdate}
    style={{display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%"}}
  >
    <Row gutter={[12, 0]}>
      <Col md={8} lg={8} sm={24} xs={24}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Username is required!",
              type: "string",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
      </Col>
      <Col md={8} lg={8} sm={24} xs={24}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "First Name is required!",
              type: "string",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
      </Col>
      <Col md={8} lg={8} sm={24} xs={24}>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Last Name is required!",
              type: "string",
            },
          ]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
      </Col>
      
      <Col md={12} lg={12} sm={24} xs={24}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Contact Number"
          name="contact_number"
          rules={[
            {
              required: true,
              type: "string",
              message: "Contact Number is required!",
            },
          ]}
        >
          <Input placeholder="e.g. 09827792834" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              type: "string",
              message: "Address is required!",
            },
          ]}
        >
          <Input placeholder="Address" />
        </Form.Item>
      </Col>
      <Col md={12} lg={6} sm={24} xs={24}>
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: "City is required!",
            },
          ]}
        >
          <Input placeholder="City" />
        </Form.Item>
      </Col>
      <Col md={12} lg={6} sm={24} xs={24}>
        <Form.Item
          label="Barangay"
          name="barangay"
          rules={[
            {
              required: true,
              message: "Barangay is required!",
            },
          ]}
        >
          <Input placeholder="Barangay" />
        </Form.Item>
      </Col>
      <Col md={12} lg={6} sm={24} xs={24}>
        <Form.Item
          label="ZIP"
          name="zip"
          rules={[
            {
              required: true,
              message: "ZIP is required!",
            },
          ]}
        >
          <Input placeholder="ZIP" />
        </Form.Item>
      </Col>
      <Col md={12} lg={6} sm={24} xs={24}>
        <Form.Item
          label="Province"
          name="province"
          rules={[
            {
              required: true,
              message: "Province is required!",
            },
          ]}
        >
          <Input placeholder="Province" />
        </Form.Item>
      </Col>
    
     
      <Col span={24}>
        <Form.Item
          label="About"
          name="about"
          rules={[
            {
              required: true,
              type: "string",
              max: 120,
            },
          ]}
        >
          <Input.TextArea placeholder="About" rows={3} />
        </Form.Item>
      </Col>
    </Row>
    <Button
      className="profile_save_btn custom-button"
      htmlType="submit"
      type="primary"
      size="large"
    
    >
      {loading ? (
        <>
          <Spin size="small" /> Saving
        </>
      ) : (
        "Save"
      )}
    </Button>
  </Form>
  );
}

function MyPurchase({user, handleProfileUpdate, loading}) {

  const { dataFetch, loadingOrder, error, refetch } = useFetch(
    `/order-items`
  );
  useEffect(() => {
    // Connect to the Socket.io server
    console.log("am i really running")
    const socket = io('http://localhost:1337'); // Your Strapi server URL

    // Join the user to their room
    socket.emit('joinRoom', user.id);
    socket.emit('joined', user.id);

    // Listen to a welcome message event from the server
    socket.on('welcome', (message) => {
      console.log(message);
    });

        // Listen to dataUpdated event
        socket.on('dataUpdated', () => {
          console.log('Data was updated in the backend. Refreshing data...');
      
          refetch();
        });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, [user]);



    

console.log(dataFetch, error, "order-items")

const filteredData = dataFetch.filter(item => item.attributes.customer_email === user?.email);
console.log(filteredData)
  return (
    <div>
      
      {filteredData.map((item, index) => {

          return <PurchasedItem name = {item.attributes.name} quantity = {item.attributes.quantity} description = {item.attributes.description} shipping_status = {item.attributes.shipping_status} payment_status = {item.attributes.payment_status} price = {item.attributes.amount} imageLink = {item.attributes.imageLink} key={index}/>

      })
        
         }
   
    </div>
  );
}







const Profile = () => {
  const section = useSelector((state) => state.sectionSwitch.section);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();
console.log(user)

  // const [section, setSection] = useState("editProfile");

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      setUser(responseData);

      toast.success("Data saved successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        classNameName: "custom-toast2",
      });
    } catch (error) {
      console.error(Error);

      toast.error("Error while updating the profile", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        classNameName: "custom-toast",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  const getSize = () => {
    return window.innerWidth;
  };

  const [screenSize, setScreenSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const colSpan = screenSize >= 1024 ? 11 : 18;

  return (
    <div className="profileWrapper">
      <div className="containerWrapperProfile"  style={{  width: "100%" }}>
        <Fragment>
          <ScrollToTopOnRender />
          <Row justify="center" align="middle"  style={{  width: "100%" }}>
            <Col style={{ display: "flex", width: "100%", height: "35rem", justifyContent: "center"}} >
              <Card
                style={{
                  width: "11rem ",
                  textAlign: "center",
                  borderRadius: "13px !important",
                  marginRight: "12px",
                 
           
             
                }}
                className="leftCardProfile"

              >
                <div className="profileHeader">
                  <div className="leftWrapperHeader">
                    <img
                      src="https://www.pngitem.com/pimgs/m/146-1468843_profile-icon-orange-png-transparent-png.png"
                      alt=""
                    />
                  </div>

                  <div className="rightWrapperHeader">
                    <h4>{user.username}</h4>
                    <div className="subEdit"  onClick={() => dispatch(switchSection("editProfile"))} >
                      <EditIcon sx={{width: "17px", color: "#808080", marginTop: "2px"}}/>
                      <p   onClick={() => dispatch(switchSection("editProfile"))} >Edit Profile</p>
                    </div>
                  </div>
                </div>

                <div className="profileMenu">

                  <div className={section === "editProfile" ? `myProfile nav-color` : `myProfile`} onClick={() => dispatch(switchSection("editProfile"))}>
                    <AccountCircleOutlinedIcon sx={{mr: "6px", width: "20px"}}/>
                    <h4 onClick={() =>
                      {
                      dispatch(switchSection("editProfile"))
                      }}>My Profile</h4>
                  </div>

                  <div className={section === "myPurchase" ? `myPurchase nav-color` : `myPurchase`}>
                    <InventoryOutlined onClick={() => dispatch(switchSection("myPurchase"))} sx={{mr: "6px", width: "20px"}}/>
                    <h4 onClick={() => 
                    {
                      dispatch(switchSection("myPurchase"))                 
                    }}>My Purchase</h4>
                  </div>

                </div>

              </Card>
              <Card style={{ borderRadius: "13px !important", minWidth: "40rem", maxWidth: "42rem", minHeight: "50vh !important", overflowY: "scroll" }}  className="rightCardProfile">

    
              { section === "editProfile" ?
  <EditProfile user={user} handleProfileUpdate={handleProfileUpdate} loading={loading} />
  : section === "myPurchase" ?
  <MyPurchase user={user} handleProfileUpdate={handleProfileUpdate} loading={loading} />
  : null
}



                
              </Card>
            </Col>
          </Row>
        </Fragment>
      </div>
    </div>
  );
};

export default Profile;




