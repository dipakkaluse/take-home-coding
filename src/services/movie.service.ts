import axios from 'axios';
import config from "../config/config";


const getMoviesByYear = async (year: string | undefined, page: number = 1): Promise<any[]> => {
    try {

        const moviesResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
            headers: {
                Authorization: `Bearer ${config.accessToken}`
            },
            params: {
                language: 'en-US',
                page,
                primary_release_year: year,
                sort_by: 'popularity.desc',
            }

        });

        const movies = moviesResponse.data.results;


        const movieDetailsPromises = movies.map(async (movie: any) => {
            const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits`, {
                headers: {
                    Authorization: `Bearer ${config.accessToken}`
                },
            });

            const editors = creditsResponse.data.crew
                .filter((member: any) => member.known_for_department === 'Editing')
                .map((editor: any) => editor.name);

            return {
                title: movie.title,
                release_date: new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                vote_average: movie.vote_average,
                editors: editors
            };
        });

        const movieDetails = await Promise.all(movieDetailsPromises);

        return movieDetails;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw new Error('Failed to fetch movie data');
    }
};

export default {
    getMoviesByYear
};
