DROP DATABASE IF EXISTS db_bible;
CREATE DATABASE db_bible;
USE db_bible;

/******************************************************************************************************/
CREATE TABLE items (
    code INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(14,6) NOT NULL,
    CONSTRAINT PK_ITEMS PRIMARY KEY (code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE languages (
    code INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_LANGUAGES PRIMARY KEY (code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE service_type (
    code INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_SERVICE_TYPE PRIMARY KEY (code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE identity_document_type (
    code TINYINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_IDENTITY_DOCUMENT_TYPE PRIMARY KEY (code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE file_state (
    code INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_FILE_STATE PRIMARY KEY (code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE file (
    code INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    file_state_code INT NOT NULL,
    CONSTRAINT PK_FILE PRIMARY KEY (code),
    CONSTRAINT FK_FILE_STATE_CODE FOREIGN KEY (file_state_code) REFERENCES file_state(code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE client (
    code INT NOT NULL AUTO_INCREMENT,
    identity_document_type_code TINYINT NOT NULL,
    id_number VARCHAR(15) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_CLIENT PRIMARY KEY (code),
    CONSTRAINT FK_IDENTITY_DOCUMENT_TYPE_CODE_CLIENT FOREIGN KEY (identity_document_type_code) REFERENCES identity_document_type(code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE provider (
    code INT NOT NULL AUTO_INCREMENT,
    identity_document_type_code TINYINT NOT NULL,
    id_number VARCHAR(15) NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_PROVIDER PRIMARY KEY (code),
    CONSTRAINT FK_IDENTITY_DOCUMENT_TYPE_CODE_PROVIDER FOREIGN KEY (identity_document_type_code) REFERENCES identity_document_type(code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE service (
    code INT NOT NULL AUTO_INCREMENT,
    service_type_code INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    service_code_dependency INT NOT NULL,
    CONSTRAINT PK_SERVICE PRIMARY KEY (code),
    CONSTRAINT FK_SERVICE_TYPE_CODE FOREIGN KEY (service_type_code) REFERENCES service_type(code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE tariff (
    code INT NOT NULL AUTO_INCREMENT,
    service_code INT NOT NULL,
    provider_code INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_PACKAGE PRIMARY KEY (code),
    CONSTRAINT FK_CLIENT_CODE_TARIFF FOREIGN KEY (service_code) REFERENCES service(code),
    CONSTRAINT FK_PROVIDER_CODE FOREIGN KEY (provider_code) REFERENCES provider(code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE package (
    code INT NOT NULL AUTO_INCREMENT,
    client_code INT NOT NULL,
    languages_code INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_PACKAGE PRIMARY KEY (code),
    CONSTRAINT FK_CLIENT_CODE_PACKAGE FOREIGN KEY (client_code) REFERENCES client(code),
    CONSTRAINT FK_LANGUAGES_CODE FOREIGN KEY (languages_code) REFERENCES languages(code)
) engine=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE package_detail (
    code INT NOT NULL AUTO_INCREMENT,
    package_code INT NOT NULL,
    service_code INT NOT NULL,
    price DECIMAL(14,6) NOT NULL,
    CONSTRAINT PK_PACKAGE_DETAIL PRIMARY KEY (code),
    CONSTRAINT FK_PACKAGE_CODE FOREIGN KEY (package_code) REFERENCES package(code),
    CONSTRAINT FK_SERVICE_CODE FOREIGN KEY (service_code) REFERENCES service(code)
) engine=InnoDB;
/******************************************************************************************************/