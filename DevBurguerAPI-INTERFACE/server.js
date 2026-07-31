import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

let users = [
  {
    id: 1,
    name: 'Admin Demo',
    email: 'admin@example.com',
    password: '123456',
    admin: true,
  },
  {
    id: 2,
    name: 'Cliente Demo',
    email: 'cliente@example.com',
    password: '123456',
    admin: false,
  },
];
let categories = [
  {
    id: 1,
    name: 'Burguer',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Acompanhamentos',
    url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Bebidas',
    url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80',
  },
];

let products = [
  {
    id: 1,
    name: 'Classic Burger',
    price: 2500,
    category_id: 1,
    offer: true,
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Batata Frita',
    price: 1800,
    category_id: 2,
    offer: false,
    url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Refrigerante',
    price: 1200,
    category_id: 3,
    offer: true,
    url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80',
  },
];

let orders = [];

const createToken = () => `devburger-${Math.random().toString(36).slice(2)}`;

app.post('/session', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (item) => item.email === email && item.password === password,
  );

  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    admin: user.admin,
    token: createToken(),
  });
});

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  if (users.some((user) => user.email === email)) {
    return res.status(409).json({ message: 'Email já cadastrado' });
  }

  const user = { id: Date.now(), name, email, password, admin: false };
  users.push(user);
  return res.status(201).json(user);
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/categories', (_req, res) => {
  res.json(categories);
});

app.get('/products', (_req, res) => {
  res.json(products);
});

app.post('/products', upload.single('file'), (req, res) => {
  const { name, price, category_id, offer } = req.body;
  const product = {
    id: Date.now(),
    name,
    price: Number(price),
    category_id: Number(category_id),
    offer: offer === 'true' || offer === true,
    url: req.file ? `/uploads/${req.file.filename}` : '',
  };
  products.push(product);
  return res.status(201).json(product);
});

app.put('/products/:id', upload.single('file'), (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id === Number(id));
  if (index < 0)
    return res.status(404).json({ message: 'Produto não encontrado' });

  const { name, price, category_id, offer } = req.body;
  products[index] = {
    ...products[index],
    name,
    price: Number(price),
    category_id: Number(category_id),
    offer: offer === 'true' || offer === true,
    url: req.file ? `/uploads/${req.file.filename}` : products[index].url,
  };
  return res.json(products[index]);
});

app.post('/create-payment-intent', (req, res) => {
  const { products: cartProducts = [] } = req.body;
  const amount =
    cartProducts.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0,
    ) + 500;
  res.json({
    clientSecret: 'fake-client-secret',
    dpmCheckerLink: 'https://stripe.com/docs/payments/accept-a-payment',
    amount,
  });
});

app.post('/orders', (req, res) => {
  const { products: cartProducts = [] } = req.body;
  const order = {
    _id: Date.now(),
    user: { name: 'Cliente Demo' },
    product: cartProducts,
    status: 'Pendente',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json(order);
});

app.get('/orders', (_req, res) => {
  res.json(orders);
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
