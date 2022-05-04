### Boas vindas ao repositório Futebol Clube! ⚽️


---


# Habilidades


O `Futebol Clube` é um site informativo sobre partidas e classificações de futebol! ⚽️

No desenvolvimento do `Futebol Clube`, Fui capaz por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que funcionem consumindo um banco de dados.

Nesse projeto construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Fui capaz de:

 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;


---

## Desenvolvimento

Desenvolvi uma aplicação dockerizada em `Node.js + Typescript` usando o pacote `sequelize`.

Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazermos as atualizações das partidas.
