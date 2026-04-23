import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function RoutesLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesLayout