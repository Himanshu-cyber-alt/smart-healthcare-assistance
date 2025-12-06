import { useEffect, useState } from "react";
import { Clock, Calendar, User, MapPin, Video, PhoneOff } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({}); // store timers for each appointment
  const navigate = useNavigate();


  const patientMobile = localStorage.getItem("patientMobile");



  // ✅ Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientId = localStorage.getItem("patient_id");
        if (!patientId) {
          setError("No patient ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/appointments/${patientId}`);
        if (!res.ok) throw new Error("Failed to fetch appointments.");

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);




  // 🕒 Parse 12-hour to 24-hour time
  const parseTime12Hour = (timeStr) => {
    const [time, meridiem] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  // ⏳ Calculate time difference in seconds between NOW and appointment time
  const getTimeDifferenceInSeconds = (appointmentDate, appointmentTime) => {
    const { hours: appHours, minutes: appMinutes } = parseTime12Hour(appointmentTime);
    const appointment = new Date(
      `${appointmentDate}T${appHours.toString().padStart(2, "0")}:${appMinutes
        .toString()
        .padStart(2, "0")}:00`
    );
    console.log("DEBUG: Time Diff Calculation", {
      appointmentDate,
      appointmentTime,
      appHours,
      appMinutes,
      combinedString: `${appointmentDate}T${appHours.toString().padStart(2, "0")}:${appMinutes.toString().padStart(2, "0")}:00`,
      parsedDate: appointment,
      now: new Date()
    });
    const now = new Date();
    let diff = Math.floor((appointment - now) / 1000);
    if (diff < 0) diff = 0;
    return diff;
  };

  // 🕐 Setup timers that survive page refresh using localStorage
  useEffect(() => {
    if (appointments.length === 0) return;

    const timers = {};

    appointments.forEach((app) => {
      const storageKey = `timer_${app.appointment_id}`;
      const savedTimestamp = localStorage.getItem(storageKey);

      let remaining;
      if (savedTimestamp) {
        const now = Math.floor(Date.now() / 1000);
        remaining = savedTimestamp - now;
      } else {
        const diff = getTimeDifferenceInSeconds(app.appointment_date, app.appointment_time);
        const endTime = Math.floor(Date.now() / 1000) + diff;
        localStorage.setItem(storageKey, endTime);
        remaining = diff;
      }

      timers[app.appointment_id] = remaining > 0 ? remaining : 0;
    });

    setTimeLeft(timers);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = {};
        for (const key in prev) {
          updated[key] = prev[key] > 0 ? prev[key] - 1 : 0;
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [appointments]);

  // 🧮 Format countdown
  const formatTime = (seconds) => {
    if (seconds <= 0) return "Time reached";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  // 🎥 Start / End call actions
  const handleStartVideo = (doctorEmail) => {
    console.log("🎥 Starting video call with:", doctorEmail);


    navigate("/patientvideocall", {
      state: { doctorEmail, patientMobile }, // pass data to the next page
    });

  };

  const handleEndVideo = (doctorEmail) => {
    console.log("🔴 Ending video call with:", doctorEmail);
    // Optional: update backend to mark appointment as completed
  };

  // 🌀 Loading / Error states
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-700 text-lg">
        Loading appointments...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );

  // 🩺 Main UI
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold text-blue-800 mb-8">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600 text-lg">No appointments found.</p>
      ) : (
        <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-2 lg:grid-cols-3">
          {appointments.map((app, index) => {
            const remaining = timeLeft[app.appointment_id] || 0;
            const showVideoButtons = remaining <= 0;

            return (
              <div
                key={app.appointment_id || index}
                className="bg-white shadow-lg rounded-2xl p-5 border-t-4 border-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Dr. {app.doctor_email?.split("@")[0].split(".")[0] || "Unknown"}
                  </h2>
                  <Clock className="text-blue-600 w-5 h-5" />
                </div>

                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" /> {app.patient_name}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4" /> {app.location || "Unknown"}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" /> {app.appointment_time}
                </p>

                <div className="mt-4 flex justify-between items-center bg-blue-50 text-blue-700 py-2 px-3 rounded-lg">
                  {showVideoButtons ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartVideo(app.doctor_email)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition transform hover:scale-105"
                      >
                        <Video size={16} />
                        Start
                      </button>


                    </div>
                  ) : (
                    <span>⏳ {formatTime(remaining)} left</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}



