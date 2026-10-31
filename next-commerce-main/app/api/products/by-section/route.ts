import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Product } from '@/models/Products';
import Category from '@/models/Categories';

// GET - Fetch products by section criteria
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const sectionType = searchParams.get('type');
    const limit = Math.min(parseInt(searchParams.get('limit') || '8'), 50);
    const sortBy = searchParams.get('sortBy') || 'newest';
    const category = searchParams.get('category');
    const tags = searchParams.get('tags');
    
    if (!sectionType) {
      return NextResponse.json({
        success: false,
        error: 'Section type is required'
      }, { status: 400 });
    }
    
    // Build base filter
    const filter: any = { status: 'active' };
    
    // Apply section type specific filters
    switch (sectionType) {
      case 'featured':
        filter.featured = true;
        break;
      case 'new-arrivals':
        filter.isNew = true;
        break;
      case 'best-sellers':
        // Products with high sales count
        filter['sales.count'] = { $gt: 0 };
        break;
      case 'on-sale':
        filter.isSale = true;
        break;
      case 'trending':
        // Products with good rating and recent sales
        filter['rating.average'] = { $gte: 4 };
        break;
      case 'recommended':
        // Products with high ratings
        filter['rating.average'] = { $gte: 4.5 };
        break;
    }
    
    // Apply additional filters
    if (category) {
      filter.category = category;
    }
    
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
      case 'sales':
        sort = { 'sales.count': -1 };
        break;
      default:
        // Default sort based on section type
        if (sectionType === 'best-sellers') {
          sort = { 'sales.count': -1 };
        } else if (sectionType === 'trending' || sectionType === 'recommended') {
          sort = { 'rating.average': -1 };
        } else {
          sort = { createdAt: -1 };
        }
    }
    
    // Execute query
    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .limit(limit)
      .lean();
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
      sectionType,
      filters: {
        sortBy,
        category,
        tags,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching products by section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products by section' },
      { status: 500 }
    );
  }
}