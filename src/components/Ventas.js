
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
        const response = await axios.get('https://serverinventario.onrender.com/sold-items'); // ADD SERVER RENDER LINK
        setSoldItems(response.data);
      } catch (error) {
        console.error('Error al obtener elementos vendidos:', error);
      }
    }

    fetchSoldItems();
  }, [setSoldItems]);

    //  // Función para hacer la solicitud GET al servidor
    //  const fetchSoldItems = async () => {
    //   try {
    //     const response = await axios.get('https://serverinventario.onrender.com/sold-items'); // Reemplaza con la URL y el puerto correctos de tu servidor
    //     setSoldItems(response.data);
    //     alert('se recibieron los artñiculos correctamente')
    //   } catch (error) {
    //     console.error('Error al obtener elementos de ventas', error);
    //     alert('Error al obtener elementos de ventas:', error);
    //   }
    // };
  
    // // Llamar a la función de solicitud cuando el componente se monte
    // useEffect(() => {
    //   fetchSoldItems();
    // }, []); // El segundo argumento vacío [] asegura que esta solicitud se realice solo una vez cuando el componente se monte
  

  // modal

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  

  return (

    <div className="ventas-container">
        <div class="sticky-top">
 <nav className={`hstack gap-3 bg-light ${isModalOpen ? 'hide-nav' : ''}`}>
          <div className="p-2">
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
<h4>Artículos Vendidos:</h4>
      <div class="product-container">
        
      {soldItems.map((item) => (
              <div className="product-card"  key={item.id}>
              <div key={item.code} className="product">
 
                <h5 className="card-title">Tipo de item: {item.tipo_articulo}</h5>
                <p>Código: {item.codigo}</p>
                <p>Tipo de Oro: {item.tipo_oro}</p>
                <p>Compañía: {item.compañia}</p>
                <p>Costo: {item.costo}</p>
                <p>Precio: {item.precio_calculado}</p>
                <p>Fecha de Compra: {item.fecha_compra}</p>
                <p>Lugar de Compra: {item.lugar_compra}</p>
                <p>Especificaciones: {item.especificaciones}</p>
                <p>Estado: {item.estado}</p>
            <p>Cliente: {item.cliente} </p>
            <p>Precio de Venta: {item.precio_venta} </p>
            <p>Fecha de Venta: {item.fecha_venta}</p>
            
            <div class="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-dark" onClick={() => handleOpenModal(item)}>
              Ver Detalles
            </button>
            {isModalOpen && selectedItem && (
              <ModalVentas item={selectedItem} onClose={() => setIsModalOpen(false)} />
            )}
          </div></div></div>
        ))}
        </div>
</div>
    </div>   
  );
};

export default Ventas;



