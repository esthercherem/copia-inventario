// En src/components/Inventory.js
import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import { Link } from 'react-router-dom';
import axios from "axios";
//import { SERVER_URL } from "../config/config";
// import '../App.css';
// import '../styles/Inventory.css'

const Inventory = ({ onAddItem }) => {
  const [items, setItems] = useState([]);

  //UPDATE PARA CONECTAR CON SERVIDOR
    // Función para agregar un nuevo elemento al inventario
    const handleAddItem = async (newItem) => {
        try {
          const response = await axios.post('https://serverinventario.onrender.com', newItem); // ADD SERVER RENDER LINK
          const addedItem = response.data;
          setItems([...items, addedItem]);
        } catch (error) {
          console.error('Error al agregar el artículo:', error);
        }
      };
  

  return (
    <div class="col-12">
     <h1>Agrega los datos de tu artículo :</h1><br></br><br></br>
      {/* Agrega el componente AddItemForm aquí */}
      <AddItemForm onAddItem={onAddItem} /> <br></br>
      <button onClick={handleAddItem} type="submit" class="btn btn-dark">Agregar Elemento</button>
      <div class="d-grid gap-2 col-6 mx-auto">
      <button type="submit" className="btn btn-dark" style={{ alignItems: 'center' }}>
        
        <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>
          Go to Shop
        </Link>
      </button>
      </div>
    </div>
  );
};

export default Inventory;


