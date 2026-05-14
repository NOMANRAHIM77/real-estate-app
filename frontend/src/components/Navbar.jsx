import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Navbar() {

return(
    <div>Navbar</div>
)



//   const [open, setOpen] = useState(false);
  // Trigger notification fetch if user is logged in


//   return (
//     <nav className="h-[100px] flex justify-between items-center px-4 md:px-8">
//       {/* LEFT SECTION */}
//       <div className="flex-[3] flex items-center gap-12">
//         <Link to="/" className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105">
//           <img src="/logo.png" alt="Logo" className="w-7" />
//           <span className="hidden sm:inline md:hidden lg:inline">LamaEstate</span>
//         </Link>
//         <div className="hidden sm:flex gap-10">
//           <Link to="/" className="transition-all hover:scale-105">Home</Link>
//           <Link to="/" className="transition-all hover:scale-105">About</Link>
//           <Link to="/" className="transition-all hover:scale-105">Contact</Link>
//           <Link to="/" className="transition-all hover:scale-105">Agents</Link>
//         </div>
//       </div>

//       {/* RIGHT SECTION */}
//       <div className="flex-[2] h-full flex items-center justify-end bg-[#fcf5f3] md:bg-transparent">
//         {currentUser ? (
//           <div className="flex items-center font-bold">
//             <img
//               src={currentUser.avatar || "/noavatar.jpg"}
//               alt="User"
//               className="w-10 h-10 rounded-full object-cover mr-5"
//             />
//             <span className="hidden sm:inline mr-5">{currentUser.username}</span>
//             <Link to="/profile" className="relative px-6 py-3 bg-[#fece51] cursor-pointer border-none flex items-center transition-all hover:scale-105">
//               {number > 0 && (
//                 <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
//                   {number}
//                 </div>
//               )}
//               <span>Profile</span>
//             </Link>
//           </div>
//         ) : (
//           <div className="hidden sm:flex items-center">
//             <Link to="/login" className="px-6 py-3 m-5 transition-all hover:scale-105">Sign in</Link>
//             <Link to="/register" className="px-6 py-3 m-5 bg-[#fece51] transition-all hover:scale-105">
//               Sign up
//             </Link>
//           </div>
//         )}

//         {/* MOBILE MENU ICON */}
//         <div className="sm:hidden z-[999] ml-4">
//           <img
//             src="/menu.png"
//             alt="Menu"
//             className="w-9 h-9 cursor-pointer"
//             onClick={() => setOpen((prev) => !prev)}
//           />
//         </div>

//         {/* MOBILE MENU OVERLAY */}
//         <div
//           className={`fixed top-0 transition-all duration-700 ease-in-out bg-black text-white h-screen w-1/2 flex flex-col items-center justify-center text-2xl gap-8 sm:hidden ${
//             open ? "right-0" : "-right-1/2"
//           }`}
//         >
//           <Link to="/" onClick={() => setOpen(false)}>Home</Link>
//           <Link to="/" onClick={() => setOpen(false)}>About</Link>
//           <Link to="/" onClick={() => setOpen(false)}>Contact</Link>
//           <Link to="/" onClick={() => setOpen(false)}>Agents</Link>
//           {!currentUser && (
//             <>
//               <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
//               <Link to="/register" onClick={() => setOpen(false)}>Sign up</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
}

export default Navbar;