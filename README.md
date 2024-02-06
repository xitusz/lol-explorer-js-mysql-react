# Personal Project 1 - JS

[Personal Project 1 - TS](https://github.com/xitusz/personal-project-1-ts)

---

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Projeto](#projeto)
  - [Home](#home)
  - [Champion](#champion)
  - [Champion Details](#champion-details)
  - [Region](#region)
  - [Region Details](#region-details)
  - [Login](#login)
  - [Register](#register)
  - [Profile](#profile)
  - [Profile Edit](#profile-edit)
  - [Diagram](#diagram)
- [Clonando Repositório](#clonando-repositório)
- [Instalando Dependências](#instalando-dependências)
- [Criando Banco de Dados](#criando-banco-de-dados)
- [Executando Aplicação](#executando-aplicação)

---

## Tecnologias Utilizadas

- JavaScript
- React
- Bootstrap
- Google Recaptcha
- Jest
- Node.js
- Express.js
- Sequelize
- MySQL2
- Bcrypt
- Jwt
- Mocha
- Chai
- Sinon

---

## Projeto

### Home

Tela inicial com 2 opções, navegar para personagens ou regiões

![Home Gif](./readme-images/home.gif)

### Champion

Lista dos personagens, opção de favoritar, campo de busca, botões de filtro e ao clicar em algum personagem será redirecionado para os detalhes deste personagem

![Champion Gif](./readme-images/champion.gif)

### Champion Details

Detalhes do personagem selecionado

![Champion Details Gif](./readme-images/championDetails.gif)

### Region

Lista das regiões com campo de busca e ao clicar em alguma região será redirecionado para os detalhes desta região

![Region Gif](./readme-images/region.gif)

### Region Details

Detalhes da região selecionada

![Region Details Gif](./readme-images/regionDetails.gif)

### Login

Tela de login

![Login Gif](./readme-images/login.gif)

### Register

Tela de registro

![Register Gif](./readme-images/register.gif)

### Profile

Perfil com nome e email, opção de editar perfil e a lista dos personagens favoritos

![Profile Gif](./readme-images/profile.gif)

### Profile Edit

Opções de editar o nome, email ou senha e de deletar o usuario

![Profile Edit Gif](./readme-images/profileEdit.gif)

### Diagram

Diagrama do banco de dados

![Diagram image](./readme-images/diagram.png)

---

## Clonando Repositório

- Clone o repositório

  ```sh
    git clone git@github.com:xitusz/personal-project-1-js.git
  ```

---

## Instalando Dependências

- Entre na pasta do repositório que você clonou:

  ```sh
    cd personal-project-1-js
  ```

- Instale as dependências

  ```sh
    npm run install-all
  ```

---

## Criando Banco de Dados

- Entre na pasta do back-end:

  ```sh
    cd personal-project-1-js/back-end
  ```

- Crie o banco de dados:

  ```sh
    npm run db:reset
  ```

---

## Executando Aplicação

- Entre na pasta do repositório que você clonou:

  ```sh
    cd personal-project-1-js
  ```

- Inicie o projeto:

  ```sh
    npm start
  ```

- Acesse o endereço em seu navegador:

  ```sh
    http://localhost:3000/
  ```

---
