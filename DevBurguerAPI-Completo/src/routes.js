import { Router } from "express";
import { request } from "express";
import multer from "multer";

import multerConfig from "./config/multer";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import CategoryController from "./app/controllers/CategoryController";
import OrderController from "./app/controllers/OrderController";
import CreatePaymentIntentController from "./app/controllers/stripe/CreatePaymentIntentController";
import authMiddlware from "./app/middlewares/auth";

const routes = new Router();

const upload = multer(multerConfig);

routes.get("/", (request, response) => {
  return response.status(200).json({ message: "DevBurger API is running" });
});

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.get("/products", ProductController.index);
routes.get("/categories", CategoryController.index);

routes.use(authMiddlware);
routes.post("/products", upload.single("file"), ProductController.store);
routes.put("/products/:id", upload.single("file"), ProductController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

routes.post("/create-payment-intent", CreatePaymentIntentController.store);

export default routes;
