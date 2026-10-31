import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Category from '@/models/Categories';
import dbConnect from '@/lib/mongoose';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      name,
      slug,
      description,
      image,
      parentCategory,
      isActive,
      sortOrder,
      seoTitle,
      seoDescription
    } = body;

    // Validation
    if (!name || !slug) {
      return NextResponse.json(
        { message: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if category with same name or slug already exists
    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug }]
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: 'Category with this name or slug already exists' },
        { status: 409 }
      );
    }

    // Create new category
    const categoryData = {
      _id: new mongoose.Types.ObjectId(),
      name,
      slug,
      description: description || '',
      image: image || '',
      parentCategory: parentCategory || null,
      isActive: isActive ?? true,
      sortOrder: sortOrder || 0,
      seoTitle: seoTitle || '',
      seoDescription: seoDescription || ''
    };

    const category = new Category(categoryData);
    const savedCategory = await category.save();

    // If this category has a parent, add it to parent's subcategories
    if (parentCategory) {
      await Category.findByIdAndUpdate(
        parentCategory,
        { $push: { subcategories: savedCategory._id } }
      );
    }

    return NextResponse.json(
      {
        message: 'Category created successfully',
        category: savedCategory
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating category:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find({ isActive: true })
      .populate('parentCategory', 'name slug')
      .populate('subcategories', 'name slug')
      .sort({ sortOrder: 1, name: 1 });

    return NextResponse.json({
      message: 'Categories retrieved successfully',
      categories
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}