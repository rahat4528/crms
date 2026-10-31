import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import PageSection from '@/models/PageSections';

export async function GET(req: Request) {
  try {
    await dbConnect();

    // Force import Product model to ensure it's registered
    await import('@/models/Products');

    const url = new URL(req.url);
    const all = url.searchParams.get('all') === 'true';
    const page = Math.max(1, Number(url.searchParams.get('page') || 1));
    const limitParam = Number(url.searchParams.get('limit') || 50);
    const limit = Math.min(Math.max(1, Number.isFinite(limitParam) ? limitParam : 50), 200);
    const skip = (page - 1) * limit;

    const total = await PageSection.countDocuments();

    const query = PageSection.find()
      .populate('products')
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    if (!all) {
      query.skip(skip).limit(limit);
    }
    const data = await query.exec();

    return NextResponse.json({
      data,
      meta: {
        total,
        page: all ? 1 : page,
        limit: all ? total : limit,
        returned: data.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}