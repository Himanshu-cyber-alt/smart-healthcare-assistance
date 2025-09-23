

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/Home";

// // patient pages
// import PatientRegister from "./pages/PatientRegister";
// import PatientOtpVerify from "./pages/PatientOtpVerify";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import PatientDashboard from "./pages/PatientDashboard";
// import Doctors from "./pages/Doctors";
// import PatientVideoCall from "./pages/PatientVideoCall"; // <-- Add this

// // doctor pages
// import DoctorRegister from "./pages/DoctorRegister";
// import DoctorLogin from "./pages/DoctorLogin";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import AIAssistant from "./pages/AIAssistant";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />

//         {/* Patient routes */}
//         <Route path="/register" element={<PatientRegister />} />
//         <Route path="/verify-otp" element={<PatientOtpVerify />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/dashboard" element={<PatientDashboard />} />

//         <Route path="/assistant" element = {<AIAssistant/>} /> 

//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/patientvideocall" element={<PatientVideoCall />} /> {/* Added route */}

//         {/* Doctor routes */}
//         <Route path="/doctor/register" element={<DoctorRegister />} />
//         <Route path="/doctor/login" element={<DoctorLogin />} />
//         <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
//       </Routes>
//     </Router>


//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

// patient pages
import PatientRegister from "./pages/PatientRegister";
import PatientOtpVerify from "./pages/PatientOtpVerify";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PatientDashboard from "./pages/PatientDashboard";
import Doctors from "./pages/Doctors";
import PatientVideoCall from "./pages/PatientVideoCall";

// doctor pages
import DoctorRegister from "./pages/DoctorRegister";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Patient routes */}
        <Route path="/register" element={<PatientRegister />} />
        <Route path="/verify-otp" element={<PatientOtpVerify />} />
        <Route path="/login" element={<Login />} />

         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />


        <Route path="/profile" element={<Profile />} />

        {/* Protected patient routes */}
       
        <Route
          path="/patientvideocall"
          element={
            <ProtectedRoute>
              <PatientVideoCall />
            </ProtectedRoute>
          }
        />

        <Route path="/assistant" element={<AIAssistant />} />
        <Route path="/doctors" element={<Doctors />} />

        {/* Doctor routes */}
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
