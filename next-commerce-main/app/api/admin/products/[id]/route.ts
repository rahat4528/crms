import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Product } from '@/models/Products';
import Category from '@/models/Categories';
import mongoose from 'mongoose';

// GET - Fetch single product by ID (admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    const product = await Product.findById(id)
      .populate({ path: 'category', model: 'Category', select: 'name slug' })
      .populate({ path: 'subcategory', model: 'Category', select: 'name slug' })
      .lean();
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - Update product completely
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const data = await request.json();
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!data.name || !data.description || !data.price || !data.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, description, price, category' },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current product)
    if (data.slug) {
      const existingProduct = await Product.findOne({ 
        slug: data.slug, 
        _id: { $ne: id } 
      });
      
      if (existingProduct) {
        return NextResponse.json(
          { success: false, error: 'A product with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Ensure at least one image has isPrimary set
    if (data.images && data.images.length > 0) {
      const hasPrimary = data.images.some((img: any) => img.isPrimary);
      if (!hasPrimary) {
        data.images[0].isPrimary = true;
      }
    }

    // Filter out empty specifications
    if (data.specifications) {
      data.specifications = data.specifications.filter(
        (spec: any) => spec.name?.trim() && spec.value?.trim()
      );
    }

    // Prepare update data
    const updateData: any = {
      ...data,
      tags: data.tags?.map((tag: string) => tag.toLowerCase()) || [],
      seo: {
        title: data.seo?.title || data.name,
        description: data.seo?.description || data.shortDescription || data.description.substring(0, 160),
        keywords: data.seo?.keywords || []
      },
      updatedAt: new Date()
    };

    // Only add variants if we have valid ones with SKUs
    if (data.variants && Array.isArray(data.variants)) {
      const validVariants = data.variants.filter((variant: any) => 
        variant.name?.trim() && variant.price > 0 && variant.sku?.trim()
      );
      if (validVariants.length > 0) {
        updateData.variants = validVariants;
      } else {
        // Explicitly set to empty array if no valid variants
        updateData.variants = [];
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate({ path: 'category', model: 'Category', select: 'name slug' })
      .populate({ path: 'subcategory', model: 'Category', select: 'name slug' });
    
    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    if ((error as any).code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Product with this slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// PATCH - Partial update (for quick status/flag changes)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const data = await request.json();
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Only allow specific fields for PATCH
    const allowedFields = ['status', 'featured', 'isNew', 'isSale', 'inventory'];
    const updateData: any = { updatedAt: new Date() };
    
    for (const field of allowedFields) {
      if (data.hasOwnProperty(field)) {
        updateData[field] = data[field];
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate({ path: 'category', model: 'Category', select: 'name slug' })
      .populate({ path: 'subcategory', model: 'Category', select: 'name slug' });
    
    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}