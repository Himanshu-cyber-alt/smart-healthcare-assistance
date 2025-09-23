
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";

// // patient pages
// import PatientRegister from "./pages/PatientRegister";
// import PatientOtpVerify from "./pages/PatientOtpVerify";
// import Login from "./pages/Login";   // patient login
// import Profile from "./pages/Profile";
// import PatientDashboard from "./pages/PatientDashboard";
// import Doctors from "./pages/Doctors";   // ✅ new page

// // doctor pages
// import DoctorRegister from "./pages/DoctorRegister";
// import DoctorLogin from "./pages/DoctorLogin";
// import DoctorDashboard from "./pages/DoctorDashboard";

// // video call
//  // ✅ add this

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Home page */}
//         <Route path="/" element={<Home />} />

//         {/* Patient routes */}
//         <Route path="/register" element={<PatientRegister />} />
//         <Route path="/verify-otp" element={<PatientOtpVerify />} />
//         <Route path="/login" element={<Login />} />   
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/dashboard" element={<PatientDashboard />} />
//         <Route path="/doctors" element={<Doctors />} /> {/* ✅ Doctors list */}

//         {/* Doctor routes */}
//         <Route path="/doctor/register" element={<DoctorRegister />} />
//         <Route path="/doctor/login" element={<DoctorLogin />} />
//         <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      

      
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";

// // patient pages
// import PatientRegister from "./pages/PatientRegister";
// import PatientOtpVerify from "./pages/PatientOtpVerify";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import PatientDashboard from "./pages/PatientDashboard";
// import Doctors from "./pages/Doctors";

// // doctor pages
// import DoctorRegister from "./pages/DoctorRegister";
// import DoctorLogin from "./pages/DoctorLogin";
// import DoctorDashboard from "./pages/DoctorDashboard";

// // video call (shared PatientVideoCall page)


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
//         <Route path="/doctors" element={<Doctors />} />

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

import Home from "./pages/Home";

// patient pages
import PatientRegister from "./pages/PatientRegister";
import PatientOtpVerify from "./pages/PatientOtpVerify";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PatientDashboard from "./pages/PatientDashboard";
import Doctors from "./pages/Doctors";
import PatientVideoCall from "./pages/PatientVideoCall"; // <-- Add this

// doctor pages
import DoctorRegister from "./pages/DoctorRegister";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Patient routes */}
        <Route path="/register" element={<PatientRegister />} />
        <Route path="/verify-otp" element={<PatientOtpVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patientvideocall" element={<PatientVideoCall />} /> {/* Added route */}

        {/* Doctor routes */}
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
