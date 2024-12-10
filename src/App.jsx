import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from "react-router-dom";

// Layouts and pages
import RootLayout from "./layouts/RootLayout";
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

// Import the AdminRoute component
import AdminRoute from "./routes/AdminRoutes";

// Router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="create" element={<Create />} />
      <Route path="profile" element={<Profile />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="forum" element={<Forum />} />
      <Route path="DetailProduct" element={<ProductDetail />} />
      <Route path="UploadProduct" element={<UploadProduct />} />
      <Route path="Payment" element={<Payment />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />

      {/* Protected Admin Route */}
      <Route element={<AdminRoute />}>
        <Route path="RoleManage" element={<RoleManage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;