import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import Users from "./pages/Admin/UsersList.jsx";
import AdminRoutes from "./components/AdminRoutes.jsx";
import UsersList from "./pages/Admin/UsersList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./components/Product/ProductUpdate.jsx";
import ProductCreate from "./components/Product/ProductCreate.jsx";
import Home from "./Home.jsx";
import Intro from "./pages/Intro.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Favorites from "./components/Product/FavoriteProducts.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/User/Shop.jsx";
import PlaceOrder from "./pages/PlaceOrders.jsx"; 
import PaymentStatus from "./pages/PaymentStatus.jsx"; 
import OrderInvoice from "./pages/OrderInvoice.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route index={true} path="/" element={<Intro />}/>
      <Route path="/about" element={<Intro />}/>
      <Route path="/store" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shopping" element={<Shop />} />
      <Route path="/payment-status" element={<PaymentStatus />} /> {/* Added payment callback route */}

      <Route path="" element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="usersList" element={<Users />} />
        <Route path="placeorder" element={<PlaceOrder />} /> {/* Added protected placeorder route */}
         <Route path="order/:id" element={<OrderInvoice />} /> 
      </Route>

      {/* admin routes */}
      <Route path="admin" element={<AdminRoutes />}>
        <Route path="usersList" element={<UsersList />} />
        <Route path="categoryList" element={<CategoryList />} />
        <Route path="productList" element={<ProductList />} />
        <Route path="product/create" element={<ProductCreate />} />
        <Route path="product/update/:id" element={<ProductUpdate/>} />
        <Route path="dashboard" element={<AdminDashboard />} />
         <Route path="orderList" element={<OrderList />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);