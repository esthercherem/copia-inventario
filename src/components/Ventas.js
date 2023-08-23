
import React, { useState, useEffect } from 'react';
import '../styles/Shop.css'
import ModalVentas from './ModalVentas'
import SidebarVentas from './SidebarVentas'; 
import axios from 'axios';



const Ventas = ({ soldItems, setSoldItems }) => {

    const [searchText, setSearchText] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
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

  // Función para filtrar elementos basados en el rango de precios
  const handlePriceSearch = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    const filtered = soldItems.filter((item) => {
      const itemPrice = parseFloat(item.price);
      return itemPrice >= min && itemPrice <= max;
    });

    setFilteredItems(filtered);
  };

  // Función para limpiar los filtros
  const handleClearSearch = () => {
    setSearchText('');
    setMinPrice('');
    setMaxPrice('');
    setFilteredItems(soldItems);
  };

  // funciones del sidebar



  
  //UPDATE PARA CONECTAR CON SERVIDOR
  useEffect(() => {
    async function fetchSoldItems() {
      try {
        const response = await axios.get('https://serverinventario.onrender.com'); // ADD SERVER RENDER LINK
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

    

    <div >
          <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Buscar en ventas..."
      />
      <button className="btn btn-dark" onClick={handleTextSearch}>
        Buscar Texto
      </button>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Precio mínimo"
      />
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Precio máximo"
      />
      <button className="btn btn-dark" onClick={handlePriceSearch}>
        Buscar por Precio
      </button>
      <button className="btn btn-dark" onClick={handleClearSearch}>
        Limpiar
      </button><br></br>
      <h1>Elementos Vendidos</h1>



      <SidebarVentas soldItems={soldItems} />

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
  );
};

export default Ventas;


