// app/api/movies/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Movie from '../../../../models/Movie';
import { Movie as MovieType } from '../../../../types/movie';

interface SearchResults {
  movies: MovieType[];
  totalResults: number;
  searchTerm: string;
  suggestions?: string[];
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type') || 'all'; // 'title', 'plot', 'cast', 'director', 'all'

    if (!q.trim()) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Build search filter based on type
    let searchFilter: any = {};
    const searchRegex = new RegExp(q.trim(), 'i');

    switch (type) {
      case 'title':
        searchFilter = { title: searchRegex };
        break;
      case 'plot':
        searchFilter = { 
          $or: [
            { plot: searchRegex },
            { fullplot: searchRegex }
          ]
        };
        break;
      case 'cast':
        searchFilter = { cast: { $in: [searchRegex] } };
        break;
      case 'director':
        searchFilter = { directors: { $in: [searchRegex] } };
        break;
      case 'all':
      default:
        searchFilter = {
          $or: [
            { title: searchRegex },
            { plot: searchRegex },
            { fullplot: searchRegex },
            { cast: { $in: [searchRegex] } },
            { directors: { $in: [searchRegex] } },
            { genres: { $in: [searchRegex] } }
          ]
        };
    }

    // Execute search with pagination
    const [movies, totalResults] = await Promise.all([
      Movie.find(searchFilter)
        .select('-fullplot')
        .sort({ 'imdb.rating': -1, year: -1 })
        .skip(skip)
        .limit(limit)
        .lean<MovieType[]>(),
      Movie.countDocuments(searchFilter)
    ]);

    // Generate search suggestions if no results
    let suggestions: string[] = [];
    if (movies.length === 0) {
      const genreSuggestions = await Movie.distinct('genres', {
        genres: { $regex: q.trim(), $options: 'i' }
      });
      suggestions = genreSuggestions.slice(0, 5);
    }

    const searchResults: SearchResults = {
      movies,
      totalResults,
      searchTerm: q.trim(),
      ...(suggestions.length > 0 && { suggestions })
    };

    return NextResponse.json({
      success: true,
      data: searchResults,
      pagination: {
        current: page,
        pages: Math.ceil(totalResults / limit),
        total: totalResults,
        hasNext: skip + limit < totalResults,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}