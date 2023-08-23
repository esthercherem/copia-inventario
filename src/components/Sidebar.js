import React from 'react';
import '../styles/SidebarVentas.css'


const Sidebar = ({ summary }) => {
  return (
    <nav className="sidebar-ventas">
      <div className="summary-content">
      <h2>Análisis de Datos:</h2>
        <div>
          <div>
            <p>Cantidad de productos:{summary.totalProducts}</p>
            <p>Costo total: ${summary.totalCost}</p>
            <p>Productos de cada compañía:  <ul>
                <li>Param: {summary.companies.Param.count} (Costo total: ${summary.companies.Param.totalCost})</li>
                <li>Dina: {summary.companies.Dina.count} (Costo total: ${summary.companies.Dina.totalCost})</li>
                <li>Kine: {summary.companies.Kine.count} (Costo total: ${summary.companies.Kine.totalCost})</li>
                <li>Bat: {summary.companies.Bat.count} (Costo total: ${summary.companies.Bat.totalCost})</li>
              </ul></p>
            <p>Tipo de artículo:</p><ul>
                <li>Collar: {summary.types.Collar}</li>
                <li>Pulsera: {summary.types.Pulsera}</li>
                <li>Aretes: {summary.types.Aretes}</li>
              </ul>
            <p>Lugar de compra:<ul>
                <li>MIA: {summary.places.MIA}</li>
                <li>NY: {summary.places.NY}</li>
                <li>LA: {summary.places.LA}</li>
              </ul></p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
