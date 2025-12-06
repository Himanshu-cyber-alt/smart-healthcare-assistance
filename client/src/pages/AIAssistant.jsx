
// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Stethoscope, Activity, Brain, Search } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const symptomsList = [
//   "Fever", "Cough", "Headache", "Fatigue", "Chest Pain", "Nausea",
//   "Dizziness", "Shortness of Breath", "Sore Throat", "Runny Nose",
//   "Palpitations", "Abdominal Pain", "Diarrhea", "Vomiting", "Back Pain",
//   "Joint Pain", "Skin Rash", "Blurred Vision", "Anxiety", "Depression",
//   "Swelling", "Weight Loss", "Weight Gain", "Hair Loss", "Insomnia",
//   "Sneezing", "Nasal Congestion", "Wheezing", "Muscle Weakness", "Seizures",
//   "Tremors", "Memory Loss", "Chest Tightness", "Heartburn", "Constipation",
//   "Frequent Urination", "Loss of Appetite", "Pale Skin", "Yellow Eyes",
//   "Bleeding", "Coughing Blood", "Mood Swings", "Cold Hands/Feet",
//   "Night Sweats", "Frequent Headaches", "Short-Term Memory Loss",
//   "Joint Stiffness", "Swollen Glands", "Difficulty Breathing", "Hearing Loss"
// ];

// export default function AIAssistant() {
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [result, setResult] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingDoctors, setLoadingDoctors] = useState(false);
//   const navigate = useNavigate();

//   const handleSymptomClick = (symptom) => {
//     setSelectedSymptoms((prev) =>
//       prev.includes(symptom)
//         ? prev.filter((s) => s !== symptom)
//         : [...prev, symptom]
//     );
//   };

//   const handleSubmit = async () => {
//     if (selectedSymptoms.length === 0)
//       return alert("Select at least one symptom.");

//     try {
//       setLoading(true);
//       setResult(null);
//       setDoctors([]);
//       const res = await axios.post("http://localhost:8000/predict", {
//         symptoms: selectedSymptoms,
//       });
//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Error predicting disease.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSuggestDoctor = async () => {
//     if (!result?.recommended_doctor) return;

//     try {
//       setLoadingDoctors(true);
//       const res = await axios.get("http://localhost:5000/api/doctors");
//       setDoctors(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching doctors.");
//     } finally {
//       setLoadingDoctors(false);
//     }
//   };

//   const startCall = (doctorEmail) => {
//     const patientMobile = localStorage.getItem("patientMobile");
//     if (!patientMobile) return alert("Patient mobile missing!");
//     navigate("/patientvideocall", { state: { doctorEmail, patientMobile } });
//   };


//   console.log(doctors)


//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
//         <header className="flex justify-between items-center px-8 py-20 border-b border-gray-200">
//           <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
//             <Stethoscope className="text-pink-black" /> AI Health Assistant
//           </h1>
//           <button
//             onClick={() => navigate("/patientdashboard")}
//             className="text-sm font-medium text-gray-500 hover:text-gray-800 transition"
//           >
//             Back to Dashboard
//           </button>
//         </header>

//         <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
//           {/* Symptoms Grid */}
//           <motion.div
//             className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             {symptomsList.map((symptom) => (
//               <button
//                 key={symptom}
//                 onClick={() => handleSymptomClick(symptom)}
//                 className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200 shadow-sm ${
//                   selectedSymptoms.includes(symptom)
//                     ? "bg-pink-500 text-white border-pink-600"
//                     : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
//                 }`}
//               >
//                 {symptom}
//               </button>
//             ))}
//           </motion.div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <motion.button
//               onClick={handleSubmit}
//               disabled={loading}
//               whileHover={{ scale: 1.05 }}
//               className="px-8 py-3 bg-pink-600 text-white rounded-full font-semibold shadow-md hover:bg-pink-700 transition disabled:opacity-60"
//             >
//               {loading ? "Predicting..." : "Submit Symptoms"}
//             </motion.button>
//           </div>

//           {/* Result */}
//           {result && (
//             <motion.div
//               className="mt-10 bg-white p-8 rounded-3xl shadow-md border border-gray-100"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                 <Activity className="text-pink-600" /> Predicted Disease
//               </h2>
//               <p className="mt-2 text-lg text-gray-700">
//                 {result.predicted_disease}
//               </p>

//               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mt-6">
//                 <Brain className="text-purple-600" /> Recommended Doctor
//               </h2>
//               <p className="mt-2 text-lg text-gray-700">
//                 {result.recommended_doctor}
//               </p>

//               <motion.button
//                 onClick={handleSuggestDoctor}
//                 disabled={loadingDoctors}
//                 whileHover={{ scale: 1.05 }}
//                 className="mt-6 w-full py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-60"
//               >
//                 {loadingDoctors ? "Loading Doctors..." : "View Available Doctors"}
//               </motion.button>
//             </motion.div>
//           )}

