import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";

function ProtectedRoute ({
    isAuthenticated,
    children,
} : {
    isAuthenticated: boolean;
    children: JSX.Element;
}) {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;