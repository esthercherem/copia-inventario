import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Modal from './Modal';
import '../styles/Shop.css';
import axios from "axios";

const Shop = ({ items, onSellItem }) => {
  const [searchText, setSearchText] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [inputValue, setInputValue] = useState('');
  const [clientInfo, setClientInfo] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [saleInfo, setSaleInfo] = useState('');
  const [soldItems, setSoldItems] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [saleDate, setSaleDate] = useState('');
  const [inventoryItems, setInventoryItems] = useState([]);
  const [sentItems, setSentItems] = useState([]);
  const [soldItemsList, setSoldItemsList] = useState([]);

  const isItemSold = (item) => {
    return soldItemsList.some((soldItem) => soldItem.id === item.id);
  };

  const handleTextSearch = () => {
    const sanitizedSearchText = searchText.toLowerCase().replace(/[^a-z0-9áéíóúüñ\s]/g, '');

    const filtered = items.filter((item) => {
      for (const key in item) {
        if (item[key].toString().toLowerCase().includes(sanitizedSearchText)) {
          return true;
        }
      }
      return false;
    });

    setFilteredItems(filtered);
  };

  const handlePriceSearch = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    const filtered = items.filter((item) => {
      const itemPrice = parseFloat(item.price);
      return itemPrice >= min && itemPrice <= max;
    });

    setFilteredItems(filtered);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setMinPrice('');
    setMaxPrice('');
    setFilteredItems(items);
  };

  const getTotalCost = () => {
    const totalCost = filteredItems.reduce((acc, item) => acc + parseFloat(item.cost), 0);
    return totalCost.toFixed(2);
  };

  const getCompanyCounts = (company) => {
    const companyCount = filteredItems.filter((item) => item.company === company).length;
    return companyCount;
  };

  const getCompanyTotalCost = (company) => {
    const companyTotalCost = filteredItems
      .filter((item) => item.company === company)
      .reduce((acc, item) => acc + parseFloat(item.cost), 0);
    return companyTotalCost.toFixed(2);
  };

  const getTypeCounts = (type) => {
    const typeCount = filteredItems.filter((item) => item.type === type).length;
    return typeCount;
  };

  const getPlaceCounts = (place) => {
    const placeCount = filteredItems.filter((item) => item.placeOfPurchase === place).length;
    return placeCount;
  };

  // funcion get para recibir el objeto de la tabla existencias
   
  
  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get('https://serverinventario.onrender.com/inventory-items');
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Error al obtener elementos del inventario:', error);
      alert('Error al obtener elementos del inventario:', error);
    }
  };
  
  useEffect(() => {
    fetchInventoryItems();
  }, []);
  
  
  
  
  
  // // Función para hacer la solicitud GET al servidor
    // const fetchInventoryItems = async () => {
    //   try {
    //     const response = await axios.get('https://serverinventario.onrender.com/inventory-items'); // Reemplaza con la URL y el puerto correctos de tu servidor
    //     setInventoryItems(response.data);
    //   } catch (error) {
    //     console.error('Error al obtener elementos del inventario:', error);
    //     alert('Error al obtener elementos del inventario:', error);
    //   }
    // };
  
    // // Llamar a la función de solicitud cuando el componente se monte
    // useEffect(() => {
    //   fetchInventoryItems();
    // }, []); // El segundo argumento vacío [] asegura que esta solicitud se realice solo una vez cuando el componente se monte
  


  

  const calculateSummary = () => {
    return {
      totalProducts: filteredItems.length,
      totalCost: getTotalCost(),
      companies: {
        Param: { count: getCompanyCounts('Param'), totalCost: getCompanyTotalCost('Param') },
        Dina: { count: getCompanyCounts('Dina'), totalCost: getCompanyTotalCost('Dina') },
        Kine: { count: getCompanyCounts('Kine'), totalCost: getCompanyTotalCost('Kine') },
        Bat: { count: getCompanyCounts('Bat'), totalCost: getCompanyTotalCost('Bat') },
      },
      types: {
        Collar: getTypeCounts('Collar'),
        Pulsera: getTypeCounts('Pulsera'),
        Aretes: getTypeCounts('Aretes'),
      },
      places: {
        MIA: getPlaceCounts('MIA'),
        NY: getPlaceCounts('NY'),
        LA: getPlaceCounts('LA'),
      },
    };
  };

  const summary = calculateSummary();

  // modal

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    fetchExchangeRate();
  };





  // Función para realizar la solicitud PUT y actualizar el estado a vendido
const handleUpdateState = async (item) => {
  try {
    // Realizar la solicitud PUT para actualizar el estado
    await axios.put(`https://serverinventario.onrender.com/existencias/${item.id}`, {
      estado: 'Vendido',
      
    });
      // Agregar el artículo vendido al estado soldItems
      setSoldItemsList([...soldItemsList, item]);
     
    alert('Artículo marcado como vendido correctamente.');
  } catch (error) {
    console.error('Error al marcar como vendido:', error);
    alert('Error al marcar como vendido:', error);
  }
};

// funcion para eliminar articulo de la base de datos:
const handleDeleteItem = async (itemId) => {
  try {
    // Realiza una solicitud DELETE al servidor para eliminar el artículo
    await axios.delete(`https://serverinventario.onrender.com/existencias/${itemId}`);
    
    // Actualiza la lista de elementos eliminando el artículo
    const updatedItems = filteredItems.filter((item) => item.id !== itemId);
    setFilteredItems(updatedItems);
  } catch (error) {
    console.error('Error al eliminar el artículo:', error);
    alert('Error al eliminar el artículo:', error);
  }
};






