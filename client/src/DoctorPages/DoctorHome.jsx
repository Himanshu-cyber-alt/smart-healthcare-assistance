import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorHome() {
  const navigate = useNavigate();
  const doctorEmail = localStorage.getItem("doctor_email");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Doctor Home
        </h1>
        <p className="text-gray-500 mb-6">
          Welcome, {doctorEmail || "Doctor"}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-6"></div>

        {/* Actions */}
        <button
          onClick={() => navigate("/doctor-appointments")}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          View Appointments
        </button>

      </div>
    </div>
  );
}

export default DoctorHome;

