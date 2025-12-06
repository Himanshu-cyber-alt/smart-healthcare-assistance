

import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AppointmentBooking() {
  const location = useLocation();
  const { doctor } = location.state || {};

  console.log(doctor.email)
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    age: "",
    symptoms: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };






  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.age || !form.symptoms || !selectedDate || !selectedSlot) {
      alert("Please fill all fields and select a time slot.");
      return;
    }

    try {
      const patientId = localStorage.getItem("patient_id");
      const doctorEmail = doctor?.email;

      // ✅ Get local date (yyyy-mm-dd)
      const localDate = selectedDate.toLocaleDateString("en-CA"); // e.g. "2025-11-05"

      // ✅ Prepare appointment time in plain format (like "9:00 AM")
      const time = selectedSlot;

      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: patientId,
          doctor_email: doctorEmail,
          patient_name: form.name,
          age: form.age,
          symptoms: form.symptoms,
          location: form.location,
          appointment_date: localDate,
          appointment_time: time, // stay local
        }),
      });

      if (!response.ok) throw new Error("Failed to create appointment");
      const data = await response.json();
      navigate("/myappointments", { state: { patient_name: data.patient_name } });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Try again later.");
    }
  };





  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-white text-gray-900 font-sans flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-8 border-b border-gray-200 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-700 flex items-center gap-2">
          <Calendar className="w-7 h-7 text-blue-500" />
          Book Appointment
        </h1>
        <p className="text-sm text-gray-500">Step 1 of 3</p>
      </header>

      {/* Main form */}
      <main className="flex-grow px-6 md:px-12 py-12 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-3xl shadow-2xl w-full max-w-5xl p-10 md:p-14 space-y-14 transform transition-all duration-500 hover:shadow-blue-200"
        >
          {/* Patient Info Section */}
          <section>
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-8 gap-3">
              <User className="w-6 h-6 text-blue-600" /> Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Location (City / State)", name: "location", type: "text" },
                { label: "Age", name: "age", type: "number" },
                { label: "Symptoms", name: "symptoms", type: "text" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-2xl px-5 py-3 text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Date & Time Section */}
          <section>
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-8 gap-3">
              <Calendar className="w-6 h-6 text-blue-600" /> Select Date & Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-3">Select Date</label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-3 text-base bg-gray-50
                               focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:bg-white"
                    calendarClassName="rounded-xl shadow-2xl border border-gray-100 p-3"
                    placeholderText="Choose a date"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-3 rounded-2xl border text-sm font-medium transition-all duration-300
                        ${selectedSlot === slot
                          ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-10 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-base font-semibold shadow-lg
                         hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300"
            >
              Save and Continue →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
