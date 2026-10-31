import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Product } from '@/models/Products';
import Category from '@/models/Categories';

// GET - Fetch products for admin (includes all statuses)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50);
    const sortBy = searchParams.get('sortBy') || 'newest';
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const isNew = searchParams.get('isNew');
    const isSale = searchParams.get('isSale');

    const filter: any = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (isNew === 'true') filter.isNew = true;
    if (isSale === 'true') filter.isSale = true;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let sort: any = { createdAt: -1 };
    switch (sortBy) {
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'name':
        sort = { name: 1 };
        break;
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
    }

    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
      Product.find(filter)
        .populate({ path: 'category', model: 'Category', select: 'name slug' })
        .populate({ path: 'subcategory', model: 'Category', select: 'name slug' })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products (admin):', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const payload: any = await request.json();

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    if (!payload.name || !String(payload.name).trim()) {
      return NextResponse.json({ success: false, error: 'Missing required field: name' }, { status: 400 });
    }

    if (!payload.description || !String(payload.description).trim()) {
      return NextResponse.json({ success: false, error: 'Missing required field: description' }, { status: 400 });
    }

    if (payload.price === undefined || payload.price === null || isNaN(Number(payload.price)) || Number(payload.price) < 0) {
      return NextResponse.json({ success: false, error: 'Missing or invalid required field: price (must be >= 0)' }, { status: 400 });
    }

    if (!payload.category || !String(payload.category).trim()) {
      return NextResponse.json({ success: false, error: 'Missing required field: category' }, { status: 400 });
    }

    // Verify category exists
    const categoryExists = await Category.findById(String(payload.category)).lean();
    if (!categoryExists) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 400 });
    }

    // If subcategory provided, verify it exists
    if (payload.subcategory) {
      const subExists = await Category.findById(String(payload.subcategory)).lean();
      if (!subExists) {
        return NextResponse.json({ success: false, error: 'Subcategory not found' }, { status: 400 });
      }
    }

    // Normalize images
    let images: any[] = [];
    if (Array.isArray(payload.images)) {
      images = payload.images
        .map((img: any) => ({
          url: img?.url ? String(img.url).trim() : '',
          alt: img?.alt ? String(img.alt).trim() : '',
          isPrimary: Boolean(img?.isPrimary)
        }))
        .filter((img: any) => !!img.url);
    }

    if (images.length === 0) {
      return NextResponse.json({ success: false, error: 'At least one image with a valid url is required' }, { status: 400 });
    }

    // Ensure one primary image
    const primaryIndex = images.findIndex((img: any) => img.isPrimary);
    images = images.map((img: any, i: number) => ({ ...img, isPrimary: i === (primaryIndex >= 0 ? primaryIndex : 0) }));

    // Tags
    const tags: string[] = Array.isArray(payload.tags)
      ? Array.from(new Set(payload.tags.map((t: any) => String(t).trim().toLowerCase()).filter(Boolean)))
      : [];

    // SEO keywords
    const seoKeywords: string[] = Array.isArray(payload.seo?.keywords)
      ? Array.from(new Set(payload.seo.keywords.map((k: any) => String(k).trim().toLowerCase()).filter(Boolean)))
      : [];

    // Specifications
    const specifications: any[] = Array.isArray(payload.specifications)
      ? payload.specifications
          .map((s: any) => ({ name: s?.name ? String(s.name).trim() : '', value: s?.value ? String(s.value).trim() : '' }))
          .filter((s: any) => s.name && s.value)
      : [];

    // Variants
    let parsedVariants: any[] = [];
    if (Array.isArray(payload.variants)) {
      parsedVariants = payload.variants
        .map((v: any) => ({
          name: v?.name ? String(v.name).trim() : '',
          size: v?.size ? String(v.size).trim() : '',
          color: v?.color ? String(v.color).trim() : '',
          sku: v?.sku ? String(v.sku).trim() : undefined,
          price: v?.price !== undefined && v?.price !== null ? Number(v.price) : undefined,
          originalPrice: v?.originalPrice !== undefined && v?.originalPrice !== null ? Number(v.originalPrice) : undefined,
          inventory: v?.inventory !== undefined && v?.inventory !== null ? Number(v.inventory) : 0,
          isActive: v?.isActive === undefined ? true : Boolean(v.isActive)
        }))
        .filter((v: any) => v.name && v.price !== undefined && !isNaN(v.price) && v.price >= 0 && v.inventory >= 0);
    }

    // Inventory calculation
    const inventory = parsedVariants.length > 0
      ? parsedVariants.reduce((sum, v) => sum + (Number(v.inventory) || 0), 0)
      : (payload.inventory !== undefined && payload.inventory !== null ? Number(payload.inventory) : 0);

    // Slug generation and uniqueness
    let slug = payload.slug && String(payload.slug).trim() ? String(payload.slug).trim().toLowerCase() : '';
    if (!slug) {
      slug = String(payload.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    const slugCollision = await Product.findOne({ slug }).lean();
    if (slugCollision) slug = `${slug}-${Date.now()}`;

    const price = Number(payload.price);
    const originalPrice = payload.originalPrice !== undefined && payload.originalPrice !== null ? Number(payload.originalPrice) : undefined;
    const weight = payload.weight !== undefined && payload.weight !== null ? Number(payload.weight) : undefined;
    const dimensions = {
      length: payload.dimensions?.length !== undefined && payload.dimensions?.length !== null ? Number(payload.dimensions.length) : undefined,
      width: payload.dimensions?.width !== undefined && payload.dimensions?.width !== null ? Number(payload.dimensions.width) : undefined,
      height: payload.dimensions?.height !== undefined && payload.dimensions?.height !== null ? Number(payload.dimensions.height) : undefined
    };

    const allowedStatuses = ['draft', 'active', 'inactive', 'out-of-stock'];
    const status = allowedStatuses.includes(payload.status) ? payload.status : 'draft';

    const productData: any = {
      name: String(payload.name).trim(),
      slug,
      description: String(payload.description).trim(),
      shortDescription: payload.shortDescription ? String(payload.shortDescription).trim() : undefined,
      images,
      category: String(payload.category),
      subcategory: payload.subcategory ? String(payload.subcategory) : undefined,
      price,
      originalPrice,
      tags,
      specifications,
      inventory,
      status,
      featured: Boolean(payload.featured),
      isNew: Boolean(payload.isNew),
      isSale: Boolean(payload.isSale),
      weight,
      dimensions,
      seo: {
        title: payload.seo?.title ? String(payload.seo.title).trim() : String(payload.name).trim(),
        description: payload.seo?.description ? String(payload.seo.description).trim() : (String(payload.shortDescription || payload.description).substring(0, 160)),
        keywords: seoKeywords
      }
    };

    if (parsedVariants.length > 0) productData.variants = parsedVariants;

    if (productData.inventory === undefined || productData.inventory === null) productData.inventory = 0;
    if (productData.price === undefined || productData.price === null) productData.price = 0;

    const product = new Product(productData);
    const saved = await product.save();

    const populated = await Product.findById(saved._id)
      .populate({ path: 'category', model: 'Category', select: 'name slug' })
      .populate({ path: 'subcategory', model: 'Category', select: 'name slug' })
      .lean();

    return NextResponse.json({ success: true, data: populated }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating product:', err);
    if (err?.code === 11000) {
      return NextResponse.json({ success: false, error: 'Duplicate key error (possible slug collision)' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}