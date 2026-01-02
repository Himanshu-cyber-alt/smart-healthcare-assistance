

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Stethoscope, User, CalendarDays, Bot } from "lucide-react";

// const Navbar = () => {
//   const location = useLocation();

//   const navItems = [
//     { path: "/dashboard", label: "Dashboard", icon: Stethoscope },
//     { path: "/doctors", label: "Doctors", icon: User },
//     { path: "/assistant", label: "Ask AI", icon: Bot },
//     { path: "/profile", label: "Profile", icon: CalendarDays },
//      { path: "/myappointments", label: "MyAppointments", icon: Stethoscope },

//   ];

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg backdrop-blur-md"
//     >
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex justify-between items-center h-16">
//           {/* Brand / Logo */}
//           <div className="text-2xl font-bold tracking-tight flex items-center space-x-2">
//             <Stethoscope className="w-6 h-6 text-indigo-400" />
//             <span>Smart Healthcare</span>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex items-center space-x-8">
//             {navItems.map(({ path, label, icon: Icon }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                   location.pathname === path
//                     ? "bg-indigo-600 text-white shadow-md"
//                     : "text-gray-300 hover:text-white hover:bg-gray-800"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span>{label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;





import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, User, CalendarDays, Bot } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Stethoscope },
    { path: "/doctors", label: "Doctors", icon: User },
    { path: "/assistant", label: "Ask AI", icon: Bot },
    { path: "/profile", label: "Profile", icon: CalendarDays },
    { path: "/myappointments", label: "MyAppointments", icon: Stethoscope },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // 👇 CHANGED: "fixed" -> "sticky". Removed "left-0 right-0" as sticky naturally takes width.
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Brand / Logo */}
          <div className="text-2xl font-bold tracking-tight flex items-center space-x-2">
            <Stethoscope className="w-6 h-6 text-indigo-400" />
            <span>Smart Healthcare</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === path
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;