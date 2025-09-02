import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setIsLoading(true);
      setMovies([]);

      const results = await fetchMovies(query);
      
      if (results.length === 0) {
        toast.error('No movies found for your request.');
      }
      
      setMovies(results);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleMovieSelect} />
      )}
      
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      
      <Toaster position="top-center" />
    </div>
  );
};

export default App;