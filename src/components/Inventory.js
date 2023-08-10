// En src/components/Inventory.js
import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/Inventory.css'

const Inventory = ({ onAddItem }) => {
  const [items, setItems] = useState([]);

  // Función para agregar un nuevo elemento al inventario
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h1>Página de Inventario</h1>
      {/* Agrega el componente AddItemForm aquí */}
      <AddItemForm onAddItem={onAddItem} />
      <button type="submit" className="mb-3">
        
        <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>
          Submit
        </Link>
      </button>
    </div>
  );
};

export default Inventory;






