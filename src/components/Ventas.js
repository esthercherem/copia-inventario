
import React, { useState, useEffect } from 'react';
import '../styles/Shop.css'
import ModalVentas from './ModalVentas'
import SidebarVentas from './SidebarVentas'; 
import axios from 'axios';



const Ventas = ({ soldItems, setSoldItems }) => {

    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState(soldItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

  // Función para filtrar elementos basados en la búsqueda de texto
  const handleTextSearch = () => {
    const sanitizedSearchText = searchText.toLowerCase().replace(/[^a-z0-9áéíóúüñ\s]/g, '');

    const filtered = soldItems.filter((item) => {
      for (const key in item) {
        if (item[key].toString().toLowerCase().includes(sanitizedSearchText)) {
          return true;
        }
      }
      return false;
    });

    setFilteredItems(filtered);
  };

  

  // Función para limpiar los filtros
  const handleClearSearch = () => {
    setSearchText('');
   
    setFilteredItems(soldItems);
  };

  // funciones del sidebar



  
  //UPDATE PARA CONECTAR CON SERVIDOR
  useEffect(() => {
    async function fetchSoldItems() {
      try {
        const response = await axios.get('https://serverinventario.onrender.com/api/sold-items'); // ADD SERVER RENDER LINK
        setSoldItems(response.data);
      } catch (error) {
        console.error('Error al obtener elementos vendidos:', error);
      }
    }

    fetchSoldItems();
  }, [setSoldItems]);

  // modal

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  

  return (

    <div className="ventas-container">
        <div class="sticky-top">
 <nav class={`hstack gap-3 bg-light ${isModalOpen ? 'hide-nav' : ''}`}>
          <div class="p-2">
    <div> <p>Filtra cualquier información de los artículos:</p>
          <input
    class="p-2"
    type="text"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
        placeholder="Buscar en ventas..."
      />
      <button className="btn btn-dark" onClick={handleTextSearch} style={{ marginRight: '10px' , marginLeft: '10px'}}>
        Buscar Texto
      </button>
     

     
      <button  className="btn btn-danger" onClick={handleClearSearch}>
       Reset el buscador
      </button> <div>
      </div>
</div> </div>
      </nav>
      

      <nav className={`sidebar ${isModalOpen ? 'hide-nav' : ''}`}>
      <div className="content">
      <SidebarVentas soldItems={soldItems} />
</div> </nav>
      <div class="product-container">
        
      {soldItems.map((item) => (
          <div key={item.code} className="product-card">
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

            <button className="btn btn-primary" onClick={() => handleOpenModal(item)}>
              Ver Detalles
            </button>
            {isModalOpen && selectedItem && (
              <ModalVentas item={selectedItem} onClose={() => setIsModalOpen(false)} />
            )}
          </div>
        ))}
        </div>
</div>
    </div>   
  );
};

export default Ventas;


