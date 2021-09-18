require("dotenv").config();
import * as express from "express";
import { Routes } from "./routes/apiRoutes";
import { ErrorMiddleware } from "./middleware/errorMiddleware";

class App {
  public app: express.Application = express();
  public routeEng: Routes = new Routes();
  public errorMiddleware: ErrorMiddleware = new ErrorMiddleware();

  constructor() {
    this.config();
    this.routeEng.routes(this.app);
    this.errorHandler();
  }

  // extend parser functions
  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private errorHandler() {
    this.app.use(this.errorMiddleware.handle);
  }
}

export default new App().app;
