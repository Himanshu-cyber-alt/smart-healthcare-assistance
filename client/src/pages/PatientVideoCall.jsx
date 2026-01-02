

// import React, { useRef, useState, useEffect } from "react";
// import io from "socket.io-client";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Phone, PhoneOff } from "lucide-react";

// const socket = io("http://localhost:5000");

// export default function PatientVideoCall() {
//   const navigate = useNavigate();
//   const localVideo = useRef();
//   const remoteVideo = useRef();
//   const pc = useRef(null);
//   const [callStatus, setCallStatus] = useState("idle"); // idle | waiting | inCall

//   const location = useLocation();
//   const { doctorEmail, patientMobile } = location.state || {};

//   useEffect(() => {
//     socket.on("callResponse", async ({ accepted, doctorSocket }) => {
//       if (accepted) {
//         setCallStatus("inCall");
//         await startWebRTC(doctorSocket);
//       } else {
//         setCallStatus("idle");
//         alert("Doctor declined the call.");
//       }
//     });

//     socket.on("webrtc-answer", async ({ answer }) => {
//       if (pc.current && answer)
//         await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     socket.on("webrtc-ice-candidate", async ({ candidate }) => {
//       if (pc.current && candidate)
//         await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     socket.on("callEnded", () => endCall(false));

//     return () => {
//       socket.off("callResponse");
//       socket.off("webrtc-answer");
//       socket.off("webrtc-ice-candidate");
//       socket.off("callEnded");
//     };
//   }, []);

//   function requestCall() {
//     if (!doctorEmail || !patientMobile) return alert("Missing info");
//     setCallStatus("waiting");
//     socket.emit("callRequest", { doctorEmail, patientMobile });
//   }

//   async function startWebRTC(doctorSocket) {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localVideo.current.srcObject = stream;

//     pc.current = new RTCPeerConnection();
//     stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

//     pc.current.ontrack = (event) => {
//       remoteVideo.current.srcObject = event.streams[0];
//     };

//     pc.current.onicecandidate = (event) => {
//       if (event.candidate)
//         socket.emit("webrtc-ice-candidate", {
//           targetSocket: doctorSocket,
//           candidate: event.candidate,
//         });
//     };

//     const offer = await pc.current.createOffer();
//     await pc.current.setLocalDescription(offer);
//     socket.emit("webrtc-offer", { targetSocket: doctorSocket, offer });
//   }

//   function endCall(emit = true) {
//     if (emit) socket.emit("endCall", { patientMobile });
//     if (pc.current) pc.current.close();
//     if (localVideo.current?.srcObject)
//       localVideo.current.srcObject.getTracks().forEach((t) => t.stop());
//     if (remoteVideo.current) remoteVideo.current.srcObject = null;

//     setCallStatus("idle");
//     navigate("/dashboard");
//   }

//   return (
//     <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden text-white">
//       {/* Remote Video */}
//       <video
//         ref={remoteVideo}
//         autoPlay
//         playsInline
//         className="absolute w-full h-full object-cover"
//       />

//       {/* Local Video */}
//       <video
//         ref={localVideo}
//         autoPlay
//         muted
//         playsInline
//         className="absolute bottom-6 right-6 w-44 h-32 rounded-lg border-2 border-white object-cover shadow-lg"
//       />

//       {/* Overlay for call status */}
//       {callStatus === "waiting" && (
//         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
//           <p className="text-xl font-semibold animate-pulse">Calling Doctor...</p>
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="absolute bottom-10 flex gap-8">
//         {callStatus === "idle" && (
//           <button
//             onClick={requestCall}
//             className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full text-lg font-semibold hover:bg-green-700 transition"
//           >
//             <Phone className="w-5 h-5" /> Start Call
//           </button>
//         )}

//         {callStatus === "inCall" && (
//           <button
//             onClick={() => endCall(true)}
//             className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-full text-lg font-semibold hover:bg-red-700 transition"
//           >
//             <PhoneOff className="w-5 h-5" /> End Call
//           </button>
//         )}
//       </div>

