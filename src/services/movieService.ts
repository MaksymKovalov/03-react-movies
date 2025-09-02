import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
  page: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get<TMDBResponse>('/search/movie', {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results;
};