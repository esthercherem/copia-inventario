
import React, { useState } from 'react';




const Ventas = ({ soldItems }) => {
    const [inputValue, setInputValue] = useState('');
    const [clientInfo, setClientInfo] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [saleInfo, setSaleInfo] = useState('');
  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    const handleSalePriceChange = (event) => {
        setSalePrice(event.target.value);
      };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
          setClientInfo(`Cliente: ${inputValue}`);
          setInputValue('');
        }
      };

      const handleSalePriceKeyPress = (event) => {
        if (event.key === 'Enter' && salePrice.trim() !== '') {

         setSaleInfo(`Precio de Venta: ${salePrice}`);
          setSalePrice('');
        }
      };
    



  return (
    <div>
      <h1>Elementos Vendidos</h1>
      <ul>
        {soldItems.map((item) => (
          <li key={item.code}className="product">
          
            <h3>Tipo de item: {item.type}</h3>
            <p>Código: {item.code}</p>
            <p>Tipo de Oro: {item.goldType}</p>
            <p>Compañía: {item.company}</p>
            <p>Costo: {item.cost}</p>
            <p>Precio: {item.price}</p>
            <p>Fecha de Compra: {item.purchaseDate}</p>
            <p>Lugar de Compra: {item.placeOfPurchase}</p>
            <p>Especificaciones: {item.specifications}</p>
            
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

    
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ventas;