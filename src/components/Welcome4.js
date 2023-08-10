
import React, { useState } from 'react';
import LoginModal from './LoginModal';
import '../styles/ModalLogin.css';

const Welcome = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
<div className="app">
            <button onClick={toggleModal}>Iniciar sesión</button>
            {showModal && (
                <div className="modal-overlay visible">
                    <div className="modal-content blur-background">
                        <LoginModal onClose={toggleModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;

