import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from "react-router-dom";

// Layouts and pages
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home/Home"
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
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


// Import the Routes component
import AdminRoute from "./routes/AdminRoutes";
import VendorRoute from "./routes/VendorRoutes";

// Router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="create" element={<Create />} />
      <Route path="profile" element={<Profile />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="forum" element={<Forum />} />
      <Route path="DetailProduct" element={<ProductDetail />} />
      <Route path="Payment" element={<Payment />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="profile/PTRegistration" element={<PTRegistration />} />

      {/* Protected Admin Route */}
      <Route element={<AdminRoute />}>
        <Route path="RoleManage" element={<RoleManage />} />
        <Route path="UploadProduct" element={<UploadProduct />} />
      </Route>
        
      {/* Protected Vendor Route */}
      <Route element={<VendorRoute />}>
        <Route path="UploadProduct" element={<UploadProduct />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;