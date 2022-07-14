/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/App.Error";
import { router } from "./routes";
import createConnection from "./typeorm";

import "../../container";

createConnection();
const app = express();

app.use(cors("*"));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                error: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal Server Error - ${err.message}`,
        });
    }
);

app.listen(3333, () => console.log("server is running"));
