import { Request, Response, NextFunction } from "express";

export class Routes {

    public routes(app): void {

        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Indicina URL shortner app (v1.0.0)",
            });
        });

        /** Invalid Routes */
        app.route("*").get((req: Request, res: Response) => {
            res.status(404).send({
            status: false,
            message: "Page not found",
            });
        });
    }
} 