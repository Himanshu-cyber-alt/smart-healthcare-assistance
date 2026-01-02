// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ user, children }) => {
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;


// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
const token = localStorage.getItem("patientToken");


  if (!token) {
    return <Navigate to="/login" replace />; // redirect to patient login
  }

  return children; // user is logged in, render the page
}

