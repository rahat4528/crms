import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Product } from '@/models/Products';
import Category from '@/models/Categories';
import mongoose from 'mongoose';

// GET - Fetch single product by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    // Check if the id is a valid ObjectId or treat it as a slug
    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }
    
    const product = await Product.findOne(query)
      .populate('category', 'name slug description')
      .populate('subcategory', 'name slug description')
      .lean() as { _id: string; category: string; [key: string]: any } | null;
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Fetch related products from the same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      status: 'active'
    })
      .populate('category', 'name slug')
      .limit(4)
      .lean();
    
    return NextResponse.json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}