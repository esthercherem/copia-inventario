
import React, { useState } from 'react';
import '../styles/Shop.css'
import Modal from './Modal'
import Sidebar from './Sidebar';



const Ventas = ({ soldItems, setSoldItems, items }) => {
    const [searchText, setSearchText] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
    const [inputValue, setInputValue] = useState('');
    const [clientInfo, setClientInfo] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [saleInfo, setSaleInfo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState("");
  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    const handleSalePriceChange = (event) => {
        setSalePrice(event.target.value);
      };
    
    const handleKeyPress = (event, item) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            const updatedItem = {
                ...item,
                cliente: inputValue,
                vendido: true,
              };
        
             setClientInfo(`cliente: ${inputValue}`);
      setInputValue('');
      setSaleInfo(`Precio de Venta: ${salePrice}`);
      setSoldItems((prevSoldItems) => [...prevSoldItems, updatedItem]);
            }
          };
    

      const handleSalePriceKeyPress = (event, item) => {
        if (event.key === 'Enter' && salePrice.trim() !== '') {

             const updatedItem = {
        ...item,
        precioVenta: salePrice,
        vendido: true,
      };

      setClientInfo(`cliente: ${inputValue}`);
      setInputValue('');
      setSaleInfo(`Precio de Venta: ${salePrice}`);
      setSoldItems((prevSoldItems) => [...prevSoldItems, updatedItem]);
    }
  };

  // modal

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // resumen de ventas y search

  const handleTextSearch = () => {
    const sanitizedSearchText = searchText
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúüñ\s]/g, ''); // Eliminar caracteres especiales

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
    const totalCost = filteredItems.reduce(
      (acc, item) => acc + parseFloat(item.cost),
      0
    );
    return totalCost.toFixed(2);
  };

  const getCompanyCounts = (company) => {
    const companyCount = filteredItems.filter(
      (item) => item.company === company
    ).length;
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
    const placeCount = filteredItems.filter(
      (item) => item.placeOfPurchase === place
    ).length;
    return placeCount;
  };

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


  return (

    <div><div class="sticky-top">
         <nav class="hstack gap-3" >
            
      
      <div class="p-2">
        {/* Buscador de texto */}
        <input class="p-2"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar en toda la tienda..."
        />
        <button class="btn btn-dark" onClick={handleTextSearch}>Buscar Texto</button>
      </div>
      <div >
        {/* Buscador de rango de precios */}
        <input class="p-2 ms-auto"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Precio mínimo"
        />
        <input class="p-2"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Precio máximo"
        />
        <button class="btn btn-dark" onClick={handlePriceSearch}>Buscar por Precio</button>
      </div>
      <button class="btn btn-dark" onClick={handleClearSearch}>Limpiar</button>
   
      </nav>
   </div>
      <div className="content">
        <Sidebar summary={summary} />
        </div>


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

            <button class="btn btn-primary" onClick={() => handleOpenModal(item)}>Ver Detalles</button>
            {isModalOpen && selectedItem && (
  <Modal item={selectedItem} onClose={() => setIsModalOpen(false)} />)}
            
      {clientInfo && <p>{clientInfo}</p>}
      {!clientInfo && (
        <div>
          <label htmlFor="clientInput">Cliente:</label>
          <input
            type="text"
            id="clientInput"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
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
          onChange={handleSalePriceChange}
          onKeyPress={handleSalePriceKeyPress}
        />
      </div>
      
      )}

    
          </div>
        ))}
      </div>
    </div>   </div>
  );
};

export default Ventas;