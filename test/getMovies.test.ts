import { Request, Response, NextFunction } from 'express';
import movieController from '../src/controllers/movie.controller';
import movieService from '../src/services/movie.service';

jest.mock('../src/services/movie.service');

describe('getMovies Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = {
            query: {},
        };
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();
        res = {
            status: statusMock,
            json: jsonMock,
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should respond with movies for the specified year and page', async () => {
        // Arrange
        req.query = { year: '2021', page: '1' };
        const mockMovies = [
            { title: 'Movie 1', release_date: '2021-01-01', vote_average: 8.1, editors: ['Editor 1', 'Editor 2'] },
            { title: 'Movie 2', release_date: '2021-02-01', vote_average: 7.9, editors: ['Editor 3'] },
        ];
        (movieService.getMoviesByYear as jest.Mock).mockResolvedValue(mockMovies);

        // Act
        await movieController.getMovies(req as Request, res as Response, next);

        // Assert
        expect(movieService.getMoviesByYear).toHaveBeenCalledWith('2021', 1);
        expect(jsonMock).toHaveBeenCalledWith(mockMovies);
    });

    test('should default to page 1 if no page is provided', async () => {
        req.query = { year: '2021' };
        const mockMovies = [{ title: 'Movie 1', release_date: '2021-01-01', vote_average: 8.1, editors: ['Editor 1'] }];
        (movieService.getMoviesByYear as jest.Mock).mockResolvedValue(mockMovies);

        await movieController.getMovies(req as Request, res as Response, next);

        expect(movieService.getMoviesByYear).toHaveBeenCalledWith('2021', 1);
        expect(jsonMock).toHaveBeenCalledWith(mockMovies);
    });

    test('should call next with error if service fails', async () => {
        const error = new Error('Service Error');
        (movieService.getMoviesByYear as jest.Mock).mockRejectedValue(error);

        await movieController.getMovies(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    test('should return 400 status if year is missing', async () => {
        req.query = { page: '1' };

        await movieController.getMovies(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});
