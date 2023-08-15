import React from 'react';
import '../styles/Sidebar.css'


const Sidebar = ({ summary }) => {
  return (
    <nav className="sticky-top">
      <table className="summary-table">
        <thead>
          <tr>
            <th>Cantidad de productos</th>
            <th>Costo total</th>
            <th>Productos de cada compañía</th>
            <th>Tipo de artículo</th>
            <th>Lugar de compra</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{summary.totalProducts}</td>
            <td>${summary.totalCost}</td>
            <td>
              <ul>
                <li>Param: {summary.companies.Param.count} (Costo total: ${summary.companies.Param.totalCost})</li>
                <li>Dina: {summary.companies.Dina.count} (Costo total: ${summary.companies.Dina.totalCost})</li>
                <li>Kine: {summary.companies.Kine.count} (Costo total: ${summary.companies.Kine.totalCost})</li>
                <li>Bat: {summary.companies.Bat.count} (Costo total: ${summary.companies.Bat.totalCost})</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Collar: {summary.types.Collar}</li>
                <li>Pulsera: {summary.types.Pulsera}</li>
                <li>Aretes: {summary.types.Aretes}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>MIA: {summary.places.MIA}</li>
                <li>NY: {summary.places.NY}</li>
                <li>LA: {summary.places.LA}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </nav>
  );
};

export default Sidebar;
