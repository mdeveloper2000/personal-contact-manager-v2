CREATE DATABASE phonebook;

USE phonebook;

CREATE TABLE contacts (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(35) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(50) NOT NULL,
    annotations VARCHAR(200),    
    PRIMARY KEY(id),
    UNIQUE(email)
);

CREATE TABLE photos (
    id INT NOT NULL AUTO_INCREMENT,    
    filename VARCHAR(100) NOT NULL,
    contact_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(contact_id) REFERENCES contacts(id)
);