import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Dashboard from './pages/Dashboard'
import Create from './pages/Create'
import Profile from './pages/Profile'
import AboutPage from './pages/About/About'
import Forum from './pages/Forum/Forum'
import ProductDetail from './pages/DetailProduct/DetailProduct'
import UploadProduct from './pages/UploadProduct/UploadProduct'
import Payment from './pages/Payment/Payment'
import SignIn from './pages/SignIn/SignIn'

// router and routes
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

    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
