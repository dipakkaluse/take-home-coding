import express, { Router } from 'express';
import healthRoute from './health.route';
import movieRoute from './movie.route';

// Create an instance of the Router
const router: Router = express.Router();

// Use the health route first

// Define the default routes with their respective paths and routes
const defaultRoutes = [
    {
        path: '/movies', // Base user route for order routes
        route: movieRoute,
    },
    {
        path: '/health', // Base user route for order routes
        route: healthRoute,
    },

];

// Loop through the routes array and use each route
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

// Export the router
export default router;
