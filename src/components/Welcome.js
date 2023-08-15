import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';


const Welcome = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        toggleModal(); // Abre el modal automáticamente cuando se carga la página
    }, []); // Se pasa un arreglo vacío como segundo argumento para que se ejecute solo una vez al montar el componente

    return (
        <div className="app">
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