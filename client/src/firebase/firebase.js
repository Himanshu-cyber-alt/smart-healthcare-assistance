import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjJvven_XsABU6r6juQWmnTt1x_Y7Awb8",
  authDomain: "smart-healthcare-demo.firebaseapp.com",
  projectId: "smart-healthcare-demo",
  storageBucket: "smart-healthcare-demo.firebasestorage.app",
  messagingSenderId: "498180029677",
  appId: "1:498180029677:web:65554e6008c4afc215a0e4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Setup Recaptcha properly
export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",   // must be the ID of the HTML element
      {
        size: "invisible",     // invisible recaptcha
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      },
      auth
    );
  }
  return window.recaptchaVerifier;
};

// ✅ Send OTP
export const sendOtp = async (phoneNumber) => {
  const appVerifier = setupRecaptcha();
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

