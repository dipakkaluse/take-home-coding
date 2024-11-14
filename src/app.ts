import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes";
import { errorConverter, errorHandler } from "./middleware/error";
import ApiError from "./utils/ApiError";

const app = express();

// JSON requests are received as plain text. We need to parse the json request body.
app.use(express.json({ limit: "100mb" }));

// Parse urlencoded request body if provided with any of the requests
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Enable cors to accept requests from any frontend domain, all possible HTTP methods, and necessary items in request headers
app.use(cors());
app.options("*", cors());

// Define routes index in separate file.
app.use("/api/v1/", routes);

// Send back a 404 error for any unknown API request
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(404, "Not found")); // Manually specify the HTTP status code for Not Found
});

// Convert error to ApiError, if request was rejected or it throws an error
app.use(errorConverter);

// Handle the error
app.use(errorHandler);

export default app;
