import Header from "./Header"
import Sidebar from "./Sidebar"
import {Outlet} from "react-router-dom"

function Dashboard() {
  return (
    <>
      <div className="grid h-screen grid-cols-[150px_1fr] lg:grid-cols-[250px_1fr]  grid-rows-[auto_1fr]">
        <Header />
        <Sidebar />
        <div className="overflow-auto"><Outlet /></div>
      </div>
    </>
  )
}

export default Dashboard