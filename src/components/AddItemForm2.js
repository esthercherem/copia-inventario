// En src/components/AddItemForm.js
import React, { useState } from 'react';
import axios from "axios";
// import '../styles/Inventory.css'

const AddItemForm = ({ onAddItem }) => {
    const [company, setCompany] = useState('');
    const [cost, setCost] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState('');
    const [code, setCode] = useState('');
    const [goldType, setGoldType] = useState(''); 
    const [itemType, setItemType] = useState(''); 
    const [placeOfPurchase, setPlaceOfPurchase] = useState(''); 
    const [items, setItems] = useState([]);
  

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



  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      company,
        cost,
        price: calculatedPrice,
        purchaseDate,
        specifications,
        code,
        goldType,
        type: itemType,
        placeOfPurchase,
    };
    onAddItem(newItem);
    // Aquí puedes enviar el newItem al servidor o realizar cualquier otra acción necesaria
    // Después de enviar los datos, puedes restablecer los valores de los estados para limpiar el formulario.
    setCompany('');
    setCost('');
    setPurchaseDate('');
    setSpecifications('');
    setCalculatedPrice('');
    setCode('');
    setGoldType('');
    setItemType('');
    setPlaceOfPurchase('');
  };

 //UPDATE PARA CONECTAR CON SERVIDOR
    // Función para agregar un nuevo elemento al inventario
  
    const handleAddItem = async () => {
        try {
          const newItem = {
            company,
            cost,
            price: calculatedPrice,
            purchaseDate,
            specifications,
            code,
            goldType,
            type: itemType,
            placeOfPurchase,
          };
      
          // Realiza una solicitud POST al servidor
          const response = await axios.post('/api/add-item', newItem);
      
          if (response.status === 200) {
            // El artículo se ha agregado con éxito en el servidor
            // Aquí puedes manejar la respuesta del servidor si es necesario
            console.log('Artículo agregado con éxito en el servidor:', response.data);
      
            // Llama a la función onAddItem para actualizar la lista de artículos en tu componente principal
            onAddItem(response.data);
      
            // Limpia los campos del formulario después de agregar el artículo
            setCompany('');
            setCost('');
            setPurchaseDate('');
            setSpecifications('');
            setCalculatedPrice('');
            setCode('');
            setGoldType('');
            setItemType('');
            setPlaceOfPurchase('');
          } else {
            // Maneja los errores de la solicitud, por ejemplo, mostrando un mensaje al usuario
            console.error('Error al agregar el artículo en el servidor:', response.statusText);
          }
        } catch (error) {
          // Maneja los errores de la solicitud, por ejemplo, mostrando un mensaje al usuario
          console.error('Error al agregar el artículo en el servidor:', error);
          alert('Error al agregar el artículo en el servidor: ' + error.message);
        }
      };

  return (
   
    <form class="row g-3" onSubmit={handleSubmit}>
     <div class="col-md-4">
          <label htmlFor="itemType" class="form-label">Tipo de artículo  </label>
          <select id="inputState" class="form-select"
            
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
        <div class="col-md-6">
          <label htmlFor="company" class="form-label">Compañía  </label>
          <select class="form-select"
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
        <div  class="col-md-2">
          <label htmlFor="cost" class="form-label">Costo  $</label>
          <input class="form-control"
            type="number"
            id="cost"
            value={cost}
            onChange={handleCostChange}
            required
          />
        </div>
        <div class="col-md-2">
          <label htmlFor="calculatedPrice">Precio  $</label>
          <input class="form-control"
            type="number"
            id="calculatedPrice"
            value={calculatedPrice}
            onChange={(e) => setCalculatedPrice(e.target.value)}
            required
          />
        </div>
        <div  class="col-6">
          <label htmlFor="purchaseDate" class="form-label">Fecha de Compra  </label>
          <input class="form-control"
            type="date"
            id="purchaseDate"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
        </div> 
         <div class="col-md-4">
          <label htmlFor="code" class="form-label">Código  </label>
          <input class="form-control"
            type="text"
            id="code"
            value={code}
            readOnly // El código se autorellena, por lo que es de solo lectura
            required
          />
        </div>
       
      
        <div class="col-md-6">
          <label htmlFor="goldType" class="form-label">Tipo de Oro  </label>
          <select class="form-control"
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
        <div class="col-md-6">
          <label htmlFor="placeOfPurchase" class="form-label">Lugar de compra  </label>
          <select class="form-control"
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
        <div class="col-md-6">
          <label htmlFor="specifications" class="form-label">Especificaciones  </label>
          <textarea  class="form-control"
            id="specifications"
            value={specifications}
            onChange={(e) => setSpecifications(e.target.value)}
            rows="4"
            required
          />
        </div> 
        <div class="col-12">
        <div class="d-grid gap-2 col-6 mx-auto">
        <button onClick={handleAddItem} type="submit" class="btn btn-dark">Agregar Artículo al Inventario</button>
   </div></div>
    </form>
    
  );
};

export default AddItemForm;
