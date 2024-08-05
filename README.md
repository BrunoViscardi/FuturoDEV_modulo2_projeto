<h1 align="center"> Exercita365 </h1>


O Exercita365 é uma plataforma que facilita o gerenciamento de exercícios e locais para atividades físicas serem praticadas. Os usuários podem cadastrar novos locais de exercícios, encontrar pontos próximos, visualizar informações sobre os exercícios em cada ponto e registrar suas próprias contribuições para o sistema.

## ✅ Funcionalidades

 - Cadastro de novo usuário
 - Login do usuário e autenticação via Token
 - Cadastro de novo local de treino
 - Visualização, deleção e atualização de locais de treino cadastrados pelo usuário logado
 - Geração de link para o Google Maps especificando o local de treino no mapa
 

## 🚀Demonstração de uso

<div align="center"><div/>







<div align="left"><div/>


## 🧩Ferramentas de desenvolvimento

<div align="center"><div/>
  



| 🧩 | Ferramentas | Funcionalidade|
|--|--|--|
|<img width="50 px" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png">  |JavaScript|Linguagem de programação|
|<img height="50 px" src="https://github.com/user-attachments/assets/973069db-5614-4563-b9f0-738ddd62d829"> |Node| Ambiente de execução de JavaScript|
|<img width="50 px" src="https://cdn.worldvectorlogo.com/logos/nodemon.svg"> |Nodemon|Ferramenta para reiniciar automaticamente a aplicação|
|<img height="50 px" src="https://user-images.githubusercontent.com/8939680/57233882-20344080-6fe5-11e9-9086-d20a955bed59.png"> |Axios|Cliente HTTP baseado em Promises|
|<img width="50 px" src="https://avatars.githubusercontent.com/u/6078720?s=200&v=4"> |bcrypt.js|Biblioteca para criptografar senhas|
|<img width="50 px" src="https://avatars.githubusercontent.com/u/6078720?s=200&v=4"> |cors|Middleware para habilitar CORS|
|<img width="50 px" src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg"> |dotenv|Carregar variáveis de ambiente de um arquivo .env|
|<img width="50 px" src="https://images.credly.com/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png"> |Express|Framework para construir APIs em Node.js|
|<img height="50 px" src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg"> |JSON Web Token|Autenticação baseada em tokens|
|<img width="50 px" src="https://avatars.githubusercontent.com/u/6078720?s=200&v=4"> |node-postgres|Biblioteca para conectar ao PostgreSQL|
|<img width="50 px" src="https://raw.githubusercontent.com/sequelize/sequelize/0b7c86d063bfb43fd3d513640456a63304934231/logo.svg"> |Sequelize|ORM para Node.js e PostgreSQL|
|<img width="50 px" src="https://cdn.worldvectorlogo.com/logos/swaggerhub-1.svg"> |swagger-autogen|Geração automática de documentação Swagger|
|<img width="50 px" src="https://cdn.worldvectorlogo.com/logos/swaggerhub-1.svg"> |swagger-ui-express|Interface gráfica para documentação Swagger|










<div align="left"><div/>


## 🔨Construção e instalação de dependências

**React + Vite**
```
npm create vite@latest
npm install
cd project-name
```

**Json-server**
```
npm install json-server
```

**React-router-dom**
```
npm install react-router-dom
```

**React-hook-form**
```
npm install react-hook-form
```

**Material UI - Icons**
```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```


## ▶️Execução
**Vite**
```
npm run dev
```

**Json-server**
```
npx json-server ./data/db.json
```





## 💊 Sugestão de melhorias 

 - Ao usuário que não tenha mais seus dados em permanência no LocalStorage (isAutenticado" - true) por motivos adversos ou exclusão forçada, eliminá-lo da lista de usuários ativos;
 - Exclusão de locais permitido somente ao usuaário que o cadastrou;
 - Implementar responsividade para diferentes tipos de tela;
 - Implementar uso de mapas interativos no lugar da lista de locais de exercícios com base na latitude e longitude fornecido pelo usuário. Sugestão: uso da biblioteca React Leaflet.
