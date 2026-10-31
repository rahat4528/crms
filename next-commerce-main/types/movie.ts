export interface Movie {
  _id: string;
  plot?: string;
  genres?: string[];
  runtime?: number;
  cast?: string[];
  poster?: string;
  title: string;
  fullplot?: string;
  languages?: string[];
  released?: Date;
  directors?: string[];
  rated?: string;
  awards?: {
    wins?: number;
    nominations?: number;
    text?: string;
  };
  lastupdated?: string;
  year?: number;
  imdb?: {
    rating?: number;
    votes?: number;
    id?: number;
  };
  countries?: string[];
  type?: string;
  tomatoes?: {
    viewer?: {
      rating?: number;
      numReviews?: number;
      meter?: number;
    };
    fresh?: number;
    critic?: {
      rating?: number;
      numReviews?: number;
      meter?: number;
    };
    rotten?: number;
    lastUpdated?: Date;
  };
  num_mflix_comments?: number;
}

export interface MovieFilters {
  search?: string;
  genre?: string;
  year?: string | number;
  rated?: string;
  country?: string;
  director?: string;
  cast_member?: string;
  min_rating?: string | number;
  max_runtime?: string | number;
  sort?: 'year' | 'rating' | 'title' | 'runtime';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    current: number;
    pages: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}