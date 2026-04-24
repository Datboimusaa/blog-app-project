import {Navigate, useNavigate, Outlet} from "react-router-dom";

function PrivateRoute() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const navigate = useNavigate();


    if (!token) {
        return <Navigate to="/" />;
    }

    else if (token && role === "user") {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
}

export default PrivateRoute;