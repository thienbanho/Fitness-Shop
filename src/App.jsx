import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from "react-router-dom";

// Layouts and pages
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile";
import AboutPage from "./pages/About/About";
import Forum from "./pages/Forum/Forum";
import ProductDetail from "./pages/DetailProduct/DetailProduct";
import UploadProduct from "./pages/UploadProduct/UploadProduct";
import Payment from "./pages/Payment/Payment";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import RoleManage from "./pages/RoleManagement/RoleManage";
import PTRegistration from "./pages/Profile/Profile-PTRegist";
import Product from "./pages/Product/Product";
import ReceiptForm from "./pages/ProductReceipt/ReceiptForm";
import ReceiptConfirm from "./pages/ProductReceipt/ReceiptConfirm";
import ReceiptList from "./pages/ProductReceipt/ReceiptList";
import Cart from "./pages/Cart/Cart";
import MyProducts from "./pages/UploadProduct/MyProduct";
import SellerReceiptManage from "./pages/SellerReceiptManage/SellerReceiptManage";
import PTList from "./pages/PT/PTList";
import PTRequestManagement from "./pages/PT/PTRequestsManagement";
import CartForm from "./pages/Cart/CartForm";
import PTContracts from "./pages/PT/PTContracts";
// Import the Routes component
import AdminRoute from "./routes/AdminRoutes";
import VendorRoute from "./routes/VendorRoutes";
import LoginRoute from "./routes/LoggedInRoutes";



// Router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="Home" element={<Home />} />
      <Route path="About" element={<AboutPage />} />
      <Route path="Forum" element={<Forum />} />
      <Route path="DetailProduct" element={<ProductDetail />} />
      <Route path="Payment" element={<Payment />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="Profile/PTRegistration" element={<PTRegistration />} />
      <Route path="Product" element={<Product />} />
      <Route path="ReceiptForm" element={<ReceiptForm />} />
      <Route path="ReceiptConfirm" element={<ReceiptConfirm />} />
      <Route path="CartForm" element={<CartForm />} />
      <Route path="PTList" element={<PTList />} />
      <Route path="PTRequestManagement" element={<PTRequestManagement />} />
      <Route path="PTContracts" element={<PTContracts />} />
      {/* Protected Login Route */}
      <Route element={<LoginRoute />}>
        <Route path="ReceiptList" element={<ReceiptList />} />
        <Route path="Cart" element={<Cart />} />

      </Route>
      {/* Protected Admin Route */}
      <Route element={<AdminRoute />}>
        <Route path="RoleManage" element={<RoleManage />} />
      </Route>
        
      {/* Protected Vendor Route */}
      <Route element={<VendorRoute />}>
        <Route path="UploadProduct" element={<UploadProduct />} />
        <Route path="MyProducts" element={<MyProducts />} />
        <Route path="SellerReceiptManage" element={<SellerReceiptManage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;