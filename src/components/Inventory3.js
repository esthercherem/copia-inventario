// En src/components/Inventory.js
import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import { Link } from 'react-router-dom';

//import { SERVER_URL } from "../config/config";
// import '../App.css';
// import '../styles/Inventory.css'

const Inventory = ({ onAddItem }) => {
    const [newItemData, setNewItemData] = useState({
      tipo_articulo: '',
      codigo: '',
      tipo_oro: '',
      compañia: '',
      costo: 0,
      precio_calculado: 0,
      fecha_compra: '',
      lugar_compra: '',
      especificaciones: '',
      costo_pesos: 0,
      precio_pesos: 0,
    });
  
    // Función para manejar cambios en los campos del nuevo elemento
    const handleNewItemChange = (e) => {
      const { name, value } = e.target;
      setNewItemData({
        ...newItemData,
        [name]: value,
      });
    };
  
    // Función para agregar un nuevo elemento al inventario
    const handleAddItem = async () => {
      try {
        // Realizar la solicitud POST al servidor
        const response = await fetch('/api/add-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItemData),
        });
  
        if (response.ok) {
          const newItem = await response.json();
          // Llamar a la función onAddItem con el nuevo elemento
          onAddItem(newItem);
          // Limpiar los datos del nuevo elemento después de agregarlo
          setNewItemData({
            tipo_articulo: '',
            codigo: '',
            tipo_oro: '',
            compañia: '',
            costo: 0,
            precio_calculado: 0,
            fecha_compra: '',
            lugar_compra: '',
            especificaciones: '',
            costo_pesos: 0,
            precio_pesos: 0,
          });
        } else {
          console.error('Error al agregar un artículo:', response.statusText);
          // Manejar el error de alguna manera, como mostrar un mensaje al usuario
        }
      } catch (error) {
        console.error('Error al agregar un artículo:', error);
        // Manejar el error de alguna manera, como mostrar un mensaje al usuario
      }
    };

  return (
    <div class="col-12">
     <h1>Agrega los datos de tu artículo :</h1><br></br><br></br>
      {/* Agrega el componente AddItemForm aquí */}
      <AddItemForm onAddItem={onAddItem} /> <br></br>
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






