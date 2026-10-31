'use client';

import { useState } from 'react';

interface CategoryData {
  name: string;
  slug: string;
  description: string;
  image: string;
  parentCategory: string;
  isActive: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
}

export default function DataEntryPage() {
  const [formData, setFormData] = useState<CategoryData>({
    name: '',
    slug: '',
    description: '',
    image: '',
    parentCategory: '',
    isActive: true,
    sortOrder: 0,
    seoTitle: '',
    seoDescription: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/categories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Category created successfully!');
        setFormData({
          name: '',
          slug: '',
          description: '',
          image: '',
          parentCategory: '',
          isActive: true,
          sortOrder: 0,
          seoTitle: '',
          seoDescription: ''
        });
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setMessage('Failed to create category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addSampleData = () => {
    const sampleCategories = [
      {
        name: 'Electronics',
        description: 'Latest gadgets and electronic devices',
        image: 'https://example.com/electronics.jpg',
        sortOrder: 1,
        seoTitle: 'Electronics - Latest Gadgets & Devices',
        seoDescription: 'Shop the latest electronics, gadgets, and tech devices at great prices.'
      },
      {
        name: 'Clothing',
        description: 'Fashion and apparel for all ages',
        image: 'https://example.com/clothing.jpg',
        sortOrder: 2,
        seoTitle: 'Clothing & Fashion - Trendy Apparel',
        seoDescription: 'Discover trendy clothing and fashion items for men, women, and kids.'
      },
      {
        name: 'Home & Garden',
        description: 'Everything for your home and garden',
        image: 'https://example.com/home-garden.jpg',
        sortOrder: 3,
        seoTitle: 'Home & Garden - Decor & Tools',
        seoDescription: 'Transform your home and garden with our wide selection of decor and tools.'
      }
    ];

    return sampleCategories;
  };

  const loadSampleData = (index: number) => {
    const samples = addSampleData();
    const sample = samples[index];
    setFormData({
      ...sample,
      slug: generateSlug(sample.name),
      parentCategory: '',
      isActive: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Category</h1>

          {/* Sample Data Buttons */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Quick Fill Sample Data:</p>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => loadSampleData(0)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
              >
                Electronics
              </button>
              <button
                type="button"
                onClick={() => loadSampleData(1)}
                className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200"
              >
                Clothing
              </button>
              <button
                type="button"
                onClick={() => loadSampleData(2)}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm hover:bg-purple-200"
              >
                Home & Garden
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Category Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                URL Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-generated from name, but you can edit it</p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              />
            </div>

            {/* Parent Category */}
            <div>
              <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">
                Parent Category ID (Optional)
              </label>
              <input
                type="text"
                id="parentCategory"
                name="parentCategory"
                value={formData.parentCategory}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for top-level category</p>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
                Sort Order
              </label>
              <input
                type="number"
                id="sortOrder"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleInputChange}
                min="0"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              />
            </div>

            {/* SEO Title */}
            <div>
              <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700">
                SEO Title
              </label>
              <input
                type="text"
                id="seoTitle"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              />
            </div>

            {/* SEO Description */}
            <div>
              <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700">
                SEO Description
              </label>
              <textarea
                id="seoDescription"
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleInputChange}
                rows={2}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              />
            </div>

            {/* Is Active */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Category is active
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Category'}
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}