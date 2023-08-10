import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Inventory from './components/Inventory';
import Shop from './components/Shop';
import Ventas from './components/Ventas'; 
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  const handleSell = (item) => {
    // Agregar el artículo a la lista de artículos vendidos
    setSoldItems((prevSoldItems) => [...prevSoldItems, item]);

    // Eliminar el artículo del inventario
    const updatedItems = items.filter((i) => i.code !== item.code);
    setItems(updatedItems);
  };

  // Función para agregar un nuevo elemento al inventario
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  // Función para eliminar un elemento del inventario
  // const handleDeleteItem = (code) => {
  //   setItems(items.filter(item => item.code !== code));
  // };

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/inventory"
              element={<Inventory onAddItem={handleAddItem} />}
            />
             <Route
              path="/shop"
              element={<Shop items={items} onSellItem={handleSell} />}  />
            {/* <Route path="/shop" 
            element={<Shop items={items}  onAddItem={handleAddItem} />} /> */}
              <Route
    path="/ventas"
    element={<Ventas soldItems={soldItems} setSoldItems={setSoldItems}  />}  />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;