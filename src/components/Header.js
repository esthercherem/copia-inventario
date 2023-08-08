import React from 'react';

const Header = ({ onAddButtonClick }) => {
  return (
    <header className="mb-4">
      <h2>Gestión de Inventario</h2>
      <button className="btn btn-primary" onClick={onAddButtonClick}>
        Agregar nuevo elemento
      </button>
    </header>
  );
};

export default Header;