# Back-end Challenge - Nave

### Iniciando o projeto:
1. Inicie o projeto baixando suas dependências: `yarn` ou `npm i`

2. Faça uma cópia do arquivo `.env.example` para `.env` e insira os valores das variaveis de ambiente
* BCRYPT_SALT_ROUNDS= Utilizei para o bcrypt o valor `13` de rounds.
* ACCESS_JWT_SECRET= Secret do jwt para validação dos tokens
* JWT_EXPIRES= Periodo para expirar o token, estava utilzando `12h`
3. Rode as migrations para criar o banco de dados: `yarn typeorm migration:run` ou `npm run typeorm migration:run`

### Documentação pelo Insomnia

Faça o download do arquivo `Insomnia_2021-03-10.json` para importar ou importe usando a URL 
`https://github.com/yagogomesc/naveteam-nodejs/blob/main/Insomnia_2021-03-10.json`

### Sobre o projeto

O projeto foi feito tendo base o padrão MVC, utilizando as seguintes tecnologias/dependencias:
* Typescript
* Express
* TypeORM
* Jsonwebtoken
* SQLITE
* YUP
