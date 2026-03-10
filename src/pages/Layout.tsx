import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"


const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar/>
      <BottomNav/>
      <div className="flex-1 overflow-y-scroll ">
      <Outlet/>
      </div>
    </div>
  )
}

export default Layout
