mi database es inventario

la tabla que cree se llama articulos

CREATE TABLE articulos (
    id serial PRIMARY KEY,
    tipo_articulo varchar(50) NOT NULL,
    compañia varchar(50) NOT NULL,
    costo numeric NOT NULL,
    precio_calculado numeric NOT NULL,
    fecha_compra date NOT NULL,
    especificaciones text NOT NULL,
    codigo varchar(20) NOT NULL,
    tipo_oro varchar(10) NOT NULL,
    lugar_compra varchar(20) NOT NULL
);

query para insertar a mi tabla:
INSERT INTO articulos (tipo_articulo, compañia, costo, precio_calculado, fecha_compra, especificaciones, codigo, tipo_oro, lugar_compra)
VALUES ('Collar', 'Param', 100, 150, '2023-08-10', 'Especificaciones del collar...', 'ABC123', '14K', 'NY');


query para ver mi tabla:

SELECT * FROM articulos;


query para ver un dato especifico en mi tabla:

SELECT * FROM articulos WHERE fecha_compra = '2023-08-10';



