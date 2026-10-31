'use client';

import React, { useEffect, useState, ChangeEvent } from 'react';
import { Movie, MovieFilters, ApiResponse } from '@/types/movie';

interface PaginationInfo {
  current: number;
  pages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    current: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false
  });
  
  const [filters, setFilters] = useState<MovieFilters>({
    search: '',
    genre: '',
    year: '',
    rated: '',
    min_rating: '',
    sort: 'year',
    order: 'desc',
    page: 1
  });

  useEffect(() => {
    fetchMovies();
  }, [filters]);

  const fetchMovies = async (): Promise<void> => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
      
      queryParams.append('limit', '12');

      const res = await fetch(`/api/movies?${queryParams}`);
      const data: ApiResponse<Movie[]> = await res.json();
      
      if (data.success && data.data) {
        setMovies(data.data);
        if (data.pagination) {
          setPagination(data.pagination);
        }
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch movies');
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof MovieFilters, value: string | number): void => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value // Reset to first page when filters change
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    handleFilterChange(name as keyof MovieFilters, value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const [sort, order] = e.target.value.split('-') as ['year' | 'rating' | 'title' | 'runtime', 'asc' | 'desc'];
    setFilters((prev: any) => ({
      ...prev,
      sort,
      order,
      page: 1
    }));
  };

  const handlePageChange = (newPage: number): void => {
    handleFilterChange('page', newPage);
  };

  if (loading) return <div className="text-center py-8">Loading movies...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Movie Database</h1>
      
      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          value={filters.search}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-lg"
        />
        
        <input
          type="text"
          name="genre"
          placeholder="Genre (e.g., Drama)"
          value={filters.genre}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-lg"
        />
        
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={filters.year}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-lg"
        />
        
        <select
          name="rated"
          value={filters.rated}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Any Rating</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
        </select>
        
        <select
          value={`${filters.sort}-${filters.order}`}
          onChange={handleSortChange}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="year-desc">Newest First</option>
          <option value="year-asc">Oldest First</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="rating-asc">Lowest Rated</option>
          <option value="title-asc">A-Z</option>
          <option value="title-desc">Z-A</option>
        </select>
      </div>

      {/* Results count */}
      <div className="mb-4 text-gray-600">
        Showing {movies.length} of {pagination.total} movies
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {movie.poster && (
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h2>
              
              <div className="text-sm text-gray-600 mb-2">
                {movie.year} • {movie.runtime} min • {movie.rated}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {movie.genres?.slice(0, 3).map((genre: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {genre}
                  </span>
                ))}
              </div>
              
              {movie.imdb?.rating && (
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                    ⭐ {movie.imdb.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({movie.imdb.votes?.toLocaleString()} votes)
                  </span>
                </div>
              )}
              
              <p className="text-gray-700 text-sm line-clamp-3">{movie.plot}</p>
              
              {movie.directors && movie.directors.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  Director: {movie.directors.join(', ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.current - 1)}
            disabled={!pagination.hasPrev}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <span className="px-4 py-2">
            Page {pagination.current} of {pagination.pages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.current + 1)}
            disabled={!pagination.hasNext}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;


// API Usage Examples

// 1. Fetch a single movie

// 'use client'
// export const fetchMovie = async (id: string) => {
//   try {
//     const response = await fetch(`/api/movies/${id}`);
//     const data = await response.json();
    
//     if (data.success) {
//       return data.data; // MovieType
//     } else {
//       throw new Error(data.error);
//     }
//   } catch (error) {
//     console.error('Error fetching movie:', error);
//     throw error;
//   }
// };

// // 2. Search movies with different types
// export const searchMovies = async (
//   query: string, 
//   type: 'all' | 'title' | 'plot' | 'cast' | 'director' = 'all',
//   page: number = 1
// ) => {
//   try {
//     const params = new URLSearchParams({
//       q: query,
//       type,
//       page: page.toString(),
//       limit: '12'
//     });

//     const response = await fetch(`/api/movies/search?${params}`);
//     const data = await response.json();
    
//     return data;
//   } catch (error) {
//     console.error('Error searching movies:', error);
//     throw error;
//   }
// };

// // 3. Get movie statistics
// export const getMovieStats = async () => {
//   try {
//     const response = await fetch('/api/movies/stats');
//     const data = await response.json();
    
//     if (data.success) {
//       return data.data; // MovieStats
//     } else {
//       throw new Error(data.error);
//     }
//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     throw error;
//   }
// };

// // 4. Get recommendations based on a movie
// export const getRecommendations = async (movieId: string) => {
//   try {
//     const response = await fetch('/api/movies/recommendations', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         movieId,
//         limit: 10,
//         minRating: 6.0
//       })
//     });
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching recommendations:', error);
//     throw error;
//   }
// };

// // 5. Get recommendations by genre
// export const getGenreRecommendations = async (genres: string[]) => {
//   try {
//     const response = await fetch('/api/movies/recommendations', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         genres,
//         limit: 15,
//         minRating: 7.0,
//         excludeWatched: [] // Add watched movie IDs here
//       })
//     });
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching genre recommendations:', error);
//     throw error;
//   }
// };

// // 6. Advanced movie filtering
// export const getFilteredMovies = async (filters: {
//   genre?: string;
//   year?: number;
//   minRating?: number;
//   maxRuntime?: number;
//   country?: string;
//   director?: string;
//   sort?: string;
//   order?: string;
//   page?: number;
// }) => {
//   try {
//     const params = new URLSearchParams();
    
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value !== undefined && value !== null && value !== '') {
//         params.append(key, value.toString());
//       }
//     });
    
//     params.append('limit', '20');

//     const response = await fetch(`/api/movies?${params}`);
//     const data = await response.json();
    
//     return data;
//   } catch (error) {
//     console.error('Error fetching filtered movies:', error);
//     throw error;
//   }
// };

// // 7. Update movie (PATCH)
// export const updateMovie = async (id: string, updates: any) => {
//   try {
//     const response = await fetch(`/api/movies/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updates)
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       return data.data;
//     } else {
//       throw new Error(data.error);
//     }
//   } catch (error) {
//     console.error('Error updating movie:', error);
//     throw error;
//   }
// };

// // Example React Hook for movie data
// import { useState, useEffect } from 'react';

// export const useMovieStats = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const data = await getMovieStats();
//         setStats(data);
//       } catch (err) {
//         // setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return { stats, loading, error };
// };

// // Example React Hook for search
// export const useMovieSearch = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const search = async (query: string, type: string = 'all') => {
//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       const data = await searchMovies(query, type as any);
      
//       if (data.success) {
//         setResults(data.data.movies);
//       } else {
//         setError(data.error);
//       }
//     } catch (err) {
//     //   setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { results, loading, error, search };
// };

// // Example usage in a React component
// export default function Movies() {
//   const { results, loading, error, search } = useMovieSearch();
//   const [query, setQuery] = useState('');

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     search(query);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search movies..."
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </form>

//       {error && <div className="error">Error: {error}</div>}
      
//       <div className="results">
//         {results.map((movie: any) => (
//           <div key={movie._id} className="movie-card">
//             <h3>{movie.title}</h3>
//             <p>{movie.year} • {movie.genres?.join(', ')}</p>
//             <p>Rating: {movie.imdb?.rating}/10</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };