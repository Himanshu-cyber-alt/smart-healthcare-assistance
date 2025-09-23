import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientProfile } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.auth);
console.log("User from Redux:", user);



 useEffect(() => {
  if (user?.patient?.patient_id) {
    dispatch(getPatientProfile(user.patient.patient_id));

  }
}, [dispatch, user]);


    return (
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile?.full_name || "Patient"}!</h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {profile ? (
            <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700"><span className="font-semibold">Full Name:</span> {profile.full_name}</p>
                <p className="text-gray-700"><span className="font-semibold">Gender:</span> {profile.gender}</p>
                <p className="text-gray-700"><span className="font-semibold">Date of Birth:</span> {profile.date_of_birth}</p>
                <p className="text-gray-700"><span className="font-semibold">Blood Group:</span> {profile.blood_group}</p>
              </div>
              <div>
                <p className="text-gray-700"><span className="font-semibold">Height:</span> {profile.height_cm} cm</p>
                <p className="text-gray-700"><span className="font-semibold">Weight:</span> {profile.weight_kg} kg</p>
                <p className="text-gray-700"><span className="font-semibold">Address:</span> {profile.address}</p>
                <p className="text-gray-700"><span className="font-semibold">Conditions:</span> {profile.existing_conditions}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
              No profile info yet. Please update your profile.
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow transition duration-200">
              Appointments
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded shadow transition duration-200">
              Ask AI
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded shadow transition duration-200">
              Video Call
            </button>
          </div>
        </main>
      </div>
    );
  };

  export default PatientDashboard;



