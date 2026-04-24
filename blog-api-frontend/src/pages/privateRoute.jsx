import {Navigate, Outlet} from "react-router-dom";

function PrivateRoute() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" />;
    } else {
        return <Outlet />;
    }
}

export default PrivateRoute;