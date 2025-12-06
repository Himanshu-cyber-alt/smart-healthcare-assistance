





import React, { useState } from "react";
import axios from "axios";
import { sendOtp } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


const PatientRegister = () => {
  const [phone, setPhone] = useState("+911234567899");
  const navigate = useNavigate();




const handleSendOtp = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/patients/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile_number: phone }),
    });

    const data = await res.json();

  

    if (data.exists) {
      alert("User already registered. Redirecting to login...");
      navigate("/login");
    } else {
      const result = await sendOtp(phone);
      window.confirmationResult = result;
      navigate("/verify-otp", { state: { phone  } });
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};



  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-sky-100">
      {/* Background image overlay */}
   
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7722680/pexels-photo-7722680.jpeg')",
        }}
      ></div>

      {/* Card */}
      <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Patient Register
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your phone number to register and verify with OTP.
        </p>

        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={handleSendOtp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Send OTP
        </button>

        {/* Firebase reCAPTCHA container */}
        <div id="recaptcha-container" className="mt-4"></div>
      </div>
    </div>
  );
};

export default PatientRegister;



