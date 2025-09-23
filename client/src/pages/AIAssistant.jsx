




// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const symptomsList = [
//   "Fever",
//   "Cough",
//   "Headache",
//   "Fatigue",
//   "Chest Pain",
//   "Nausea",
//   "Dizziness",
//   "Shortness of Breath",
// ];

// export default function AIAssistant() {
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [doctors, setDoctors] = useState([]);
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
//     if (selectedSymptoms.length === 0) return alert("Select at least one symptom.");

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
//       const res = await axios.get(
//         `http://localhost:5000/api/doctors?specialty=${result.recommended_doctor}`
//       );
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
//     navigate("/patientvideocall", {
//       state: { doctorEmail, patientMobile },
//     });
//   };

// return (
//   <>
//     <Navbar />

//     <div
//       className="min-h-screen flex items-center justify-center p-6"
//       style={{
//         backgroundImage:
//           "url('https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="max-w-3xl w-full p-8 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-3xl shadow-2xl border border-gray-200 backdrop-blur-sm">
//         <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-8 animate-pulse">
//           🧑‍⚕️ AI Health Assistant
//         </h2>

//         {/* Symptoms */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
//           {symptomsList.map((symptom) => (
//             <button
//               key={symptom}
//               className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
//                 selectedSymptoms.includes(symptom)
//                   ? "bg-pink-400 text-white border-pink-500 shadow-md scale-105"
//                   : "bg-yellow-100 text-gray-800 border-yellow-300 hover:bg-yellow-200 hover:scale-105"
//               }`}
//               onClick={() => handleSymptomClick(symptom)}
//             >
//               {symptom}
//             </button>
//           ))}
//         </div>

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full py-3 rounded-2xl font-semibold text-white bg-pink-500 hover:bg-pink-600 transition duration-200 disabled:opacity-50 shadow-md"
//         >
//           {loading ? "Predicting..." : "Submit Symptoms"}
//         </button>

//         {/* Result */}
//         {result && (
//           <div className="mt-8 p-6 rounded-2xl border border-pink-200 bg-gradient-to-r from-yellow-100 via-pink-50 to-purple-100 shadow-md">
//             <p className="text-lg font-semibold text-gray-800">
//               🩺 Predicted Disease:{" "}
//               <span className="text-pink-600">{result.predicted_disease}</span>
//             </p>
//             <p className="text-lg font-semibold text-gray-800 mt-2">
//               👨‍⚕️ Recommended Doctor:{" "}
//               <span className="text-purple-600">{result.recommended_doctor}</span>
//             </p>

//             <button
//               onClick={handleSuggestDoctor}
//               disabled={loadingDoctors}
//               className="mt-6 w-full py-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition duration-200 shadow-md disabled:opacity-50"
//             >
//               {loadingDoctors ? "Loading Doctors..." : "🔹 Suggest Doctors"}
//             </button>
//           </div>
//         )}

//         {/* Doctor List */}
//         {doctors.length > 0 && (
//           <div className="mt-8 space-y-6">
//             <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
//               Available {result.recommended_doctor}s:
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {doctors.map((doctor) => (
//                 <div
//                   key={doctor.email}
//                   className="bg-gradient-to-tr from-pink-50 via-yellow-50 to-purple-50 p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
//                 >
//                   <div>
//                     <p className="font-bold text-gray-800 text-lg">{doctor.name}</p>
//                     <p className="text-gray-500">{doctor.specialty}</p>
//                     <p className="text-gray-500">{doctor.email}</p>
//                   </div>
//                   <button
//                     onClick={() => startCall(doctor.email)}
//                     className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-2xl shadow-md transition duration-200"
//                   >
//                     Start Video Call
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>

//     <Footer/>
//   </>
// );


// }



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 50+ symptoms based on our trained model
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
  "Joint Stiffness", "Swollen Glands", "Difficulty Breathing", "Hearing Loss"
];

export default function AIAssistant() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const navigate = useNavigate();

  // toggle symptom selection
  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  // submit symptoms to AI backend
  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) return alert("Select at least one symptom.");

    try {
      setLoading(true);
      setResult(null);
      setDoctors([]);
      const res = await axios.post("http://localhost:8000/predict", { symptoms: selectedSymptoms });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error predicting disease.");
    } finally {
      setLoading(false);
    }
  };

  // fetch doctors based on recommended specialty
  const handleSuggestDoctor = async () => {
    if (!result?.recommended_doctor) return;

    try {
      setLoadingDoctors(true);
      const res = await axios.get(`http://localhost:5000/api/doctors`);
      console.log("data from database => ",res.data)
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching doctors.");
    } finally {
      setLoadingDoctors(false);
    }
  };

  // navigate to video call
  const startCall = (doctorEmail) => {
    const patientMobile = localStorage.getItem("patientMobile");
    if (!patientMobile) return alert("Patient mobile missing!");
    navigate("/patientvideocall", { state: { doctorEmail, patientMobile } });
  };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
//         <div className="max-w-3xl w-full p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
//           <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-8 animate-pulse">
//             🧑‍⚕️ AI Health Assistant
//           </h2>

