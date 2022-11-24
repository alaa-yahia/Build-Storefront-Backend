import type { Request, Response, Application } from "express";
import { OrderStore } from "../models/order";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const store = new OrderStore();

const createHandler = async (req: Request, res: Response) => {
  try {
    const order = await store.create(req.body);
    res.json(order);
  } catch (err) {
    res.sendStatus(404).send(err);
  }
};

const currentOrderByUserHandler = async (req: Request, res: Response) => {
  try {
    const orders = await store.currentOrderByUser(parseInt(req.params.user_id));
    res.json(orders);
  } catch (err) {
    res.sendStatus(404).send(err);
  }
};

const order_routes = (app: Application) => {
  app.post("/orders", verifyAuthToken, createHandler);
  app.get("/orders/:user_id", verifyAuthToken, currentOrderByUserHandler);
};

export default order_routes;
