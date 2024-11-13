import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import NavbarOld from "./components/NavbarOld/Navbar";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import AboutUs from "./pages/AboutUs/AboutUs";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { getToken } from "./helpers";
import Profile from "./components/Profile/Profile";
import MyPurchase from "./components/MyPurchase/MyPurchase";
import Checkout from "./pages/Checkout/Checkout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";


const Layout = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="app">
      <Navbar setOpenMenu={setOpenMenu} openMenu={openMenu} />
      <Outlet context={[openMenu, setOpenMenu]} />
      <Footer setOpenMenu={setOpenMenu} openMenu={openMenu} />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },

      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/checkout",
        element: <Checkout isCancelled={false} />,
      },
      {
        path: "/checkout-session",
        element: <Checkout isCancelled={true} />,
      },
      {
        path: "/mypurchase",
        element: <MyPurchase />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
