import app from "./app";
import config from "./config/config";

let server: any;

// Start the Express server
server = app.listen(config.port, () => {
    console.log(`Node server listening on port => ${config.port}`);
});

// Manually close the server if an unhandled exception occurs
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: Error) => {
    console.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    console.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
