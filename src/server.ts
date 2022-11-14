import express from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";
import { PORT } from "./config";
import { product_routes } from "./handlers";

const app = express();

app.use(bodyParser.json());

product_routes(app);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(PORT, function () {
  console.log(`starting app on: ${PORT}`);
});
