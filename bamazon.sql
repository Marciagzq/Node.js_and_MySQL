CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id 	INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
	price INTEGER(35),
    stock_quantity INTEGER(50)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Keyboard", "Electronics", "149.90", 1000),
("Mouse", "Electronics", "89.90", 1500),
("Monitor", "Electronics", "419.90", 500),
("Headset", "Electronics", "249.89", 1000),
("Pink blouse", "Clothing", "14.89", 2000),
("Leggings", "Clothing", "24.50", 1300),
("Ugh boots", "Clothing", "69.50", 1800),
("Stainless Steel Bottle", "Sports & Outdoor", "18.90", 800),
("Airbed", "Sports & Outdoor", "39.99", 700),
("Insect Repellent", "Sports & Outdoor", "8.99", 2000);

