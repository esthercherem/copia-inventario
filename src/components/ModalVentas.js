import React from 'react';
import '../styles/Modal.css';

const ModalVentas = ({ item, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {/* Mostrar los detalles del artículo */}
        <h3>Detalles del Artículo</h3>
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

      </div>
    </div>
  );
};

export default ModalVentas;