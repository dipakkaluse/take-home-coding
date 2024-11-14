import express, { Router } from 'express';
import movieController from '../controllers/movie.controller';

const router: Router = express.Router();

router.route('/').get(movieController.getMovies);


export default router;
