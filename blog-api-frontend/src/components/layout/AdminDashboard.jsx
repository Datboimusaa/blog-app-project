import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"
import {Outlet} from "react-router-dom"

function AdminDashboard() {
  return (
    <>
      <div className="grid h-screen grid-cols-[150px_1fr] lg:grid-cols-[250px_1fr]  grid-rows-[auto_1fr]">
        <AdminHeader />
        <AdminSidebar />
        <div className="overflow-auto"><Outlet /></div>
      </div>
    </>
  )
}

export default AdminDashboard