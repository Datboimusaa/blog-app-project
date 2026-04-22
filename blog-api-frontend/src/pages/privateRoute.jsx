import {Navigate, useNavigate, Outlet} from "react-router-dom";

function PrivateRoute() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    if (!token) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}

export default PrivateRoute;