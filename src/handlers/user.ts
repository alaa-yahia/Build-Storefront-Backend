import type { Request, Response, Application } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { TOKEN } from "../config";
import { UserStore } from "../models/user";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const store = new UserStore();

const createHandler = async (req: Request, res: Response) => {
  const user = await store.create(req.body);
  const token = jwt.sign({ user }, TOKEN as Secret);
  res.json(token);
};

const authenticateHandler = async (req: Request, res: Response) => {
  const user = await store.authenticate(req.body);
  if (!user) res.sendStatus(401);
  const token = jwt.sign({ user }, TOKEN as Secret);
  res.json(token);
};

const user_routes = (app: Application) => {
  app.post("/users", createHandler);
  app.get("/users/authenticate", authenticateHandler);
};

export default user_routes;
