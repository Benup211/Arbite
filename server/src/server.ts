import express from "express"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response,NextFunction } from "express";

import AdminRoute from "./routes/admin.route";
import AuthRoute from "./routes/auth.route";

export class MainServer{
    public server:express.Application=express();

    constructor(){
        this.setConfiguration();
        this.setRoutes();
        this.handle404Error();
        this.handleClientError();
    }

    async setConfiguration(){
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cookieParser());
        this.server.use(bodyParser.json());
        this.server.use(cors({ origin: "http://localhost:5173" }));
    }

    setRoutes(){
        this.server.use("/api/auth", AuthRoute);
        this.server.use("/api/admin", AdminRoute);
    }

    handle404Error() {
        this.server.use((req: Request, res: Response) => {
            res.status(404).json({
                status: 404,
                errorName: "Not Found",
                errorMessage: "Not Found",
            });
        });
    }
    handleClientError() {
        this.server.use(
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                let errorStatus = (err as any).errorStatus || 500;
                let errorMessage =
                    err.message ||
                    "Something went wrong. Please try again later";
                res.status(errorStatus).json({
                    status: errorStatus,
                    errorName: err.name,
                    errorMessage: errorMessage,
                });
            }
        );
    }
}