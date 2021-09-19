require("dotenv").config();
import * as express from "express";
import * as mongoose from "mongoose";
import { Routes } from "./routes/apiRoutes";
import { ErrorMiddleware } from "./middleware/errorMiddleware";

class App {
  public app: express.Application = express();
  public mongoUrl: string =
    process.env.DB_URL || "mongodb://localhost/indicina";
  public routeEng: Routes = new Routes();
  public errorMiddleware: ErrorMiddleware = new ErrorMiddleware();

  constructor() {
    this.config();
    this.mongoSetup();
    this.routeEng.routes(this.app);
    this.errorHandler();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    /** mongoose.Promise = global.Promise; */
    mongoose.connect(this.mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB: " + this.mongoUrl);
  }

  private errorHandler() {
    this.app.use(this.errorMiddleware.handle);
  }
}

export default new App().app;
