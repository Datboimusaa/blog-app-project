import Header from "./Header"
import Sidebar from "./Sidebar"
import MobileSidebar from "./MobileSidebar"
import {Outlet} from "react-router-dom"

function Dashboard() {
  return (
    <>
      <div className="grid h-screen grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr]  grid-rows-[auto_1fr]">
        <Header />
        <Sidebar />
        <div className="overflow-auto"><Outlet /></div>
      </div>
      <MobileSidebar />
    </>
  )
}

export default Dashboard