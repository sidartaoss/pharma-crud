# Frontend React - Aplicação de Gestão de Farmácia

Este repositório contém a aplicação frontend desenvolvida em React para gestão de clientes, medicamentos e assinaturas. A aplicação se comunica com o backend via APIs RESTful e implementa funcionalidades de criação, listagem, edição e remoção de clientes, medicamentos e assinaturas.

## Requisitos Funcionais

### CRUD de Clientes (Clients)
- Cadastro de novos clientes.
- Atualização de informações dos clientes.
- Listagem de clientes.
- Remoção de clientes.

### CRUD de Medicamentos (Medications)
- Cadastro de novos medicamentos.
- Atualização de informações dos medicamentos.
- Listagem de medicamentos.
- Remoção de medicamentos.

### Serviços de Assinaturas (Subscriptions)
- Listagem de assinaturas de medicamentos contínuos de um cliente, informando o email do cliente.
- Criação de uma nova assinatura de medicamento contínuo para um cliente.

## Endpoints

### Rotas de Clientes
- **GET** `/api/clients`: Lista todos os clientes.
- **POST** `/api/clients`: Cria um novo cliente.
- **PUT** `/api/clients/{id}`: Atualiza os dados de um cliente específico.
- **DELETE** `/api/clients/{id}`: Remove um cliente específico.

### Rotas de Medicamentos
- **GET** `/api/medications`: Lista todos os medicamentos.
- **POST** `/api/medications`: Cria um novo medicamento.
- **PUT** `/api/medications/{id}`: Atualiza os dados de um medicamento específico.
- **DELETE** `/api/medications/{id}`: Remove um medicamento específico.

### Rotas de Assinaturas
- **GET** `/api/subscriptions?clientEmail={email}`: Lista todas as assinaturas de medicamentos contínuos de um cliente, filtrando pelo email.
- **POST** `/api/clients/{clientId}/subscribe`: Cria uma nova assinatura de medicamento contínuo para um cliente.

## Como Acessar a Aplicação

### Pré-requisitos
- Node.js instalado (recomenda-se a versão LTS).
- npm (gerenciador de pacotes do Node.js).

### Passos para Subir a Aplicação
1. Clone este repositório:
   ```bash
   git clone https://github.com/sidartaoss/pharma-crud.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd pharma-crud
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Suba a aplicação:
   ```bash
   npm start
   ```

A aplicação estará disponível em http://localhost:3000.

### Tecnologias Utilizadas

- Frontend: React
- Gerenciador de Pacotes: npm
- Bibliotecas de UI: Material-UI (MUI)
- Roteamento: React Router
- Consumo de API: Fetch API