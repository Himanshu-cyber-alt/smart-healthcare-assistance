

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// const Doctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/doctors");
//         setDoctors(res.ok ? await res.json() : []);


//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchDoctors();
//   }, []);

//     const { user, profile } = useSelector((state) => state.auth);

  
// let patientMobile = user.
// mobile_number;
// console.log(patientMobile)

// function startCall(doctorEmail) {
  
// // must be set after login/register
//   if (!patientMobile) return alert("Patient mobile missing!");

//   navigate("/patientvideocall", {
//     state: { doctorEmail, patientMobile } // pass data to the next page
//   });
// }
//   return (

//   <>
//   <Navbar/>

//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Doctors Online</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {doctors.map((doctor) => (
//           <div key={doctor.email} className="bg-white p-6 shadow rounded-lg">
//             <h2 className="text-xl font-semibold">{doctor.email}</h2>
//             <p className="text-gray-700">Specialization: {doctor.specialization}</p>
//             <p className="mt-2">
//               <span
//                 className={`font-semibold ${
//                   doctor.is_online ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {doctor.is_online ? "Online" : "Offline"}
//               </span>
//             </p>
//             <button
//               onClick={() => startCall(doctor.email)}
//               className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow"
//             >
//               Start Video Call
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Doctors;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        setDoctors(res.ok ? await res.json() : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  const { user, profile } = useSelector((state) => state.auth);

  let patientMobile = user.patient.mobile_number;
  console.log(user);

  function startCall(doctorEmail) {
    // must be set after login/register
    if (!patientMobile) return alert("Patient mobile missing!");

    navigate("/patientvideocall", {
      state: { doctorEmail, patientMobile }, // pass data to the next page
    });
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Doctors Online</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.email} className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-xl font-semibold">{doctor.email}</h2>
              <p className="text-gray-700">
                Specialization: {doctor.specialization}
              </p>
              <p className="mt-2">
                <span
                  className={`font-semibold ${
                    doctor.is_online ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {doctor.is_online ? "Online" : "Offline"}
                </span>
              </p>
              <button
                onClick={() => startCall(doctor.email)}
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow"
              >
                Start Video Call
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;

