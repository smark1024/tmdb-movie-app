import tmdbApi from "./axios";

const requests = {
    fetchNowPlaying: "/movie/now_playing",
    fetchPopular: "/movie/popular",
    fetchTopRated: "/movie/top_rated",
    fetchUpcoming: "/movie/upcoming",
    fetchSearch: "/search/movie",
};

export const fetchMovies = async (fetchUrl, page = 1) => {
    try {
        const response = await tmdbApi.get(fetchUrl, {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const searchMovies = async (query, page = 1) => {
    try {
        const response = await tmdbApi.get(requests.fetchSearch, {
            params: { query, page },
        });
        return response.data;
    } catch (error) {
        console.error("Search API Error:", error);
        throw error;
    }
};

export default requests;
