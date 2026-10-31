import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Product } from '@/models/Products';
import Category from '@/models/Categories';

// GET - Fetch products with filtering, sorting, and pagination
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '12'), 50);
    const sortBy = searchParams.get('sortBy') || 'newest';
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const featured = searchParams.get('featured');
    const isNew = searchParams.get('isNew');
    const isSale = searchParams.get('isSale');
    const status = searchParams.get('status') || 'active';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const tags = searchParams.get('tags');
    
    // Build filter object
    const filter: any = {};
    
    // Status filter (default to active)
    if (status) {
      filter.status = status;
    }
    
    // Category filters
    if (category) {
      filter.category = category;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    
    // Boolean filters
    if (featured === 'true') {
      filter.featured = true;
    }
    if (isNew === 'true') {
      filter.isNew = true;
    }
    if (isSale === 'true') {
      filter.isSale = true;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    // Search filter
    if (search) {
      filter.$text = { $search: search };
    }
    
    // Tags filter
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      filter.tags = { $in: tagArray };
    }
    
    // Build sort object
    let sort: any = {};
    switch (sortBy) {
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { 'rating.average': -1 };
        break;
      case 'popularity':
        sort = { 'sales.count': -1 };
        break;
      case 'sales':
        sort = { 'sales.count': -1 };
        break;
      case 'name':
        sort = { name: 1 };
        break;
      default:
        sort = { createdAt: -1 };
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query with population
    const [products, totalCount] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage
      },
      filters: {
        sortBy,
        category,
        subcategory,
        featured,
        isNew,
        isSale,
        status,
        minPrice,
        maxPrice,
        search,
        tags
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}