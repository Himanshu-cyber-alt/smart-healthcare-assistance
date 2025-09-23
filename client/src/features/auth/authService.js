// import axios from "axios";

// const API_URL = "http://localhost:5000/api/patients/profile/";

// // Patient registration
// const register = async (phone) => {
//   const res = await axios.post("http://localhost:5000/api/patients/register", {
//     mobile_number: phone,
//   });
//   return res.data;
// };

// // Patient login
// const login = async (phone) => {
//   const res = await axios.post("http://localhost:5000/api/patients/login", {
//     mobile_number: phone,
//   });
//   return res.data;
// };

// // Create patient profile
// const createProfile = async (profileData) => {
//   const res = await axios.post(API_URL, profileData);
//   return res.data;
// };

// // Get patient profile
// const getProfile = async (patientId) => {
//   const res = await axios.get(`${API_URL}${patientId}`);
//   return res.data;
// };

// // Update patient profile
// const updateProfile = async ({ patientId, profileData }) => {
//   const res = await axios.put(`${API_URL}${patientId}`, profileData);
//   return res.data;
// };

// const authService = {
//   register,
//   login,
//   createProfile,
//   getProfile,
//   updateProfile,
// };

// export default authService;

import axios from "axios";

const API_URL = "http://localhost:5000/api/patients/profile/";

// Create patient profile
const createProfile = async (profileData) => {
  const res = await axios.post(API_URL, profileData);
  return res.data;
};

// Update patient profile
const updateProfile = async (patientId, profileData) => {
  const response = await axios.put(API_URL + patientId, profileData);
  return response.data;
};

// Get patient profile
const getProfile = async (patientId) => {
  const res = await axios.get(API_URL + patientId);
  return res.data;
};

// Patient register
const register = async (phone) => {
  const res = await axios.post("http://localhost:5000/api/patients/register", {
    mobile_number: phone,
  });
  return res.data;
};

// Patient login
const login = async (phone) => {
  const res = await axios.post("http://localhost:5000/api/patients/login", {
    mobile_number: phone,
  });
  return res.data;
};

const authService = {
  register,
  login,
  createProfile,
  updateProfile,
  getProfile,
};

export default authService;
