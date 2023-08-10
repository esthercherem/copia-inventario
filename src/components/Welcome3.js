// App.js
import React, { useState } from 'react';
import LoginModal from './LoginModal';
import  '../styles/ModalLogin.css';


const Welcome = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="app" >
            <button onClick={toggleModal}>Iniciar sesión</button>
            {showModal && <LoginModal onClose={toggleModal} />}
        </div>
    );
};

export default Welcome;
