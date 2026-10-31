import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Movie from '../../../models/Movie';
import { Movie as MovieType, ApiResponse } from '../../../types/movie';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const year = searchParams.get('year');
    const rated = searchParams.get('rated');
    const country = searchParams.get('country');
    const director = searchParams.get('director');
    const cast_member = searchParams.get('cast_member');
    const min_rating = searchParams.get('min_rating');
    const max_runtime = searchParams.get('max_runtime');
    const sort = searchParams.get('sort') || 'year';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');

    // Build filter object
    const filter: any = {};
    
    if (genre) {
      filter.genres = { $in: [new RegExp(genre, 'i')] };
    }
    
    if (year) {
      filter.year = parseInt(year);
    }
    
    if (rated) {
      filter.rated = rated;
    }
    
    if (country) {
      filter.countries = { $in: [new RegExp(country, 'i')] };
    }
    
    if (director) {
      filter.directors = { $in: [new RegExp(director, 'i')] };
    }
    
    if (cast_member) {
      filter.cast = { $in: [new RegExp(cast_member, 'i')] };
    }
    
    if (min_rating) {
      filter['imdb.rating'] = { $gte: parseFloat(min_rating) };
    }
    
    if (max_runtime) {
      filter.runtime = { $lte: parseInt(max_runtime) };
    }
    
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { plot: new RegExp(search, 'i') },
        { fullplot: new RegExp(search, 'i') }
      ];
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Sort object
    const sortOrder = order === 'desc' ? -1 : 1;
    let sortObj: any = {};
    
    switch (sort) {
      case 'rating':
        sortObj = { 'imdb.rating': sortOrder };
        break;
      case 'year':
        sortObj = { year: sortOrder };
        break;
      case 'title':
        sortObj = { title: sortOrder };
        break;
      case 'runtime':
        sortObj = { runtime: sortOrder };
        break;
      default:
        sortObj = { year: sortOrder };
    }

    // Fetch movies
    const movies = await Movie.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .select('-fullplot')
      .lean<MovieType[]>();

    // Get total count
    const total = await Movie.countDocuments(filter);

    const response: ApiResponse<MovieType[]> = {
      success: true,
      data: movies,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: skip + limit < total,
        hasPrev: page > 1
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorResponse: ApiResponse<MovieType[]> = {
      success: false,
      error: errorMessage
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }
}