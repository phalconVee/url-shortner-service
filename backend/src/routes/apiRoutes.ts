import { Request, Response, NextFunction } from "express";
import { URLController } from "../controllers/urlController";

export class Routes {
  public urlController: URLController = new URLController();

  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "Indicina URL shortner app (v1.0.0)",
      });
    });

    app.route("/encode").post(this.urlController.shortenURL);

    app.route("/decode/:hash").post(this.urlController.decodeURL);

    /** Invalid Routes */
    app.route("*").get((req: Request, res: Response) => {
      res.status(404).send({
        status: false,
        message: "Page not found",
      });
    });
  }
}
