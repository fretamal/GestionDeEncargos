INSERT INTO item_states (name) VALUES ('conforme'); 
INSERT INTO item_states (name) VALUES ('pendiente'); 
INSERT INTO item_states (name) VALUES ('pendiente entrega'); 
INSERT INTO item_states (name) VALUES ('con observaciones'); 

INSERT INTO user_type  	(name) values ('aprobador');
INSERT INTO user_type  	(name) values ('jefe de obra');
INSERT INTO user_type  	(name) values ('comprador');
INSERT INTO user_type  	(name) values ('chofer');


INSERT INTO company 	(name) values ('Compañia de prueba');
INSERT INTO company 	(name) values ('Compañia de prueba2');
INSERT INTO company 	(name) values ('Compañia de prueba3');
INSERT INTO company 	(name) values ('Compañia de prueba4');

INSERT INTO user (nombre,email,password) values ('Soy un aprobador','sebastian.pinto.g@usach.cl','1234');
INSERT INTO user (nombre,email,password) values ('Soy un jefe de obra','javier.pinto.g@usach.cl','1234');
INSERT INTO user (nombre,email,password) values ('Soy un chofer','Bsantana17@gmail.com','1234');
INSERT INTO user (nombre,email,password) values ('Soy un comprador','fernanda.retamal@usach.cl','1234');
INSERT INTO user (nombre,email,password) values ('Soy otro chofer','sebastian2.pinto.g@usach.cl','1234');
INSERT INTO user (nombre,email,password) values ('Soy otro jefe de obra','nicolas.roman@usach.cl','1234');

INSERT INTO user_has_usertype (user_id,user_type_id) values (1,1);
INSERT INTO user_has_usertype (user_id,user_type_id) values (2,2);
INSERT INTO user_has_usertype (user_id,user_type_id) values (3,4);
INSERT INTO user_has_usertype (user_id,user_type_id) values (4,3);
INSERT INTO user_has_usertype (user_id,user_type_id) values (5,4);
INSERT INTO user_has_usertype (user_id,user_type_id) values (6,2);

INSERT INTO building (address,company_id,user_id) values ('Direccion de obra1',1,1);
INSERT INTO building (address,company_id,user_id) values ('Direccion de obra2',1,1);




