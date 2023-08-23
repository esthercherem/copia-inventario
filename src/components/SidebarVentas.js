import React, { useState, useEffect } from 'react';
import "../styles/SidebarVentas.css"

const SidebarVentas = ({ soldItems }) => {
  // Estado para almacenar la información del sidebar
  const [sidebarInfo, setSidebarInfo] = useState({
    totalItems: 0,
    totalCost: 0,
    totalSalePrice: 0,
    itemCountsByType: {},
    companyCounts: {},
  });

  // Función para calcular la información del sidebar
  const calculateSidebarInfo = () => {
    const itemCountsByType = {};
    const companyCounts = {};
    let totalCost = 0;
    let totalSalePrice = 0;

    // Calcular la cantidad de cada tipo de artículo y la cantidad de artículos por compañía
    soldItems.forEach((item) => {
      // Contar la cantidad de cada tipo de artículo
      itemCountsByType[item.type] = (itemCountsByType[item.type] || 0) + 1;

      // Contar la cantidad de artículos por compañía
      companyCounts[item.company] = (companyCounts[item.company] || 0) + 1;

      // Calcular la suma de costos y la suma de precios de venta
      totalCost += parseFloat(item.cost);
      totalSalePrice += parseFloat(item.precioVenta);
    });

    // Calcular el número total de elementos vendidos
    const totalItems = soldItems.length;

    // Actualizar el estado del sidebar con la información calculada
    setSidebarInfo({
      totalItems,
      totalCost,
      totalSalePrice,
      itemCountsByType,
      companyCounts,
    });
  };

  // Utilizar useEffect para calcular el sidebarInfo cada vez que se actualiza soldItems
  useEffect(() => {
    calculateSidebarInfo();
  }, [soldItems]);

  // Renderizar el contenido del sidebar
  return (
    <div className="sidebar-ventas">
        <div className="summary-content">
      <h2>Análisis de Datos:</h2>
      <p>Total de Artículos Vendidos: {sidebarInfo.totalItems}</p>
      <p>Total de Costo: ${sidebarInfo.totalCost.toFixed(2)}</p>
      <p>Total de Precio de Venta: ${sidebarInfo.totalSalePrice.toFixed(2)}</p>

      <p>Cantidad de cada tipo de artículo:</p>
      <ul>
        {Object.entries(sidebarInfo.itemCountsByType).map(([type, count]) => (
          <li key={type}>
            {type}: {count}
          </li>
        ))}
      </ul>

      <p>Cantidad de artículos por compañía:</p>
      <ul>
        {Object.entries(sidebarInfo.companyCounts).map(([company, count]) => (
          <li key={company}>
            {company}: {count}
          </li>
        ))}
      </ul>
    </div></div>
  );
};

export default SidebarVentas;
