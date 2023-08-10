import React from 'react';
import Login from './Login'


const Welcome = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">¡Bienvenido a la Gestión de Inventario!</h1>
      <p className="lead">
        Esta es una herramienta para ayudarte a administrar tu inventario de manera eficiente.
      </p>
      <Login></Login>
    </div>
  );
};

export default Welcome;