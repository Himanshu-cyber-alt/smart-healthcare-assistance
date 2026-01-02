

import axios from "axios";

const API_URL = "http://localhost:5000/api/patients/profile/";


const getAuthConfig = () => {
  const token = localStorage.getItem("patientToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};



const createProfile = async (profileData) => {
  const res = await axios.post(
    API_URL,
    profileData,
    getAuthConfig()
  );
  return res.data;
};


const updateProfile = async (patientId, profileData) => {
  const response = await axios.put(
    'http://localhost:5000/api/patients' + patientId,
    profileData,
    getAuthConfig()
  );
  return response.data;
};


// Get patient profile
const getProfile = async (patientId) => {

  console.log(patientId)
  const res = await axios.get(
    'http://localhost:5000/api/patients/' + patientId,
    getAuthConfig()
  );
  return res.data;
};



// const register = async ({ email, password, mobile }) => {
//   const res = await axios.post("http://localhost:5000/api/patients/register", {
//     email,
//     password,
//     mobile_number: mobile,
//   });
//   return res.data;
// };


const register = async ({ email, password }) => {
  const res = await axios.post("http://localhost:5000/api/patients/register", {
    email,
    password,
  });
  return res.data;
};


const login = async ({ email, password }) => {
  
  const res = await axios.post("http://localhost:5000/api/patients/login", {
    email,
    password,
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
