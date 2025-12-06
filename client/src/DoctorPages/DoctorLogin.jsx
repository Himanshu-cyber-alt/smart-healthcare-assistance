import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // added

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/doctors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // store token (for later API calls)
      localStorage.setItem("doctorToken", data.token);
    const email = formData.email;
    // console.log(email)
     sessionStorage.setItem("email", email);

      // redirect to Doctor Dashboard
      navigate("/doctor/dashboard");

    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Doctor Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
};

export default DoctorLogin;


