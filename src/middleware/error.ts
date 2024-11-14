import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

interface CustomError extends Error {
    statusCode?: number;
    stack?: string;
}

const errorConverter = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    let error = err;

    // If the error is not an instance of ApiError, create a new ApiError instance
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode
            ? error.statusCode
            : 500; // Use 500 for Internal Server Error by default

        const message = error.message || "Internal Server Error"; // Default message for 500
        error = new ApiError(statusCode, message, false, error.stack);
    }

    next(error);
};

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);  // Log the error

    let { statusCode, message } = err;

    // Set the error message to the locals object for rendering if needed
    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
    };

    // Send the error response with the proper status code
    res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