// // Función para enviar el artículo a la tabla de ventas

const handleSend = async (item) => {
  try {
    // Crea un objeto con los datos a enviar a la tabla de ventas
    const saleData = {
      ...item, // Utiliza todos los datos del artículo actual
      
      cliente: inputValue, // Agrega el cliente desde el estado
      precioVenta: salePrice, // Agrega el precio de venta desde el estado
      fechaVenta: saleDate, // Agrega la fecha de venta desde el estado
    };

    // Realiza una solicitud POST al servidor para agregar el artículo a la tabla de ventas
    const response = await axios.post('https://serverinventario.onrender.com/endpoint_de_ventas', saleData);

    // Maneja la respuesta del servidor, puedes hacer lo que necesites aquí
    console.log('Artículo enviado:', response.data);
    alert('Artículo enviado:', response.data);


    // Agrega el artículo enviado a la lista de sentItems
    setSentItems([...sentItems, item]);

    // Actualiza los elementos filtrados para excluir el artículo enviado
    const updatedFilteredItems = filteredItems.filter((filteredItem) => filteredItem.id !== item.id);
    setFilteredItems(updatedFilteredItems);

    // Limpia los campos del formulario si lo deseas
    setInputValue('');
    setSalePrice('');
    setSaleDate('');

    // Obtiene el ID del artículo actual
    //const itemId = item.id;

  
     // Después de enviar el artículo, agrega el artículo a la lista de sentItems
    // setSentItems([...sentItems, item]);

  } catch (error) {
    console.error('Error al enviar el artículo:', error);
    alert('Error al enviar el artículo:', error);
    // Maneja errores aquí
  }
};


  
  

  // API CONVERTIR DLS A PESOS

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch('https://v6.exchangerate-api.com/v6/349c9b42e2cecb69a2b799c1/latest/USD');
      const data = await response.json();
      setExchangeRate(data.conversion_rates['MXN']);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  return (
    <div>
      <div className="sticky-top">
        <nav className={`hstack gap-3 bg-light ${isModalOpen ? 'hide-nav' : ''}`}>
          <div className="p-2">
            <p>Filtra información de los artículos:</p>
            {/* Buscador de texto */}
            <input
              className="p-2"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar en toda la tienda..."
            />
            <button className="btn btn-dark" onClick={handleTextSearch} style={{ marginRight: '10px' , marginLeft: '10px'}}>Buscar Texto</button>
          </div>
          <div>
            <p> Busca artículos dentro del siguiente rango de precios:</p>
            {/* Buscador de rango de precios */}
            <input
              className="p-2 ms-auto"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Precio mínimo"
            />
            <input
              className="p-2"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Precio máximo"
              style={{ marginRight: '10px' , marginLeft: '10px'}}/>
            <button className="btn btn-dark" onClick={handlePriceSearch} style={{ marginRight: '10px' , marginLeft: '10px'}}>Buscar por Precio</button>
          </div>
         
          <button  className="btn btn-danger" onClick={handleClearSearch} style={{ marginRight: '10px' , marginLeft: '10px'}}>Reset el buscador</button>
        </nav>
        <nav className={`sidebar ${isModalOpen ? 'hide-nav' : ''}`}>
          
          <div className="content">
            <Sidebar summary={summary} />
          </div>
        </nav>
      </div>
      <div className="product-container">
      {inventoryItems.map((item) => {
  const isSent = sentItems.some((sentItem) => sentItem.id === item.id);
  const isSold = isItemSold(item);
  // Aplicar la clase CSS si el artículo está vendido
  const cardClassName = `product-card ${isSold ? 'sold-card' : ''}`;

  if (isSent) {
    return null;
  }
            return (

          <div className={cardClassName} key={item.id}>
            <div key={item.code} className="product">
              {/* <img src="..." class="card-img-top" alt="..."></img> */}
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
              <p>Costo en Pesos: {parseFloat(item.costo * exchangeRate).toFixed(2)}</p>
              <p>Precio en Pesos: {parseFloat(item.precio_calculado * exchangeRate).toFixed(2)}</p>
            

  
              
              {clientInfo && <p>{clientInfo}</p>}
              {!clientInfo && (
                <div>
                  <label htmlFor="clientInput">Cliente:</label>
                  <input
                    type="text"
                    id="clientInput"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}

                  />
                </div>
              )}
              {saleInfo && <p>{saleInfo}</p>}
              {!saleInfo && (
                <div>
                  <label htmlFor="salePriceInput">Precio de Venta:</label>
                  <input
                    type="text"
                    id="salePriceInput"
                    value={salePrice}
                    onChange={(event) => setSalePrice(event.target.value)}
    
                  />
                </div>
              )}
              <br></br>
              <label htmlFor="dateInput">Fecha de Venta:</label>
<input
  type="date"
  id="dateInput"
  value={saleDate}
  onChange={(event) => setSaleDate(event.target.value)}

/>
<div class="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-dark" onClick={() => handleOpenModal(item)}>Ver Detalles</button>
              {isModalOpen && selectedItem && (
                <Modal item={selectedItem} onClose={() => setIsModalOpen(false)} />
              )} <br></br>
<button className="btn btn-dark" onClick={() => {
  handleUpdateState(item);
  handleSend(item);
}}>Vendido y Enviar</button>

              <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
              {/* <button className="btn btn-dark" onClick={() => handleSend(item)}>Enviar</button> */}
</div>
</div>
      </div>
         );
      })}
   
      </div>
    </div>
  );
};

export default Shop;