import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/Welcome.css'


const Welcome = () => {
    const [showModal, setShowModal] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        if (username === 'admin' && password === 'iloveme') {
            setLoggedIn(true);
            setShowModal(false);
        } else {
            alert('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="app">
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content rounded p-4">
                                <div className="modal-header">
                                    <h5 className="modal-title">LOG IN</h5>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        placeholder="Nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="form-control mb-3"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control mb-3"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" onClick={handleLogin}>
                                        Iniciar sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loggedIn && (
                <div className="welcome-message">
                    ¡Bienvenido administrador de I LOVE ME joyería!
                </div>
            )}
        </div>
    );
};

export default Welcome;