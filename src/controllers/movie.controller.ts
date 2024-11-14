import { Request, Response, NextFunction } from 'express';
import movieService from '../services/movie.service';

const getMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { year, page = 1 } = req.query;
        const movies = await movieService.getMoviesByYear(year?.toString(), Number(page));
        res.json(movies);
    } catch (error) {
        next(error);
    }
};

export default { getMovies };
