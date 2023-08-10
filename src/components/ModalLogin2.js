import React, { useState } from "react";
import "../styles/ModalLogin.css";

const ModalLogin = ( {onClose} ) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
const [showModal, setShowModal] = useState(true);


const handleLogin = () => {
    if (username === "admin" && password === "iloveme") {
      setIsAuthenticated(true);
    //   setShowModal(false);
    }
  };



  return (
    <div className={`modal-overlay ${showModal ? "visible" : ""}`}>
      <div className="modal-content">
      <div>
      {!isAuthenticated ? (
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
      </div>
      ):(
        <div>
        <h2>Welcome, {username}!</h2>
        <button className="close-button" onClick={() => onClose()}>
  X
</button>

        {/* <button onClick={() => setShowModal(false)}>Close Modal</button> */}

        
      </div>
      )}
      </div>
    </div>
    </div>
  )};

export default ModalLogin;
