import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import PageSection from '@/models/PageSections';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title, description, sortOrder = 0, products = [] } = body ?? {};

    if (!title || !description) {
      return NextResponse.json({ error: 'title and description are required' }, { status: 400 });
    }

    const existing = await PageSection.findOne({ title }).lean();
    if (existing) {
      return NextResponse.json({ error: 'A page section with this title already exists' }, { status: 409 });
    }

    const created = await PageSection.create({
      title,
      description,
      sortOrder,
      products,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ error: 'Duplicate key error' }, { status: 409 });
    }
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}