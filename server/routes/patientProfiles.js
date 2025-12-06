



import express from "express";
import pool from "../config/db.js";
import {updateProfile,getProfile,createProfile} from "../controllers/patientProfileController.js"

const router = express.Router();

// Create profile


// Update profile
 router.put("/:patient_id", updateProfile);

// Get profile
router.get("/:patient_id",getProfile);

export default router;

