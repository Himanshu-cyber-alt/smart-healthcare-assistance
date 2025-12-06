

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Droplet,
  Ruler,
  Weight,
  MapPin,
  HeartPulse,
} from "lucide-react";
import Navbar from "../components/Navbar";



export default function PatientDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

   

  const patientId = localStorage.getItem("patient_id");








  
  // stored after login/register

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/patients/${patientId || pd}`
        );
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();

        console.log(data)

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) fetchProfile();
  }, [patientId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );

 return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
    {/* ✅ Navbar */}
    <Navbar />

    {/* Header */}
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-15 border-b border-gray-200 mt-4">
      <h1 className="text-3xl font-semibold tracking-tight mb-2 sm:mb-0">
        {profile?.first_name ? `Hi, ${profile.first_name}` : "Welcome, Patient"}
      </h1>
      <button
        onClick={handleLogout}
        className="text-sm font-medium text-gray-500 hover:text-gray-800 transition mt-2 sm:mt-0"
      >
        Logout
      </button>
    </header>

    {/* Main Section */}
    <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      {profile ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {[
            { label: "Full Name", value: profile.first_name, icon: User },
            { label: "Gender", value: profile.gender, icon: User },
            { label: "Date of Birth", value: profile.dob, icon: Calendar },
            { label: "Blood Group", value: profile.blood_group, icon: Droplet },
            { label: "Height", value: `${profile.height} cm`, icon: Ruler },
            { label: "Weight", value: `${profile.weight} kg`, icon: Weight },
            { label: "Address", value: profile.address, icon: MapPin },
            { label: "Conditions", value: profile.symptoms, icon: HeartPulse },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 flex items-center justify-between border border-gray-100"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h2 className="text-sm text-gray-500">{item.label}</h2>
                <p className="text-lg font-medium text-gray-800 mt-1">
                  {item.value || "—"}
                </p>
              </div>
              <item.icon className="w-8 h-8 text-gray-400" />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          No profile information found.
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-16">
        {[
          { label: "Assistant", path: "/assistant" },
          
        ].map((btn, i) => (
          <motion.button
            key={i}
            onClick={() => navigate(btn.path)}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition"
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </main>
  </div>
);

}



