

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

// patient pages
import PatientRegister from "./pages/PatientRegister";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PatientDashboard from "./pages/PatientDashboard";
import Doctors from "./DoctorPages/Doctors";
import PatientVideoCall from "./pages/PatientVideoCall";

// doctor pages
import DoctorRegister from "./DoctorPages/DoctorRegister";
import DoctorLogin from "./DoctorPages/DoctorLogin";
import DoctorDashboard from "./DoctorPages/DoctorDashboard";
import AIAssistant from "./pages/AIAssistant";
import Appointment from "./pages/AppointmentTab"
import MyAppointment from "./pages/MyAppointment";
import TakeInfo from "./pages/TakeInfo";
import DoctorHome from "./DoctorPages/DoctorHome";

function App() {

  const id = localStorage.getItem("patient_id");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Patient routes */}
        <Route path="/register" element={<PatientRegister />} />
        
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

        <Route path = "/take-info" element={<TakeInfo/>} />

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
        <Route path="/appointment" element={<Appointment />} />
        <Route path = "/myappointments" element = {<MyAppointment/>}/>
        <Route path="/doctors" element={<Doctors />} />

        {/* Doctor routes */}
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-home" element={<DoctorHome />}/>
      </Routes>
    </Router>
  );
}

export default App;