//       {/* Doctor Info */}
//       <div className="absolute top-6 left-6 text-gray-200">
//         <h2 className="text-lg font-semibold">Dr. {doctorEmail || "Unknown"}</h2>
//         <p className="text-sm opacity-70">
//           {callStatus === "inCall" ? "In Call" : callStatus === "waiting" ? "Ringing..." : "Ready"}
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, PhoneOff } from "lucide-react";

const socket = io("http://localhost:5000");

export default function PatientVideoCall() {
  const navigate = useNavigate();
  const localVideo = useRef();
  const remoteVideo = useRef();
  const pc = useRef(null);
  const [callStatus, setCallStatus] = useState("idle"); // idle | waiting | inCall

  const location = useLocation();

  // ✅ FIXED: email-based identity
  const { doctorEmail, patientEmail: stateEmail } = location.state || {};
  const patientEmail = stateEmail || localStorage.getItem("patient_email");

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
      if (pc.current && answer) {
        await pc.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    socket.on("webrtc-ice-candidate", async ({ candidate }) => {
      if (pc.current && candidate) {
        await pc.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
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
    if (!doctorEmail || !patientEmail) {
      alert("Missing doctor or patient info. Please login again.");
      return;
    }

    setCallStatus("waiting");
    socket.emit("callRequest", { doctorEmail, patientEmail });
  }

  async function startWebRTC(doctorSocket) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localVideo.current.srcObject = stream;

    pc.current = new RTCPeerConnection();
    stream.getTracks().forEach((track) =>
      pc.current.addTrack(track, stream)
    );

    pc.current.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0];
    };

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-ice-candidate", {
          targetSocket: doctorSocket,
          candidate: event.candidate,
        });
      }
    };

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    socket.emit("webrtc-offer", { targetSocket: doctorSocket, offer });
  }

  function endCall(emit = true) {
    if (emit) {
      socket.emit("endCall", { patientEmail });
    }

    if (pc.current) pc.current.close();

    if (localVideo.current?.srcObject) {
      localVideo.current.srcObject
        .getTracks()
        .forEach((t) => t.stop());
    }

    if (remoteVideo.current) {
      remoteVideo.current.srcObject = null;
    }

    setCallStatus("idle");
    navigate("/dashboard");
  }

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden text-white">
      {/* Remote Video */}
      <video
        ref={remoteVideo}
        autoPlay
        playsInline
        className="absolute w-full h-full object-cover"
      />

      {/* Local Video */}
      <video
        ref={localVideo}
        autoPlay
        muted
        playsInline
        className="absolute bottom-6 right-6 w-44 h-32 rounded-lg border-2 border-white object-cover shadow-lg"
      />

      {/* Overlay */}
      {callStatus === "waiting" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
          <p className="text-xl font-semibold animate-pulse">
            Calling Doctor...
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="absolute bottom-10 flex gap-8">
        {callStatus === "idle" && (
          <button
            onClick={requestCall}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full text-lg font-semibold hover:bg-green-700 transition"
          >
            <Phone className="w-5 h-5" /> Start Call
          </button>
        )}

        {callStatus === "inCall" && (
          <button
            onClick={() => endCall(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-full text-lg font-semibold hover:bg-red-700 transition"
          >
            <PhoneOff className="w-5 h-5" /> End Call
          </button>
        )}
      </div>

      {/* Doctor Info */}
      <div className="absolute top-6 left-6 text-gray-200">
        <h2 className="text-lg font-semibold">
          Dr. {doctorEmail || "Unknown"}
        </h2>
        <p className="text-sm opacity-70">
          {callStatus === "inCall"
            ? "In Call"
            : callStatus === "waiting"
            ? "Ringing..."
            : "Ready"}
        </p>
      </div>
    </div>
  );
}
