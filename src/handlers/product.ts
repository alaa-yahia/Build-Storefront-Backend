import type { Request, Response, Application } from "express";
import { ProductStore } from "../models/product";

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

const updateHandler = async (req: Request, res: Response) => {
  const product = await store.update(parseInt(req.params.id), req.body);
  res.json(product);
};

const deleteHandler = async (req: Request, res: Response) => {
  await store.delete(parseInt(req.params.id));
  res.status(200).send("Deleted successfuly");
};

const product_routes = (app: Application) => {
  app.get("/products", indexHandler);
  app.get("/products/:id", showHandler);
  app.put("/products/:id", updateHandler);
  app.post("/products", createHandler);
  app.delete("/products/:id", deleteHandler);
};

export default product_routes;
