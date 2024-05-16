-- Criação da tabela works (Obras)
CREATE TABLE works (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL
);

-- Criação da tabela employees (Funcionários)
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE
);

-- Criação da tabela companies (Empresas)
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    real_name VARCHAR(100) NOT NULL,
    fantasy_name VARCHAR(100) NOT NULL
);

-- Criação da tabela clients (Clientes)
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info TEXT
);

-- Criação da tabela sales (Vendas)
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12, 2) NOT NULL,
    work_id INT NOT NULL REFERENCES works (id),
    sale_date DATE NOT NULL,
    is_installment BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela sales_installments (Parcelas das Vendas)
CREATE TABLE sales_installments (
    id SERIAL PRIMARY KEY,
    sale_id INT NOT NULL REFERENCES sales (id),
    installment_amount NUMERIC(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid BOOLEAN DEFAULT FALSE,
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela purchases (Compras)
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12, 2) NOT NULL,
    description TEXT,
    company_id INT NOT NULL REFERENCES companies (id),
    purchase_date DATE NOT NULL,
    is_installment BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela purchase_installments (Parcelas das Compras)
CREATE TABLE purchase_installments (
    id SERIAL PRIMARY KEY,
    purchase_id INT NOT NULL REFERENCES purchases (id),
    installment_amount NUMERIC(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid BOOLEAN DEFAULT FALSE,
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela payroll (Folha de Pagamento)
CREATE TABLE payroll (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12, 2) NOT NULL,
    employee_id INT NOT NULL REFERENCES employees (id),
    payroll_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela provided_services (Serviços Prestados)
CREATE TABLE provided_services (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12, 2) NOT NULL,
    client_id INT NOT NULL REFERENCES clients (id),
    description TEXT,
    service_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela contracted_services (Serviços Contratados)
CREATE TABLE contracted_services (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12, 2) NOT NULL,
    employee_id INT NOT NULL REFERENCES employees (id),
    description TEXT,
    service_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table taxes_type(
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL
);

create table taxes(
	id SERIAL PRIMARY KEY,
	amount NUMERIC(12, 2) NOT NULL,
    tax_date DATE DEFAULT CURRENT_TIMESTAMP,
	taxes_type_id INT NOT NULL REFERENCES taxes_type (id)
);

insert into taxes_type (name)
values ('PIS'), ('COFINS'), ('IR'), ('CSLL'), ('FGTS'), ('INSS');