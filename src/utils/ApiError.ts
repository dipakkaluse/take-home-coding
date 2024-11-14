class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational?: boolean, stack?: string | undefined) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational || false;

        if (stack) {
            this.stack = stack;
        }

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export default ApiError;
