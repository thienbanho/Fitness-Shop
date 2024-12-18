import { Outlet } from "react-router-dom"
import WithSubnavigation from "../components/NavBar/NavBar"
import Footer from "../components/Footer/Footer"
import Sidebar from "../components/Sidebar/Sidebar"

export default function RootLayout() {
  return (
    <div>
      <WithSubnavigation />
      <Outlet />
      <Footer />
    </div>
  )
}