//           {/* Symptoms */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
//             {symptomsList.map(symptom => (
//               <button
//                 key={symptom}
//                 className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
//                   selectedSymptoms.includes(symptom)
//                     ? "bg-pink-400 text-white border-pink-500 shadow-md scale-105"
//                     : "bg-yellow-100 text-gray-800 border-yellow-300 hover:bg-yellow-200 hover:scale-105"
//                 }`}
//                 onClick={() => handleSymptomClick(symptom)}
//               >
//                 {symptom}
//               </button>
//             ))}
//           </div>

//           {/* Submit */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full py-3 rounded-2xl font-semibold text-white bg-pink-500 hover:bg-pink-600 transition duration-200 disabled:opacity-50 shadow-md"
//           >
//             {loading ? "Predicting..." : "Submit Symptoms"}
//           </button>

//           {/* Result */}
//           {result && (
//             <div className="mt-8 p-6 rounded-2xl border border-pink-200 bg-gradient-to-r from-yellow-100 via-pink-50 to-purple-100 shadow-md">
//               <p className="text-lg font-semibold text-gray-800">
//                 🩺 Predicted Disease: <span className="text-pink-600">{result.predicted_disease}</span>
//               </p>
//               <p className="text-lg font-semibold text-gray-800 mt-2">
//                 👨‍⚕️ Recommended Doctor: <span className="text-purple-600">{result.recommended_doctor}</span>
//               </p>

//               <button
//                 onClick={handleSuggestDoctor}
//                 disabled={loadingDoctors}
//                 className="mt-6 w-full py-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition duration-200 shadow-md disabled:opacity-50"
//               >
//                 {loadingDoctors ? "Loading Doctors..." : "🔹 Suggest Doctors"}
//               </button>
//             </div>
//           )}

//           {/* Doctor List */}
//           {doctors.length > 0 && (
//             <div className="mt-8 space-y-6">
//               <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
//                 Available {result.recommended_doctor}s:
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {doctors.map(doctor => (
//                   <div
//                     key={doctor.email}
//                     className="bg-gradient-to-tr from-pink-50 via-yellow-50 to-purple-50 p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
//                   >
//                     <div>
//                       <p className="font-bold text-gray-800 text-lg">{doctor.name}</p>
//                       <p className="text-gray-500">{doctor.specialty}</p>
//                       <p className="text-gray-500">{doctor.email}</p>
//                     </div>
//                     <button
//                       onClick={() => startCall(doctor.email)}
//                       className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-2xl shadow-md transition duration-200"
//                     >
//                       Start Video Call
//                     </button>
//                   </div>
//                 ))} 






//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );

return (
  <>
    <Navbar />

    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <div className="max-w-3xl w-full p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-8 animate-pulse">
          🧑‍⚕️ AI Health Assistant
        </h2>

        {/* Symptoms */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {symptomsList.map((symptom) => (
            <button
              key={symptom}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                selectedSymptoms.includes(symptom)
                  ? "bg-pink-400 text-white border-pink-500 shadow-md scale-105"
                  : "bg-yellow-100 text-gray-800 border-yellow-300 hover:bg-yellow-200 hover:scale-105"
              }`}
              onClick={() => handleSymptomClick(symptom)}
            >
              {symptom}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-semibold text-white bg-pink-500 hover:bg-pink-600 transition duration-200 disabled:opacity-50 shadow-md"
        >
          {loading ? "Predicting..." : "Submit Symptoms"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-8 p-6 rounded-2xl border border-pink-200 bg-gradient-to-r from-yellow-100 via-pink-50 to-purple-100 shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              🩺 Predicted Disease:{" "}
              <span className="text-pink-600">{result.predicted_disease}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-2">
              👨‍⚕️ Recommended Doctor:{" "}
              <span className="text-purple-600">{result.recommended_doctor}</span>
            </p>

            <button
              onClick={handleSuggestDoctor}
              disabled={loadingDoctors}
              className="mt-6 w-full py-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition duration-200 shadow-md disabled:opacity-50"
            >
              {loadingDoctors ? "Loading Doctors..." : "🔹 Suggest Doctors"}
            </button>
          </div>
        )}

        {/* Doctor List */}
        {doctors.length > 0 && result && (
          <div className="mt-8 space-y-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
              Available {result.recommended_doctor}s:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {doctors
                .filter(
                  (doctor) =>
                    doctor.specialization === result.recommended_doctor
                )
                .map((doctor) => (
                  <div
                    key={doctor.email}
                    className="bg-gradient-to-tr from-pink-50 via-yellow-50 to-purple-50 p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
                  >
                    <div>
                      <p className="font-bold text-gray-800 text-lg">
                        {doctor.name}
                      </p>
                      <p className="text-gray-500">{doctor.specialization}</p>
                      <p className="text-gray-500">{doctor.email}</p>
                    </div>
                    <button
                      onClick={() => startCall(doctor.email)}
                      className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-2xl shadow-md transition duration-200"
                    >
                      Start Video Call
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>

    <Footer />
  </>
);

}
