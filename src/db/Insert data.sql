USE db_bible;

INSERT INTO language(name) VALUES ('Castellano'), ('Ingles');
INSERT INTO service_type(name) VALUES ('Transporte'), ('Guiado'), ('Hoteleria'), ('Restaurante');
INSERT INTO item(name, price) VALUES ('Boleto turistico valle sagrado', 0), 
('Boleto turistico valle sur', 0), 
('Boleto de tren', 0), 
('Entrada Machupicchu', 0);
INSERT INTO identity_document_type(name) VALUES ('Numero Documento de Indentidad'), 
('RUC'), 
('Carnet Extranjeria'), 
('Pasaporte'), 
('Otro');
INSERT INTO file_state(code, name) VALUES (1, 'Activo'), 
(2, 'Inactivo'), 
(3, 'Pendiente'), 
(4, 'Reservado'), 
(5, 'Cancelado');