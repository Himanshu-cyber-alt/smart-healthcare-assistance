// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default function Patient() {
//   const localVideo = useRef();
//   const remoteVideo = useRef();
//   const pc = useRef(null);
//   const [roomId, setRoomId] = useState("demoRoom");
//   const [callStatus, setCallStatus] = useState("idle"); // idle | waiting | inCall

//   useEffect(() => {
//     console.log("Joining room:", roomId);
//     socket.emit("joinRoom", { roomId });

//     // Handle doctor's call response
//     const handleCallResponse = async ({ accepted }) => {
//       console.log("Call response received:", accepted);
//       if (accepted) {
//         setCallStatus("inCall");
//         await startWebRTC();
//       } else {
//         setCallStatus("idle");
//         alert("Doctor declined the call.");
//       }
//     };

//     // Handle WebRTC signals (offer/answer/ICE)
//     const handleSignal = async ({ data }) => {
//       if (!pc.current) return;

//       if (data.type === "answer") {
//         await pc.current.setRemoteDescription(new RTCSessionDescription(data));
//       } else if (data.candidate) {
//         await pc.current.addIceCandidate(new RTCIceCandidate(data));
//       }
//     };

//     // Handle call ended by doctor
//     const handleCallEnded = () => {
//       console.log("Call ended by doctor");
//       endCall(false);
//     };

//     socket.on("callResponse", handleCallResponse);
//     socket.on("signal", handleSignal);
//     socket.on("callEnded", handleCallEnded);

//     return () => {
//       socket.off("callResponse", handleCallResponse);
//       socket.off("signal", handleSignal);
//       socket.off("callEnded", handleCallEnded);
//     };
//   }, [roomId]);

//   // Request a call
//   function requestCall() {
//     console.log("Requesting call for room:", roomId);
//     setCallStatus("waiting");
//     socket.emit("callRequest", { roomId });
//   }

//   // Start WebRTC connection
//   async function startWebRTC() {
//     try {
//       console.log("Starting WebRTC...");
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localVideo.current.srcObject = stream;

//       pc.current = new RTCPeerConnection();

//       // Add local tracks
//       stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

//       // Receive remote tracks
//       pc.current.ontrack = (event) => {
//         console.log("Remote track received:", event.streams);
//         remoteVideo.current.srcObject = event.streams[0];
//       };

//       // Send ICE candidates
//       pc.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           console.log("Sending ICE candidate:", event.candidate);
//           socket.emit("signal", { roomId, data: event.candidate });
//         }
//       };

//       // Create and send offer
//       const offer = await pc.current.createOffer();
//       await pc.current.setLocalDescription(offer);
//       console.log("Sending offer:", offer);
//       socket.emit("signal", { roomId, data: offer });
//     } catch (err) {
//       console.error("WebRTC error:", err);
//       alert("Could not start call. Make sure camera and microphone are allowed.");
//       setCallStatus("idle");
//     }
//   }

//   // End the call
//   function endCall(emit = true) {
//     console.log("Ending call...");
//     setCallStatus("idle");

//     if (pc.current) {
//       pc.current.close();
//       pc.current = null;
//     }
//     if (localVideo.current?.srcObject) {
//       localVideo.current.srcObject.getTracks().forEach((track) => track.stop());
//       localVideo.current.srcObject = null;
//     }
//     if (remoteVideo.current) remoteVideo.current.srcObject = null;

//     if (emit) socket.emit("callEnded", { roomId });
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] p-6 text-white font-sans">
//       <h2 className="text-3xl font-bold mb-4">Patient</h2>

//       <div className="flex flex-col sm:flex-row items-center gap-4">
//         <input
//           className="p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//           placeholder="Enter room ID"
//         />
//         <button
//           onClick={requestCall}
//           className={`px-6 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 transition transform hover:scale-105 ${
//             callStatus === "waiting" || callStatus === "inCall" ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={callStatus === "waiting" || callStatus === "inCall"}
//         >
//           {callStatus === "waiting" ? "Waiting..." : "Start Call"}
//         </button>
//         <button
//           onClick={() => endCall(true)}
//           className="px-6 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 transition transform hover:scale-105"
//           disabled={callStatus !== "inCall"}
//         >
//           End Call
//         </button>
//       </div>

