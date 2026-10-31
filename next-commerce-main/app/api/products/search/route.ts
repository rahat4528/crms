import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Product } from '@/models/Products';
import Category from '@/models/Categories';
import { FlattenMaps } from 'mongoose';

// GET - Search products
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 20);
    const category = searchParams.get('category');
    
    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Search query must be at least 2 characters long'
      }, { status: 400 });
    }
    
    // Build search filter
    const filter: any = {
      status: 'active',
      $text: { $search: query.trim() }
    };
    
    // Add category filter if provided
    if (category) {
      filter.category = category;
    }
    
    // Execute search query
    const products = await Product.find(filter, {
      score: { $meta: 'textScore' }
    })
      .populate('category', 'name slug')
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .lean();
    
    // Also search by name/description similarity if text search returns few results
    let additionalProducts: (FlattenMaps<any> & Required<{ _id: unknown; }> & { __v: number; })[] = [];
    if (products.length < limit) {
      const remainingLimit = limit - products.length;
      const existingIds = products.map(p => p._id);
      
      additionalProducts = await Product.find({
        status: 'active',
        _id: { $nin: existingIds },
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ],
        ...(category && { category })
      })
        .populate('category', 'name slug')
        .limit(remainingLimit)
        .lean();
    }
    
    const allProducts = [...products, ...additionalProducts];
    
    return NextResponse.json({
      success: true,
      data: allProducts,
      count: allProducts.length,
      query: query.trim()
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search products' },
      { status: 500 }
    );
  }
}