













import express from "express";

import cors from "cors";
import http from "http";
import { Server } from "socket.io";


import  registerLogin from "./routes/patients.js";
import patientRoutes from "./routes/patientProfiles.js"

import doctorRoutes from "./routes/doctorRoutes.js";
import testRouter from "./routes/testRouter.js"
import appointment from "./routes/appointmentRoutes.js"

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });




const doctorSockets = {};

console.log(doctorSockets)

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("registerDoctor", ({ email }) => {
    doctorSockets[email] = socket.id;
    console.log(`Doctor registered: ${email} → ${socket.id}`);
  });

  socket.on("callRequest", ({ doctorEmail, patientMobile }) => {
    const doctorSocket = doctorSockets[doctorEmail];
    if (doctorSocket) {
      io.to(doctorSocket).emit("incomingCall", { patientMobile, patientSocket: socket.id });
    } else {
      socket.emit("doctorOffline", { doctorEmail });
    }
  });

  socket.on("callResponse", ({ patientSocket, accepted }) => {
    io.to(patientSocket).emit("callResponse", { accepted, doctorSocket: socket.id });
  });

  socket.on("webrtc-offer", ({ targetSocket, offer }) => {
    io.to(targetSocket).emit("webrtc-offer", { offer, fromSocket: socket.id });
  });

  socket.on("webrtc-answer", ({ targetSocket, answer }) => {
    io.to(targetSocket).emit("webrtc-answer", { answer });
  });

  socket.on("webrtc-ice-candidate", ({ targetSocket, candidate }) => {
    io.to(targetSocket).emit("webrtc-ice-candidate", { candidate });
  });

  socket.on("callEnded", ({ targetSocket }) => {
    io.to(targetSocket).emit("callEnded");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const email in doctorSockets) {
      if (doctorSockets[email] === socket.id) delete doctorSockets[email];
    }
  });
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


app.use("/api/patients", registerLogin);
app.use("/api/patients", patientRoutes);
app.use("/api/patient/profile",testRouter);



// app.use("/api/patients/profile", patientProfileRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments",appointment)



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




