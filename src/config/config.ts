import dotenv from "dotenv";
import path from "path";
// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Define a type for the configuration object
interface Config {
    port: string | undefined;
    discoverMovieAPI: string | undefined;
    movieCreditAPI: string | undefined;
    accessToken: string | undefined;

}

// Define and export the config object with type safety
const config: Config = {
    port: process.env.PORT,
    discoverMovieAPI: process.env.DISCOVER_MOVIE_API,
    movieCreditAPI: process.env.MOVIE_CREDIT_API,
    accessToken: process.env.ACCESS_TOKEN

};

export default config;
