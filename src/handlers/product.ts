import type { Request, Response, Application } from "express";
import { ProductStore } from "../models/product";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const store = new ProductStore();

const indexHandler = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const showHandler = async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id));
  res.json(product);
};

const createHandler = async (req: Request, res: Response) => {
  const product = await store.create(req.body);
  res.json(product);
};

const product_routes = (app: Application) => {
  app.get("/products", indexHandler);
  app.get("/products/:id", showHandler);
  app.post("/products", verifyAuthToken, createHandler);
};

export default product_routes;
