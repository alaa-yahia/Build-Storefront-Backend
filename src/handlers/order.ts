import type { Request, Response, Application } from "express";
import { OrderStore } from "../models/order";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const store = new OrderStore();

const createHandler = async (req: Request, res: Response) => {
  const order = await store.create(req.body);
  res.json(order);
};

const currentOrderByUserHandler = async (req: Request, res: Response) => {
  const orders = await store.currentOrderByUser(parseInt(req.params.user_id));
  res.json(orders);
};

const order_routes = (app: Application) => {
  app.post("/orders", verifyAuthToken, createHandler);
  app.get("/orders/:user_id", verifyAuthToken, currentOrderByUserHandler);
};

export default order_routes;
