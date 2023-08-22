
import React, { useState } from 'react';
import '../styles/Shop.css'
import ModalVentas from './ModalVentas'




const Ventas = ({ soldItems, setSoldItems }) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);


  // modal

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  

  return (

    

    <div >
      <h1>Elementos Vendidos</h1>
      <div class="product-container">
        {soldItems.map((item) => (
          <div key={item.code}className="product-card">
          
            <h3>Tipo de item: {item.type}</h3>
            <p>Código: {item.code}</p>
            <p>Tipo de Oro: {item.goldType}</p>
            <p>Compañía: {item.company}</p>
            <p>Costo: {item.cost}</p>
            <p>Precio: {item.price}</p>
            <p>Fecha de Compra: {item.purchaseDate}</p>
            <p>Lugar de Compra: {item.placeOfPurchase}</p>
            <p>Especificaciones: {item.specifications}</p>
            <p>Cliente: {item.cliente} </p>
<p>Precio de Venta: {item.precioVenta} </p>
<p>Fecha de Venta: </p>
            

            <button class="btn btn-primary" onClick={() => handleOpenModal(item)}>Ver Detalles</button>
            {isModalOpen && selectedItem && (
  <ModalVentas item={selectedItem} onClose={() => setIsModalOpen(false)} />)}
            
     

    
          </div>
        ))}
      </div>

    </div>   
  );
};

export default Ventas;


