import axios from 'axios';
import type { MovieApiResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export interface FetchMoviesParams {
  query: string;
  page: number;
}

export const fetchMovies = async ({ query, page }: FetchMoviesParams): Promise<MovieApiResponse> => {
  const response = await api.get<MovieApiResponse>('/search/movie', {
    params: {
      query,
      language: 'en-US',
      page,
    },
  });

  return response.data;
};