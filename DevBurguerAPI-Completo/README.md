# DevBurger API

Backend da aplicação DevBurger, responsável por autenticação, catálogo de produtos, categorias, pedidos e integração com Stripe.

## Tecnologias

- Node.js e Express
- Sequelize e PostgreSQL
- Mongoose e MongoDB
- JWT, Stripe, Yup e Multer

## Variáveis de ambiente

Crie o arquivo `.env` a partir de `.env.example` e informe, no mínimo, uma chave segura para `JWT_SECRET` e a chave da Stripe quando for usar pagamentos.

```bash
cp .env.example .env
```

## Docker

O Docker Compose inicia a API, PostgreSQL e MongoDB em uma rede interna. As migrações do PostgreSQL são executadas automaticamente antes da API iniciar.

```bash
# Cria as imagens e inicia todos os serviços.
docker compose up -d --build

# Acompanha os logs da API.
docker compose logs -f api

# Para os containers, preservando banco, MongoDB e uploads.
docker compose down

# Para os containers e também remove todos os dados persistidos.
docker compose down -v
```

A API fica disponível em `http://localhost:3000`. O Compose define `postgres` e `mongo` como hosts internos, sem depender de bancos instalados na máquina.

## Execução local

```bash
npm install
npm run migrate
npm run dev
```

## Testes

```bash
npm test
```

## Rotas principais

- `POST /users` — cadastro
- `POST /session` — login
- `GET /products` — lista produtos
- `GET /categories` — lista categorias
- `POST /orders` — cria pedido
- `POST /create-payment-intent` — cria pagamento