//       <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 w-full max-w-[1200px]">
//         <div className="relative flex-1 max-w-[600px] aspect-video rounded-2xl overflow-hidden bg-black/20 backdrop-blur-lg border border-white/20 shadow-lg">
//           <video ref={localVideo} autoPlay playsInline muted className="w-full h-full object-cover" />
//         </div>
//         <div className="relative flex-1 max-w-[600px] aspect-video rounded-2xl overflow-hidden bg-black/20 backdrop-blur-lg border border-white/20 shadow-lg">
//           <video ref={remoteVideo} autoPlay playsInline className="w-full h-full object-cover" />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:5000");

export default function PatientVideoCall() {
  const localVideo = useRef();
  const remoteVideo = useRef();
  const pc = useRef(null);
  const [callStatus, setCallStatus] = useState("idle"); // idle | waiting | inCall

    const location = useLocation();
  const { doctorEmail , patientMobile } = location.state || {};

  console.log("Call target:", doctorEmail , patientMobile);

  const targetDoctorEmail = doctorEmail;
 
  // const patientMobile = patientMob ;




  useEffect(() => {
    socket.on("callResponse", async ({ accepted, doctorSocket }) => {
      if (accepted) {
        setCallStatus("inCall");
        await startWebRTC(doctorSocket);
      } else {
        setCallStatus("idle");
        alert("Doctor declined the call.");
      }
    });

    socket.on("webrtc-answer", async ({ answer }) => {
      if (pc.current && answer) await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("webrtc-ice-candidate", async ({ candidate }) => {
      if (pc.current && candidate) await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("callEnded", () => endCall(false));

    return () => {
      socket.off("callResponse");
      socket.off("webrtc-answer");
      socket.off("webrtc-ice-candidate");
      socket.off("callEnded");
    };
  }, []);

  function requestCall() {
    if (!targetDoctorEmail || !patientMobile) return alert("Missing info");
    setCallStatus("waiting");
    socket.emit("callRequest", { doctorEmail: targetDoctorEmail, patientMobile });
  }

  async function startWebRTC(doctorSocket) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.current.srcObject = stream;

    pc.current = new RTCPeerConnection();
    stream.getTracks().forEach(track => pc.current.addTrack(track, stream));

    pc.current.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0];
    };

    pc.current.onicecandidate = (event) => {
      if (event.candidate) socket.emit("webrtc-ice-candidate", { targetSocket: doctorSocket, candidate: event.candidate });
    };

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    socket.emit("webrtc-offer", { targetSocket: doctorSocket, offer });
  }

  function endCall(emit = true) {
    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }
    if (localVideo.current?.srcObject) localVideo.current.srcObject.getTracks().forEach(t => t.stop());
    if (remoteVideo.current) remoteVideo.current.srcObject = null;
    setCallStatus("idle");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">Patient Video Call</h2>

      <div className="flex gap-4 mb-4">
        <video ref={localVideo} autoPlay muted className="w-80 h-60 bg-black" />
        <video ref={remoteVideo} autoPlay className="w-80 h-60 bg-black" />
      </div>

      <div className="flex gap-4">
        <button
          onClick={requestCall}
          disabled={callStatus === "waiting" || callStatus === "inCall"}
          className="px-4 py-2 bg-purple-600 rounded"
        >
          {callStatus === "waiting" ? "Waiting..." : "Start Call"}
        </button>
        <button
          onClick={() => endCall(true)}
          disabled={callStatus !== "inCall"}
          className="px-4 py-2 bg-red-600 rounded"
        >
          End Call
        </button>
      </div>
    </div>
  );
}
