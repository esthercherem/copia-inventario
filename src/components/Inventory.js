import React, { useState } from 'react';
import axios from 'axios'; // Importa axios para hacer la solicitud POST al servidor

function Inventory() {
  const [itemType, setItemType] = useState('');
  const [company, setCompany] = useState('');
  const [cost, setCost] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [code, setCode] = useState('');
  const [goldType, setGoldType] = useState('');
  const [placeOfPurchase, setPlaceOfPurchase] = useState('');
  const [specifications, setSpecifications] = useState('');

  const handleCompanyChange = (e) => {
    const selectedCompany = e.target.value;
    setCompany(selectedCompany);
    updateCode(selectedCompany, cost);
  };

  const handleCostChange = (e) => {
    const costValue = e.target.value;
    setCost(costValue);

    // Calculamos el precio multiplicando el costo por 2
    const calculatedPriceValue = costValue * 2;
    setCalculatedPrice(calculatedPriceValue);

    // Actualizamos el código en base a la compañía y el costo
    updateCode(company, costValue);
  };

  const updateCode = (selectedCompany, selectedCost) => {
    let generatedCode = '';
    if (selectedCompany === 'Param') {
      generatedCode = `34${selectedCost * 2}-P`;
    } else if (selectedCompany === 'Dina') {
      generatedCode = `63${selectedCost * 2}-D`;
    } else if (selectedCompany === 'Kine') {
      generatedCode = `28${selectedCost * 2}-K`;
    } else if (selectedCompany === 'Bat') {
      generatedCode = `97${selectedCost * 2}-B`;
    }
    setCode(generatedCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const newItemData = {
      tipo_articulo: itemType,
      codigo: code,
      tipo_oro: goldType,
      compañia: company,
      costo: cost,
      precio_calculado: calculatedPrice,
      fecha_compra: purchaseDate,
      lugar_compra: placeOfPurchase,
      especificaciones: specifications,
    
    };

    try {
      // Enviar los datos al servidor utilizando axios
      const response = await axios.post('https://serverinventario.onrender.com/add-item', newItemData);

      // Manejar la respuesta del servidor, puedes hacer lo que necesites aquí
      console.log('Artículo agregado:', response.data);
      alert('Artículo agregado:', response.data);

      //  limpiar los campos del formulario si lo deseas
      setItemType('');
      setCompany('');
      setCost('');
      setCalculatedPrice('');
      setPurchaseDate('');
      setCode('');
      setGoldType('');
      setPlaceOfPurchase('');
      setSpecifications('');

    } catch (error) {
      console.error('Error al agregar un artículo:', error);
    alert('Error al agregar un artículo:', error);
      // Manejar errores aquí
    }
  };

  return (
    <div className="container">
      <h1>Agrega los datos de tu artículo :</h1>
     
      <form className="row g-3" onSubmit={handleSubmit}>
     <div className="col-md-4">
          <label htmlFor="itemType" className="form-label">Tipo de artículo  </label>
          <select id="inputState" className="form-select"
            
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="Collar">Collar</option>
            <option value="Pulsera">Pulsera</option>
            <option value="Aretes">Aretes</option>
          </select>
          </div>
        <div className="col-md-6">
          <label htmlFor="company" className="form-label">Compañía  </label>
          <select className="form-select"
            id="company"
            value={company}
            onChange={handleCompanyChange}
            required
          >
            <option value="">Seleccione una compañía</option>
            <option value="Param">Param</option>
            <option value="Dina">Dina</option>
            <option value="Kine">Kine</option>
            <option value="Bat">Bat</option>
          </select>
        </div>
        <div  className="col-md-2">
          <label htmlFor="cost" className="form-label">Costo  $</label>
          <input className="form-control"
            type="number"
            id="cost"
            value={cost}
            onChange={handleCostChange}
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="calculatedPrice">Precio  $</label>
          <input className="form-control"
            type="number"
            id="calculatedPrice"
            value={calculatedPrice}
            onChange={(e) => setCalculatedPrice(e.target.value)}
            required
          />
        </div>
        <div  className="col-6">
          <label htmlFor="purchaseDate" className="form-label">Fecha de Compra  </label>
          <input className="form-control"
            type="date"
            id="purchaseDate"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
        </div> 
         <div className="col-md-4">
          <label htmlFor="code" className="form-label">Código  </label>
          <input className="form-control"
            type="text"
            id="code"
            value={code}
            readOnly // El código se autorellena, por lo que es de solo lectura
            required
          />
        </div>
       
      
        <div className="col-md-6">
          <label htmlFor="goldType" className="form-label">Tipo de Oro  </label>
          <select className="form-control"
            id="goldType"
            value={goldType}
            onChange={(e) => setGoldType(e.target.value)}
            required
          >
            <option value="">Seleccione el tipo de oro</option>
            <option value="14K">14K</option>
            <option value="18K">18K</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="placeOfPurchase" className="form-label">Lugar de compra  </label>
          <select className="form-control"
            id="placeOfPurchase"
            value={placeOfPurchase}
            onChange={(e) => setPlaceOfPurchase(e.target.value)}
            required
          >
            <option value="">Seleccione un lugar de compra</option>
            <option value="NY">NY</option>
            <option value="LA">LA</option>
            <option value="MIA">MIA</option>
          </select>
        </div> 
        <div className="col-md-6">
  <label htmlFor="specifications" className="form-label">Especificaciones  </label>
  <textarea  className="form-control"
    id="specifications"
    value={specifications}
    onChange={(e) => setSpecifications(e.target.value)}
    rows="4"
    required
  ></textarea>
          </div>
        <div className="d-grid gap-2 col-12 mx-auto">
        <button type="submit"className="btn btn-dark" style={{ alignItems: 'center' }} >Agregar Artículo</button>
        </div>
      </form>
      </div>
     
    );
  
};

export default Inventory;
