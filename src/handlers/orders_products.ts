import express, { Request, Response } from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import { OrdersProductsStore } from "../models/orders_products";

const store = new OrdersProductsStore();

const index = async (req: Request, res: Response) => {
  try {
    const ordersProducts = await store.index();
    res.json(ordersProducts);
  } catch (error) {
    res.sendStatus(500).send(`${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order_id = req.params.order_id;
    const ordersProducts = await store.show(order_id);
    res.json(ordersProducts);
  } catch (error) {
    res.sendStatus(500).send(`${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const orderProduct = await store.create(req.body);
    res.json(orderProduct);
  } catch (error) {
    res.sendStatus(500).send(`${error}`);
  }
};

const orders_products_routes = (app: express.Application) => {
  app.get("/orders/products", verifyAuthToken, index);
  app.get("/orders/:order_id/products", verifyAuthToken, show);
  app.post("/ordersp/products/:order_id", verifyAuthToken, create);
};

export default orders_products_routes;
