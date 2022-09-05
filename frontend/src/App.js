import './App.css';
import { React, useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Home from './component/Home/Home';
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from './component/Product/Products';
import Search from './component/Home/Search.js'
import LoginSignup from './component/user/LoginSignup';
import Profile from "./component/user/Profile.js"
import ProtectedRoute from './component/route/ProtectedRoute';
import UpdateProfile from "./component/user/UpdateProfile.js"
import UpdatePassword from "./component/user/UpdatePassword.js"
import ForgotPassword from "./component/user/ForgotPassword.js"
import ResetPassword from "./component/user/ResetPassword.js"
import Cart from "./component/cart/Cart.js"
import Shipping from "./component/cart/Shipping.js"
import ConfirmOrder from "./component/cart/ConfirmOrder.js"
import Payment from "./component/cart/Payment.js"
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/cart/OrderSuccess.js"
import MyOrders from "./component/order/MyOrders.js"
import OrderDetails from "./component/order/OrderDetails.js"
import Dashboard from "./component/admin/Dashboard.js"
import ProductList from "./component/admin/ProductList.js"
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrderList from "./component/admin/OrderList.js"
import ProcessOrder from "./component/admin/ProcessOrder.js"
import UsersList from "./component/admin/UsersList.js"
import UpdateUser from "./component/admin/UpdateUser.js"
import ProductReviews from "./component/admin/ProductReviews.js"

function App() {

  const [stripeApiKey, setStripeApiKey] = useState(" ")

  async function getstripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    getstripeApiKey()
  }, []);


  return (
    <>
      <Router>
        <Navbar name="Ecommerce" />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path='/process/payment' component={Payment} />
          </Elements>
        )}
        <Switch>

          <Route exact path='/' component={Home} />
          <Route exact path='/product/:id' component={ProductDetails} />
          <Route exact path='/products' component={Products} />
          <Route exact path='/products' component={Products} />
          <Route path='/products/:keyword' component={Products} />
          <Route exact path='/search' component={Search} />
          <ProtectedRoute exact path='/account' component={Profile} />
          <ProtectedRoute exact path='/me/update' component={UpdateProfile} />
          <ProtectedRoute exact path='/password/update' component={UpdatePassword} />
          <Route exact path='/password/forgot' component={ForgotPassword} />
          <Route exact path='/password/reset/:token' component={ResetPassword} />
          <Route exact path='/login' component={LoginSignup} />
          <Route exact path='/cart' component={Cart} />
          <ProtectedRoute exact path='/shipping' component={Shipping} />
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />

          <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
          <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
          <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
          <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
          <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
          <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
          <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
          <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
          <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />

          <Switch>
            <ProtectedRoute exact path='/order/confirm' component={ConfirmOrder} />
            <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
          </Switch>



        </Switch>


        <Footer />
      </Router>

    </>
  )
}

export default App;
