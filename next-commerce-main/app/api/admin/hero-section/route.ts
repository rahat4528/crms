import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { HeroSection } from '@/models/ContentBlocks';

// GET - Fetch hero section
export async function GET() {
  try {
    await dbConnect();

    // Get the active hero section (there should only be one)
    const heroSection = await HeroSection.findOne({ isActive: true });
    
    return NextResponse.json({
      success: true,
      data: heroSection
    });
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero section' },
      { status: 500 }
    );
  }
}

// POST - Create new hero section
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.primaryButton?.text || !data.primaryButton?.url || !data.secondaryButton?.text || !data.secondaryButton?.url) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Deactivate any existing hero sections (we only want one active)
    await HeroSection.updateMany({}, { isActive: false });
    
    // Create new hero section
    const heroSection = new HeroSection({
      title: data.title,
      description: data.description,
      primaryButton: {
        text: data.primaryButton.text,
        url: data.primaryButton.url
      },
      secondaryButton: {
        text: data.secondaryButton.text,
        url: data.secondaryButton.url
      },
      backgroundImage: data.backgroundImage || '',
      isActive: true // New hero section is always active
    });

    const savedHeroSection = await heroSection.save();
    
    return NextResponse.json({
      success: true,
      data: savedHeroSection
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating hero section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create hero section' },
      { status: 500 }
    );
  }
}

// PUT - Update existing hero section
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.primaryButton?.text || !data.primaryButton?.url || !data.secondaryButton?.text || !data.secondaryButton?.url) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find and update the active hero section
    const updatedHeroSection = await HeroSection.findOneAndUpdate(
      { isActive: true },
      {
        title: data.title,
        description: data.description,
        primaryButton: {
          text: data.primaryButton.text,
          url: data.primaryButton.url
        },
        secondaryButton: {
          text: data.secondaryButton.text,
          url: data.secondaryButton.url
        },
        backgroundImage: data.backgroundImage || '',
        isActive: data.isActive !== undefined ? data.isActive : true
      },
      { new: true, upsert: true }
    );
    
    return NextResponse.json({
      success: true,
      data: updatedHeroSection
    });
  } catch (error) {
    console.error('Error updating hero section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update hero section' },
      { status: 500 }
    );
  }
}

// DELETE - Delete hero section
export async function DELETE() {
  try {
    await dbConnect();

    const deletedHeroSection = await HeroSection.findOneAndDelete({ isActive: true });
    
    if (!deletedHeroSection) {
      return NextResponse.json(
        { success: false, error: 'Hero section not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Hero section deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting hero section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete hero section' },
      { status: 500 }
    );
  }
}