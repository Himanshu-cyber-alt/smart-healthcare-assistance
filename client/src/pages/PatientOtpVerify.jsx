import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerPatient } from "../features/auth/authSlice";

const PatientOtpVerify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const phone = location.state?.phone;



  const handleVerify = async () => {
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        alert("No OTP request found. Please register again.");
        return;
      }

      // ✅ Firebase OTP check
      await confirmationResult.confirm(otp);

      // ✅ Register patient in backend
      const res = await dispatch(registerPatient(phone)).unwrap();

      console.log(res.patient_id)

      const patientId = res.patient_id;

      alert("OTP verified and patient registered!");

      // ✅ Redirect to profile page with patient_id
      navigate("/take-info", { state: { phone, patientId  } });

    } catch (err) {
      console.error("OTP verification error:", err);
      alert("Invalid OTP ❌");
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={handleVerify} className="bg-green-500 text-white p-2">
        Verify OTP
      </button>
    </div>
  );
};

export default PatientOtpVerify;


