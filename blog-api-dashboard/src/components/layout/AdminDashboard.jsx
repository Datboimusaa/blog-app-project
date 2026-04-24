import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"
import AdminMobileSidebar from "./AdminMobileSidebar"
import {Outlet} from "react-router-dom"

function AdminDashboard() {
  return (
    <>
      <div className="grid h-screen grid-cols-1 md:grid-cols-[150px_1fr] lg:grid-cols-[250px_1fr] grid-rows-[auto_1fr]">
        <AdminHeader />
        <AdminSidebar />
        <div className="overflow-auto pb-20 md:pb-0"><Outlet /></div>
      </div>
      <AdminMobileSidebar />
    </>
  )
}

export default AdminDashboard