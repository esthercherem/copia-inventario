// En src/components/Inventory.js
import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import { Link } from 'react-router-dom';
import axios from "axios";

//import { SERVER_URL } from "../config/config";
// import '../App.css';
// import '../styles/Inventory.css'

const Inventory = () => {
    const [items, setItems] = useState([]);
  
      // Función para agregar un nuevo elemento al inventario
  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post('https://serverinventario.onrender.com/api/add-item', newItem);
      const addedItem = response.data;

      // Actualizamos el estado con el nuevo elemento
      setItems((prevItems) => [...prevItems, addedItem]);
    } catch (error) {
      console.error('Error al agregar el artículo:', error);
    }
  };

  return (
    <div class="col-12">
     <h1>Agrega los datos de tu artículo :</h1><br></br><br></br>
      {/* Agrega el componente AddItemForm aquí */}
      <AddItemForm onAddItem={handleAddItem}  /> <br></br>

      <div class="d-grid gap-2 col-6 mx-auto">
      <button type="submit" className="btn btn-dark" style={{ alignItems: 'center' }}>
        
        <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>
        Ir a Inventario Existente
        </Link>
      </button>
      </div>
    </div>
  );
};

export default Inventory;

