 import React, { useState } from "react";
  import ModalLogin from "./ModalLogin";
 

 const Login = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [userRegistered, setUserRegistered] = useState(false);
const [showModal, setShowModal] = useState(true);

   const handleRegister = () => {
     setUserRegistered(true);
   };

   const handleLogin = () => {
     if (username === "admin" && password === "iloveme") {
       setIsAuthenticated(true);
       setShowModal(false);
     }
   };

   const handleLogout = () => {
     setIsAuthenticated(false);
     setUsername("");
     setPassword("");
   };

   return (
    <div className={`Login ${isAuthenticated ? "blur-background" : ""}`}>
       <h1>User Authentication App</h1>
        {/* <ModalLogin isVisible={showModal} /> */}
        <ModalLogin onClose={() => setShowModal(false)} />

       {!isAuthenticated ? (
         <div>
           {!userRegistered ? (
             <div>
               <h2>Register</h2>
               <input
                 type="text"
                 placeholder="Username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
               />
               <input
                 type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
               <button onClick={handleRegister}>Register</button>
             </div>
           ) : (
             <div>
               <h2>Login</h2>
               <input
                 type="text"
                 placeholder="Username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
               />
               <input
                 type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
               <button onClick={handleLogin}>Login</button>
               <p>
                 Don't have an account?{" "}
                 <button onClick={() => setUserRegistered(false)}>Register here</button>
               </p>
             </div>
           )}
         </div>
       ) : (
         <div>
           <h2>Welcome, {username}!</h2>
           <button onClick={handleLogout}>Logout</button>
         </div>
       )}
     </div>
   );
 };

 export default Login;



