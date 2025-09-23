// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createPatientProfile,
//   getPatientProfile,
//   updatePatientProfile,
// } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { User, Calendar, Ruler, Weight, Droplet, MapPin, FileText, Save } from 'lucide-react';
// import Navbar from "../components/Navbar";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, profile } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     full_name: "",
//     gender: "",
//     date_of_birth: "",
//     height_cm: "",
//     weight_kg: "",
//     blood_group: "",
//     address: "",
//     existing_conditions: "",
//   });

//   const [isSuccess, setIsSuccess] = useState(false);

//   // Fetch profile when user is available
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     if (user.patient_id) {
//       dispatch(getPatientProfile(user.patient_id)).catch(() => {
//         // profile may not exist yet
//       });
//     }
//   }, [user, dispatch, navigate]);

//   // Populate form when profile loads
//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         full_name: profile.full_name || "",
//         gender: profile.gender || "",
//         date_of_birth: profile.date_of_birth
//           ? profile.date_of_birth.split("T")[0]
//           : "",
//         height_cm: profile.height_cm || "",
//         weight_kg: profile.weight_kg || "",
//         blood_group: profile.blood_group || "",
//         address: profile.address || "",
//         existing_conditions: profile.existing_conditions || "",
//       });
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSuccess(false);

//     try {
//       if (profile && profile.patient_id === user.patient_id) {
//         // ✅ Update existing profile
//         await dispatch(
//           updatePatientProfile({ patient_id: profile.patient_id, profileData: formData })
//         ).unwrap();
//       } else {
//         // ✅ Create new profile
//         await dispatch(
//           createPatientProfile({ patient_id: user.patient_id, ...formData })
//         ).unwrap();
//       }

//       setIsSuccess(true);
//       setTimeout(() => setIsSuccess(false), 5000);

//     } catch (err) {
//       console.error("Profile save error:", err);
//       alert("Profile save error: " + (err?.message || "Unknown error"));
//     }
//   };

  // return (
  //   <>
  //     <Navbar />
  //     <div className="min-h-screen py-12 px-4">
  //       <div className="max-w-2xl mx-auto">
  //         <h1 className="text-4xl font-bold mb-6">Patient Profile</h1>

  //         <form onSubmit={handleSubmit} className="space-y-6">
  //           <input
  //             name="full_name"
  //             placeholder="Full name"
  //             value={formData.full_name}
  //             onChange={handleChange}
  //             className="w-full border p-2 rounded"
  //             required
  //           />

  //           <select
  //             name="gender"
  //             value={formData.gender}
  //             onChange={handleChange}
  //             required
  //             className="w-full border p-2 rounded"
  //           >
  //             <option value="">Select gender</option>
  //             <option value="Male">Male</option>
  //             <option value="Female">Female</option>
  //             <option value="Other">Other</option>
  //           </select>

  //           <input
  //             type="date"
  //             name="date_of_birth"
  //             value={formData.date_of_birth}
  //             onChange={handleChange}
  //             className="w-full border p-2 rounded"
  //           />

  //           <input
  //             type="number"
  //             name="height_cm"
  //             placeholder="Height (cm)"
  //             value={formData.height_cm}
  //             onChange={handleChange}
  //             className="w-full border p-2 rounded"
  //           />

  //           <input
  //             type="number"
  //             name="weight_kg"
  //             placeholder="Weight (kg)"
  //             value={formData.weight_kg}
  //             onChange={handleChange}
  //             className="w-full border p-2 rounded"
  //           />

  //           <input
  //             name="blood_group"
  //             placeholder="Blood group"
  //             value={formData.blood_group}
  //             onChange={handleChange}
  //             className="w-full border p-2 rounded"
  //           />

  //           <textarea
  //             name="address"
  //             placeholder="Address"
  //             value={formData.address}
  //             onChange={handleChange}
  //             className="w-full border p-2 rounded"
  //           />

  //           <textarea
  //             name="existing_conditions"
  //             placeholder="Existing conditions (optional)"
  //             value={formData.existing_conditions}
  //             onChange={handleChange}
  //             className="w-full border p-2 rounded"
  //           />

  //           <button
  //             type="submit"
  //             className="w-full bg-blue-600 text-white p-3 rounded font-bold"
  //           >
  //             {profile && profile.patient_id === user.patient_id
  //               ? "Update Profile"
  //               : "Save Profile"}
  //           </button>
  //         </form>

  //         {isSuccess && (
  //           <p className="mt-4 text-green-600 font-semibold">
  //             Profile saved successfully!
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   </>
  // );






import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Ruler, Weight, Droplet, MapPin, FileText, Save } from 'lucide-react';
import Navbar from "../components/Navbar";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profile } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    date_of_birth: "",
    height_cm: "",
    weight_kg: "",
    blood_group: "",
    address: "",
    existing_conditions: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch profile when user is available
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.patient_id) {
      dispatch(getPatientProfile(user.patient_id)).catch(() => {
        // profile may not exist yet
      });
    }
  }, [user, dispatch, navigate]);

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        gender: profile.gender || "",
        date_of_birth: profile.date_of_birth
          ? profile.date_of_birth.split("T")[0]
          : "",
        height_cm: profile.height_cm || "",
        weight_kg: profile.weight_kg || "",
        blood_group: profile.blood_group || "",
        address: profile.address || "",
        existing_conditions: profile.existing_conditions || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);

    try {
      if (profile && profile.patient_id === user.patient_id) {
        // ✅ Update existing profile
        await dispatch(
          updatePatientProfile({ patient_id: profile.patient_id, profileData: formData })
        ).unwrap();
      } else {
        // ✅ Create new profile
        await dispatch(
          createPatientProfile({ patient_id: user.patient_id, ...formData })
        ).unwrap();
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (err) {
      console.error("Profile save error:", err);
      alert("Profile save error: " + (err?.message || "Unknown error"));
    }
  };

 


return (
  <>
    <Navbar />
    <div
      className="min-h-screen py-12 px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/7722680/pexels-photo-7722680.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Form Card with glassmorphism */}
      <div className="relative max-w-2xl mx-auto bg-white/40 backdrop-blur-md p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Patient Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="full_name"
              placeholder="John Doe"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border border-gray-300/60 p-3 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300/60 p-3 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border border-gray-300/60 p-3 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height_cm"
                placeholder="170"
                value={formData.height_cm}
                onChange={handleChange}
                className="w-full border border-gray-300/60 p-3 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight_kg"
                placeholder="65"
                value={formData.weight_kg}
                onChange={handleChange}
                className="w-full border border-gray-300/60 p-3 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Blood Group
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full border border-gray-300/60 p-3 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              placeholder="123 Main St, City, Country"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300/60 p-3 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Existing Conditions */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Existing Conditions (Optional)
            </label>
            <textarea
              name="existing_conditions"
              placeholder="Diabetes, Hypertension, etc."
              value={formData.existing_conditions}
              onChange={handleChange}
              className="w-full border border-gray-300/60 p-3 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-colors"
          >
            {profile && profile.patient_id === user.patient_id
              ? "Update Profile"
              : "Save Profile"}
          </button>
        </form>

        {/* Success Message */}
        {isSuccess && (
          <p className="mt-4 text-green-600 font-semibold text-center">
            Profile saved successfully!
          </p>
        )}
      </div>
    </div>
  </>
);


};



export default Profile;
