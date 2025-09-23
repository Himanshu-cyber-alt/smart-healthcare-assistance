

// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default function DoctorDashboard() {
//   const localVideo = useRef();
//   const remoteVideo = useRef();
//   const pc = useRef(null);
//   const [roomId, setRoomId] = useState("demoRoom");

//   const [incomingCall, setIncomingCall] = useState(false);

//   useEffect(() => {
//     socket.emit("joinRoom", { roomId });

//     socket.on("callRequest", () => setIncomingCall(true));

//     socket.on("signal", async ({ data }) => {
//       if (data.type === "offer") {
//         await handleOffer(data);
//       } else if (data.candidate) {
//         await pc.current?.addIceCandidate(new RTCIceCandidate(data));
//       }
//     });

//     return () => {
//       socket.off("callRequest");
//       socket.off("signal");
//     };
//   }, [roomId]);

//   async function handleOffer(offer) {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localVideo.current.srcObject = stream;

//     pc.current = new RTCPeerConnection();
//     stream.getTracks().forEach(track => pc.current.addTrack(track, stream));

//     pc.current.ontrack = (event) => {
//       remoteVideo.current.srcObject = event.streams[0];
//     };

//     pc.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("signal", { roomId, data: event.candidate });
//       }
//     };

//     await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await pc.current.createAnswer();
//     await pc.current.setLocalDescription(answer);
//     socket.emit("signal", { roomId, data: answer });
//   }

//   function acceptCall() {
//     socket.emit("callResponse", { roomId, accepted: true });
//     setIncomingCall(false);
//   }




//   function declineCall() {
//     socket.emit("callResponse", { roomId, accepted: false });
//     setIncomingCall(false);
//   }

//   function endCall() {
//     if (pc.current) {
//       pc.current.close();
//       pc.current = null;
//     }
//     if (localVideo.current?.srcObject) {
//       localVideo.current.srcObject.getTracks().forEach(track => track.stop());
//       localVideo.current.srcObject = null;
//     }
//     if (remoteVideo.current) remoteVideo.current.srcObject = null;

//     socket.emit("callEnded", { roomId });
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] p-6 text-white font-sans">
//       <h2 className="text-3xl font-bold mb-4">Doctor</h2>

//       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//         <input
//           className="p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//           placeholder="Enter room ID"
//         />
//         <button
//           onClick={endCall}
//           className="px-6 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 transition transform hover:scale-105"
//         >
//           End Call
//         </button>
//       </div>

//       {incomingCall && (
//         <div className="fixed top-20 bg-black/70 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center gap-4 z-50">
//           <p className="text-lg font-semibold">Incoming call from Patient</p>
//           <div className="flex gap-4">
//             <button
//               onClick={acceptCall}
//               className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
//             >
//               Accept
//             </button>
//             <button
//               onClick={declineCall}
//               className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       )}

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


import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from 'axios'

const socket = io("http://localhost:5000");

export default function DoctorDashboard() {

// Use sessionStorage per tab
const doctor = sessionStorage.getItem("email");

console.log("Logged-in doctor for this tab:", doctor);

let doctorEmail = doctor;



  console.log(doctorEmail)





 

  const localVideo = useRef();
  const remoteVideo = useRef();
  const pc = useRef(null);
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    socket.emit("registerDoctor", { email: doctorEmail });

    socket.on("incomingCall", ({ patientMobile, patientSocket }) => {
      setIncomingCall({ patientMobile, patientSocket });
    });

    socket.on("webrtc-offer", async ({ offer, fromSocket }) => {
      if (!pc.current) await startWebRTC(fromSocket, false);
      await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);
      socket.emit("webrtc-answer", { targetSocket: fromSocket, answer });
    });

    socket.on("webrtc-ice-candidate", ({ candidate }) => {
      if (pc.current) pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("callEnded", () => endCall(false));

    return () => {
      socket.off("incomingCall");
      socket.off("webrtc-offer");
      socket.off("webrtc-ice-candidate");
      socket.off("callEnded");
    };
  }, []);

  async function startWebRTC(targetSocket, isInitiator = true) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.current.srcObject = stream;

    pc.current = new RTCPeerConnection();
    stream.getTracks().forEach(track => pc.current.addTrack(track, stream));

    pc.current.ontrack = e => (remoteVideo.current.srcObject = e.streams[0]);
    pc.current.onicecandidate = e => {
      if (e.candidate) socket.emit("webrtc-ice-candidate", { targetSocket, candidate: e.candidate });
    };

    if (isInitiator) {
      const offer = await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);
      socket.emit("webrtc-offer", { targetSocket, offer });
    }
  }

  function acceptCall() {
    socket.emit("callResponse", { patientSocket: incomingCall.patientSocket, accepted: true });
    startWebRTC(incomingCall.patientSocket);
    setIncomingCall(null);
  }

  function declineCall() {
    socket.emit("callResponse", { patientSocket: incomingCall.patientSocket, accepted: false });
    setIncomingCall(null);
  }

  function endCall(emit = true) {
    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }
    if (localVideo.current?.srcObject) localVideo.current.srcObject.getTracks().forEach(t => t.stop());
    if (remoteVideo.current) remoteVideo.current.srcObject = null;

    if (emit && incomingCall) socket.emit("callEnded", { targetSocket: incomingCall.patientSocket });
    setIncomingCall(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">Doctor ({doctorEmail})</h2>

      {incomingCall && (
        <div className="bg-gray-800 p-4 rounded mb-4">
          <p>Incoming call from patient: {incomingCall.patientMobile}</p>
          <button onClick={acceptCall} className="px-4 py-2 bg-green-600 rounded mr-2">Accept</button>
          <button onClick={declineCall} className="px-4 py-2 bg-red-600 rounded">Decline</button>
        </div>
      )}

      <div className="flex gap-4">
        <video ref={localVideo} autoPlay muted className="w-80 h-60 bg-black" />
        <video ref={remoteVideo} autoPlay className="w-80 h-60 bg-black" />
      </div>
      <button onClick={() => endCall(true)} className="mt-4 px-6 py-2 bg-red-600 rounded">End Call</button>
    </div>
  );
}
