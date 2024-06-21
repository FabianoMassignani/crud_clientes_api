# Node.JS

## Crud de clientes

## Como Rodar o Projeto Localmente

1. Clone o repositório:

```
git clone https://github.com/FabianoMassignani/crud_clientes_api.git
```

2. Instale as dependências:

```
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias:

```
cp .env
```

```
 MONGO_URI="mongodb+srv://fabiano:fabiano@app.4x3lw9q.mongodb.net/?retryWrites=true&w=majority&appName=app"
 MONGO_URI_TEST="mongodb+srv://fabiano:fabiano@app.4x3lw9q.mongodb.net/?retryWrites=true&w=majority&appName=app"
 PORT=3001
 JWT_SECRET="mysecretkey"
```

4. Inicie o servidor de desenvolvimento da aplicação e do servidor:

```
npm start
```