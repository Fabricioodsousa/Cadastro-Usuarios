# Projeto de Cadastro de Usuários

Projeto de CRUD com integração em front e back para gerenciamento de usuários.

---

## Funcionalidades

- Cadastro de usuário
- Listagem de usuários
- Remoção de usuários

---

## Tecnologias utilizadas

- Backend: Node.js, Express
- Frontend: React, CSS
- Banco de dados: MySQL

---


## Página Inicial

![paginaInicial](https://github.com/user-attachments/assets/fc603787-2a24-4510-bf37-1c50627e4c49)

## Estrutura do Banco de Dados

```sql

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);
