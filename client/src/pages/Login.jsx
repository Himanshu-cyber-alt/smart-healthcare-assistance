// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginPatient } from "../features/auth/authSlice";

// const Login = () => {
//   const [phone, setPhone] = useState("+917049468290");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogin = async () => {
//     try {
//       await dispatch(loginPatient(phone)).unwrap();
     
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert(err || "Login failed ❌");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Patient Login</h2>
//       <input
//         type="text"
//         placeholder="+91XXXXXXXXXX"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="border p-2 m-2"
//       />
//       <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPatient } from "../features/auth/authSlice";

const Login = () => {
  const [phone, setPhone] = useState("+91");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await dispatch(loginPatient(phone)).unwrap();
       localStorage.setItem("patientMobile",phone);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err || "Login failed ❌");
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
          Patient Login
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your registered phone number to access your dashboard.
        </p>

        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