//           {/* Doctor Cards */}
// {doctors.length > 0 && result && (
//   <motion.div
//     className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ delay: 0.3, duration: 0.7 }}
//   >
//     {doctors
//       .filter(doctor => doctor.specialization === result.recommended_doctor)
//       .map(doctor => (
//         <motion.div
//           key={doctor.email}
//           className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
//           whileHover={{ scale: 1.02 }}
//         >
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
//             <p className="text-sm text-gray-500 mt-1">{doctor.specialization}</p>
//             <p className="text-sm text-gray-500">{doctor.email}</p>
//           </div>

//           {/* ✅ Option to book appointment instead of direct video call */}
//           <motion.button
//             onClick={() => navigate("/appointment", { state: { doctor } })}
//             whileHover={{ scale: 1.05 }}
//             className="mt-4 bg-blue-600 text-white py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
//           >
//             Book Appointment
//           </motion.button>
//         </motion.div>
//       ))}
//   </motion.div>
// )}







//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// }



import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Activity, Brain } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const symptomsList = [
  "Fever", "Cough", "Headache", "Fatigue", "Chest Pain", "Nausea",
  "Dizziness", "Shortness of Breath", "Sore Throat", "Runny Nose",
  "Palpitations", "Abdominal Pain", "Diarrhea", "Vomiting", "Back Pain",
  "Joint Pain", "Skin Rash", "Blurred Vision", "Anxiety", "Depression",
  "Swelling", "Weight Loss", "Weight Gain", "Hair Loss", "Insomnia",
  "Sneezing", "Nasal Congestion", "Wheezing", "Muscle Weakness", "Seizures",
  "Tremors", "Memory Loss", "Chest Tightness", "Heartburn", "Constipation",
  "Frequent Urination", "Loss of Appetite", "Pale Skin", "Yellow Eyes",
  "Bleeding", "Coughing Blood", "Mood Swings", "Cold Hands/Feet",
  "Night Sweats", "Frequent Headaches", "Short-Term Memory Loss",
  "Joint Stiffness", "Swollen Glands", "Difficulty Breathing", "Hearing Loss",
];

export default function AIAssistant() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const navigate = useNavigate();

  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0)
      return alert("Select at least one symptom.");

    try {
      setLoading(true);
      setResult(null);
      setDoctors([]);
      const res = await axios.post("http://localhost:8000/predict", {
        symptoms: selectedSymptoms,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error predicting disease.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestDoctor = async () => {
    if (!result?.recommended_doctor) return;

    try {
      setLoadingDoctors(true);
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching doctors.");
    } finally {
      setLoadingDoctors(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-16 border-b border-gray-200">
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Stethoscope className="text-black" /> AI Health Assistant
          </h1>
          <button
            onClick={() => navigate("/patientdashboard")}
            className="text-sm font-medium text-gray-500 hover:text-gray-800 transition"
          >
            Back to Dashboard
          </button>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          {/* Symptom Selection Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {symptomsList.map((symptom) => (
              <button
                key={symptom}
                onClick={() => handleSymptomClick(symptom)}
                className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200 shadow-sm ${
                  selectedSymptoms.includes(symptom)
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {symptom}
              </button>
            ))}
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 bg-black text-white rounded-full font-semibold shadow-md hover:bg-gray-800 transition disabled:opacity-60"
            >
              {loading ? "Predicting..." : "Submit Symptoms"}
            </motion.button>
          </div>

          {/* Prediction Result */}
          {result && (
            <motion.div
              className="mt-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Activity className="text-black" /> Predicted Disease
              </h2>
              <p className="mt-2 text-lg text-gray-700">
                {result.predicted_disease}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mt-6">
                <Brain className="text-gray-800" /> Recommended Doctor
              </h2>
              <p className="mt-2 text-lg text-gray-700">
                {result.recommended_doctor}
              </p>

              <motion.button
                onClick={handleSuggestDoctor}
                disabled={loadingDoctors}
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition disabled:opacity-60"
              >
                {loadingDoctors ? "Loading Doctors..." : "View Available Doctors"}
              </motion.button>
            </motion.div>
          )}

          {/* Doctor Cards */}
          {doctors.length > 0 && result && (
            <motion.div
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {doctors
                .filter(
                  (doctor) =>
                    doctor.specialization === result.recommended_doctor
                )
                .map((doctor) => (
                  <motion.div
                    key={doctor.email}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {doctor.specialization}
                      </p>
                      <p className="text-sm text-gray-500">{doctor.email}</p>
                    </div>

                    <motion.button
                      onClick={() => navigate("/appointment", { state: { doctor } })}
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 bg-black text-white py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
                    >
                      Book Appointment
                    </motion.button>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </main>
      </div>
     
    </>
  );
}
