import type { Request, Response, NextFunction } from "express";
import { verify, Secret } from "jsonwebtoken";
import { TOKEN } from "../config";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization = "" } = req.headers;
    const token = authorization.split(" ")[1];
    if (!verify(token, TOKEN as Secret)) {
      res.sendStatus(401);
    }
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default verifyAuthToken;
