// import { Outlet, Navigate } from "react-router-dom";

// export const ProtectedRouteUser = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   if (!token || role !== "user") {
//     return <Navigate to={"/login"} />;
//   }

//   return <>{children || <Outlet />}</>;
// };

// export const ProtectedRouteAdmin = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   if (!token || role !== "admin") {
//     return <Navigate to={"/login"} />;
//   }

//   return <>{children || <Outlet />}</>;
// };
const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.login.isAuthenticated);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
