// En src/components/Inventory.js
import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import { Link } from 'react-router-dom';
// import '../App.css';
// import '../styles/Inventory.css'

const Inventory = ({ onAddItem }) => {
  const [items, setItems] = useState([]);

  // Función para agregar un nuevo elemento al inventario
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div class="col-12">
     <h1>Agrega los datos de tu artículo :</h1><br></br><br></br>
      {/* Agrega el componente AddItemForm aquí */}
      <AddItemForm onAddItem={onAddItem} /> <br></br>
      <div class="d-grid gap-2 col-6 mx-auto">
      <button type="submit" className="btn btn-dark" style={{ alignItems: 'center' }}>
        
        <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>
          Submit
        </Link>
      </button>
      </div>
    </div>
  );
};

export default Inventory;






