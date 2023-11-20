DROP DATABASE IF EXISTS db_bible;
CREATE DATABASE db_bible;
USE db_bible;

/******************************************************************************************************/
CREATE TABLE item (
    code INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(14,6) NOT NULL,
    CONSTRAINT PK_ITEMS PRIMARY KEY (code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE language (
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
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE identity_document_type (
    code TINYINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_IDENTITY_DOCUMENT_TYPE PRIMARY KEY (code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE file_state (
    code INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_FILE_STATE PRIMARY KEY (code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE client (
    code INT NOT NULL AUTO_INCREMENT,
    identity_document_type_code TINYINT NOT NULL,
    id_number VARCHAR(15) NOT NULL,
    name VARCHAR(200) NOT NULL,
    CONSTRAINT PK_CLIENT PRIMARY KEY (code),
    CONSTRAINT FK_IDENTITY_DOCUMENT_TYPE_CODE_CLIENT FOREIGN KEY (identity_document_type_code) REFERENCES identity_document_type(code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE file (
    code INT NOT NULL AUTO_INCREMENT,
    language_code INT NOT NULL,
    client_code INT NOT NULL,
    client_endorse_code INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    in_date INT NOT NULL,
    out_date INT NOT NULL,
    file_state_code INT NOT NULL,
    CONSTRAINT PK_FILE PRIMARY KEY (code),
    CONSTRAINT FK_LANGUAGE_CODE FOREIGN KEY (language_code) REFERENCES language(code),
    CONSTRAINT FK_CLIENT_CODE_FILE FOREIGN KEY (client_code) REFERENCES client(code),
    CONSTRAINT FK_FILE_STATE_CODE FOREIGN KEY (file_state_code) REFERENCES file_state(code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE provider (
    code INT NOT NULL AUTO_INCREMENT,
    identity_document_type_code TINYINT NOT NULL,
    id_number VARCHAR(15) NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_PROVIDER PRIMARY KEY (code),
    CONSTRAINT FK_IDENTITY_DOCUMENT_TYPE_CODE_PROVIDER FOREIGN KEY (identity_document_type_code) REFERENCES identity_document_type(code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE service (
    code INT NOT NULL AUTO_INCREMENT,
    service_type_code INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    service_code_dependency INT NOT NULL,
    CONSTRAINT PK_SERVICE PRIMARY KEY (code),
    CONSTRAINT FK_SERVICE_TYPE_CODE FOREIGN KEY (service_type_code) REFERENCES service_type(code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE tariff (
    code INT NOT NULL AUTO_INCREMENT,
    service_code INT NOT NULL,
    provider_code INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_PACKAGE PRIMARY KEY (code),
    CONSTRAINT FK_SERVICE_CODE_TARIFF FOREIGN KEY (service_code) REFERENCES service(code),
    CONSTRAINT FK_PROVIDER_CODE FOREIGN KEY (provider_code) REFERENCES provider(code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE package (
    code INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT PK_PACKAGE PRIMARY KEY (code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE package_detail (
    code INT NOT NULL AUTO_INCREMENT,
    package_code INT NOT NULL,
    service_code INT NOT NULL,
    price DECIMAL(14,6) NOT NULL,
    CONSTRAINT PK_PACKAGE_DETAIL PRIMARY KEY (code),
    CONSTRAINT FK_PACKAGE_CODE FOREIGN KEY (package_code) REFERENCES package(code),
    CONSTRAINT FK_SERVICE_CODE_PACKAGE_DETAIL FOREIGN KEY (service_code) REFERENCES service(code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE item_package_detail (
    code INT NOT NULL AUTO_INCREMENT,
    item_code INT NOT NULL,
    package_code INT NOT NULL,
    CONSTRAINT PK_ITEM_PACKAGE_DETAIL PRIMARY KEY (code),
    CONSTRAINT FK_ITEM_CODE FOREIGN KEY (item_code) REFERENCES item(code),
    CONSTRAINT FK_PACKAGE_CODE_ITEM_PACKAGE_DETAIL FOREIGN KEY (package_code) REFERENCES package(code)
) ENGINE=InnoDB;
/******************************************************************************************************/

/******************************************************************************************************/
CREATE TABLE file_detail (
    code INT NOT NULL AUTO_INCREMENT,
    file_code INT NOT NULL,
    package_code INT NOT NULL,
    service_code INT NOT NULL,
    date INT NOT NULL,
    CONSTRAINT PK_PACKAGE_DETAIL PRIMARY KEY (code),
    CONSTRAINT FK_FILE_CODE FOREIGN KEY (file_code) REFERENCES file(code),
    CONSTRAINT FK_PACKAGE_CODE_FILE_DETAIL FOREIGN KEY (package_code) REFERENCES package(code),
    CONSTRAINT FK_SERVICE_CODE_FILE_DETAIL FOREIGN KEY (service_code) REFERENCES service(code)
) ENGINE=InnoDB;
/******************************************************************************************************/