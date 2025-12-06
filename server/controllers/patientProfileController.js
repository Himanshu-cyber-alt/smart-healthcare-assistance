


import pool from "../config/db.js";
import {
  createProfile as createProfileModel,
  updateProfile as updateProfileModel,
  getProfileByPatientId,
} from "../models/patientProfileModel.js";

// CREATE profile
export const createProfile = async (req, res) => {
  try {
    const { patient_id } = req.body;

    console.log("Patien detail",req.body)
    if (!patient_id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const profile = await createProfileModel(patient_id, req.body);
    res.status(201).json(profile);
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const { patient_id } = req.params;

   
    if (!patient_id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const updatedProfile = await updateProfileModel(patient_id, req.body);

    console.log("UUUUUUUUU =>",updateProfile)
    
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Get profile by ID
export const getProfile = async (req, res) => {
  try {
    const { patient_id } = req.params;

    console.log("online patient id => ", patient_id)
    const result = await pool.query(
      "SELECT * FROM patient_profiles WHERE patient_id = $1 LIMIT 1",
      [patient_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};



