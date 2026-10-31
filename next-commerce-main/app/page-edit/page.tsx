'use client';

import { useState, useEffect } from 'react';

interface HeroSection {
  _id?: string;
  title: string;
  description: string;
  primaryButton: {
    text: string;
    url: string;
  };
  secondaryButton: {
    text: string;
    url: string;
  };
  backgroundImage?: string;
  isActive: boolean;
}

interface ProductSection {
  _id?: string;
  name: string;
  slug: string;
  title: string;
  description?: string;
  type: string;
  productSelection: {
    method: 'manual' | 'automatic';
    productIds: string[];
    criteria: {
      category?: string;
      tags: string[];
      sortBy: string;
      limit: number;
    };
  };
  displaySettings: {
    showTitle: boolean;
    showDescription: boolean;
    showPrice: boolean;
    showRating: boolean;
    layout: 'grid' | 'carousel';
    itemsPerRow: number;
  };
  sortOrder: number;
  isActive: boolean;
}

export default function ContentSectionsAdmin() {
  const [heroSection, setHeroSection] = useState<HeroSection | null>(null);
  const [productSections, setProductSections] = useState<ProductSection[]>([]);
  const [activeTab, setActiveTab] = useState<'hero' | 'products'>('hero');
  const [editingSection, setEditingSection] = useState<ProductSection | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [heroRes, sectionsRes] = await Promise.all([
        fetch('/api/admin/hero-section'),
        fetch('/api/admin/product-sections')
      ]);

      const heroData = await heroRes.json();
      const sectionsData = await sectionsRes.json();

      if (heroData.success) setHeroSection(heroData.data);
      if (sectionsData.success) setProductSections(sectionsData.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveHeroSection = async (data: HeroSection) => {
    try {
      const method = heroSection?._id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/hero-section', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        setHeroSection(result.data);
        alert('Hero section saved successfully!');
      }
    } catch (error) {
      console.error('Error saving hero section:', error);
      alert('Error saving hero section');
    }
  };

  const saveProductSection = async (data: ProductSection) => {
    try {
      const method = data._id ? 'PUT' : 'POST';
      const url = data._id ? `/api/admin/product-sections/${data._id}` : '/api/admin/product-sections';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        loadData();
        setEditingSection(null);
        setShowProductForm(false);
        alert('Product section saved successfully!');
      }
    } catch (error) {
      console.error('Error saving product section:', error);
      alert('Error saving product section');
    }
  };

  const deleteProductSection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    try {
      const response = await fetch(`/api/admin/product-sections/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        loadData();
        alert('Section deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      alert('Error deleting section');
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Content Sections Management</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'hero' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'products' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Product Sections
          </button>
        </div>

        {/* Hero Section Tab */}
        {activeTab === 'hero' && (
          <HeroSectionForm 
            heroSection={heroSection} 
            onSave={saveHeroSection} 
          />
        )}

        {/* Product Sections Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Product Sections</h2>
              <button
                onClick={() => {
                  setEditingSection(null);
                  setShowProductForm(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add New Section
              </button>
            </div>

            {showProductForm && (
              <ProductSectionForm
                section={editingSection}
                onSave={saveProductSection}
                onCancel={() => {
                  setShowProductForm(false);
                  setEditingSection(null);
                }}
              />
            )}

            <ProductSectionsList
              sections={productSections}
              onEdit={(section) => {
                setEditingSection(section);
                setShowProductForm(true);
              }}
              onDelete={deleteProductSection}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Hero Section Form Component
function HeroSectionForm({ heroSection, onSave }: { 
  heroSection: HeroSection | null; 
  onSave: (data: HeroSection) => void; 
}) {
  const [formData, setFormData] = useState<HeroSection>({
    title: '',
    description: '',
    primaryButton: { text: '', url: '' },
    secondaryButton: { text: '', url: '' },
    backgroundImage: '',
    isActive: true,
    ...heroSection
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Background Image URL</label>
          <input
            type="url"
            value={formData.backgroundImage}
            onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-3 border rounded-lg h-24"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="font-medium mb-2">Primary Button</h3>
          <input
            type="text"
            placeholder="Button Text"
            value={formData.primaryButton.text}
            onChange={(e) => setFormData({
              ...formData,
              primaryButton: { ...formData.primaryButton, text: e.target.value }
            })}
            className="w-full p-3 border rounded-lg mb-2"
            required
          />
          <input
            type="url"
            placeholder="Button URL"
            value={formData.primaryButton.url}
            onChange={(e) => setFormData({
              ...formData,
              primaryButton: { ...formData.primaryButton, url: e.target.value }
            })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <h3 className="font-medium mb-2">Secondary Button</h3>
          <input
            type="text"
            placeholder="Button Text"
            value={formData.secondaryButton.text}
            onChange={(e) => setFormData({
              ...formData,
              secondaryButton: { ...formData.secondaryButton, text: e.target.value }
            })}
            className="w-full p-3 border rounded-lg mb-2"
            required
          />
          <input
            type="url"
            placeholder="Button URL"
            value={formData.secondaryButton.url}
            onChange={(e) => setFormData({
              ...formData,
              secondaryButton: { ...formData.secondaryButton, url: e.target.value }
            })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="mr-2"
          />
          Active
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Hero Section
        </button>
      </div>
    </form>
  );
}

// Product Section Form Component
function ProductSectionForm({ 
  section, 
  onSave, 
  onCancel 
}: { 
  section: ProductSection | null; 
  onSave: (data: ProductSection) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState<ProductSection>({
    name: '',
    slug: '',
    title: '',
    description: '',
    type: 'featured',
    productSelection: {
      method: 'automatic',
      productIds: [],
      criteria: {
        tags: [],
        sortBy: 'newest',
        limit: 8
      }
    },
    displaySettings: {
      showTitle: true,
      showDescription: true,
      showPrice: true,
      showRating: true,
      layout: 'grid',
      itemsPerRow: 4
    },
    sortOrder: 0,
    isActive: true,
    ...section
  });

  const sectionTypes = [
    { value: 'featured', label: 'Featured Products' },
    { value: 'new-arrivals', label: 'New Arrivals' },
    { value: 'best-sellers', label: 'Best Sellers' },
    { value: 'on-sale', label: 'On Sale' },
    { value: 'trending', label: 'Trending' },
    { value: 'recommended', label: 'Recommended' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'sales', label: 'Best Selling' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {section ? 'Edit Product Section' : 'Add New Product Section'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Section Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Section Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            >
              {sectionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Display Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort Order</label>
            <input
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg h-20"
          />
        </div>

        {/* Product Selection Settings */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Product Selection</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Selection Method</label>
              <select
                value={formData.productSelection.method}
                onChange={(e) => setFormData({
                  ...formData,
                  productSelection: {
                    ...formData.productSelection,
                    method: e.target.value as 'manual' | 'automatic'
                  }
                })}
                className="w-full p-2 border rounded"
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual Selection</option>
              </select>
            </div>

            {formData.productSelection.method === 'automatic' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    value={formData.productSelection.criteria.sortBy}
                    onChange={(e) => setFormData({
                      ...formData,
                      productSelection: {
                        ...formData.productSelection,
                        criteria: {
                          ...formData.productSelection.criteria,
                          sortBy: e.target.value
                        }
                      }
                    })}
                    className="w-full p-2 border rounded"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Limit</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.productSelection.criteria.limit}
                    onChange={(e) => setFormData({
                      ...formData,
                      productSelection: {
                        ...formData.productSelection,
                        criteria: {
                          ...formData.productSelection.criteria,
                          limit: parseInt(e.target.value)
                        }
                      }
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </>
            )}
          </div>

          {/* Manual Product Selection */}
          {formData.productSelection.method === 'manual' && (
            <div className="mt-4">
              <ManualProductSelector
                selectedProductIds={formData.productSelection.productIds}
                onChange={(productIds) => setFormData({
                  ...formData,
                  productSelection: {
                    ...formData.productSelection,
                    productIds
                  }
                })}
              />
            </div>
          )}

          {/* Automatic Selection Filters */}
          {formData.productSelection.method === 'automatic' && (
            <div className="mt-4">
              <h5 className="font-medium mb-3">Filters (Optional)</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.productSelection.criteria.category || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      productSelection: {
                        ...formData.productSelection,
                        criteria: {
                          ...formData.productSelection.criteria,
                          category: e.target.value || undefined
                        }
                      }
                    })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">All Categories</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.productSelection.criteria.tags.join(', ')}
                    onChange={(e) => setFormData({
                      ...formData,
                      productSelection: {
                        ...formData.productSelection,
                        criteria: {
                          ...formData.productSelection.criteria,
                          tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                        }
                      }
                    })}
                    placeholder="e.g. summer, sale, new"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Display Settings */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Display Settings</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.displaySettings.showTitle}
                onChange={(e) => setFormData({
                  ...formData,
                  displaySettings: {
                    ...formData.displaySettings,
                    showTitle: e.target.checked
                  }
                })}
                className="mr-2"
              />
              Show Title
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.displaySettings.showPrice}
                onChange={(e) => setFormData({
                  ...formData,
                  displaySettings: {
                    ...formData.displaySettings,
                    showPrice: e.target.checked
                  }
                })}
                className="mr-2"
              />
              Show Price
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.displaySettings.showRating}
                onChange={(e) => setFormData({
                  ...formData,
                  displaySettings: {
                    ...formData.displaySettings,
                    showRating: e.target.checked
                  }
                })}
                className="mr-2"
              />
              Show Rating
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2"
              />
              Active
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Layout</label>
              <select
                value={formData.displaySettings.layout}
                onChange={(e) => setFormData({
                  ...formData,
                  displaySettings: {
                    ...formData.displaySettings,
                    layout: e.target.value as 'grid' | 'carousel'
                  }
                })}
                className="w-full p-2 border rounded"
              >
                <option value="grid">Grid</option>
                <option value="carousel">Carousel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Items Per Row</label>
              <select
                value={formData.displaySettings.itemsPerRow}
                onChange={(e) => setFormData({
                  ...formData,
                  displaySettings: {
                    ...formData.displaySettings,
                    itemsPerRow: parseInt(e.target.value)
                  }
                })}
                className="w-full p-2 border rounded"
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Section
          </button>
        </div>
      </form>
    </div>
  );
}

// Product Sections List Component
function ProductSectionsList({ 
  sections, 
  onEdit, 
  onDelete 
}: { 
  sections: ProductSection[]; 
  onEdit: (section: ProductSection) => void; 
  onDelete: (id: string) => void; 
}) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section._id} className="bg-white p-4 rounded-lg shadow border">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-lg">{section.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  section.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {section.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-2">
                Type: <span className="font-medium">{section.type}</span> | 
                Layout: <span className="font-medium">{section.displaySettings.layout}</span> | 
                Limit: <span className="font-medium">{section.productSelection.criteria.limit}</span>
              </p>
              
              {section.description && (
                <p className="text-gray-700 text-sm">{section.description}</p>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(section)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Edit
              </button>
              <button
                onClick={() => section._id && onDelete(section._id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {sections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No product sections created yet. Click "Add New Section" to get started.
        </div>
      )}
    </div>
  );
}

// Manual Product Selector Component
function ManualProductSelector({ 
  selectedProductIds, 
  onChange 
}: { 
  selectedProductIds: string[]; 
  onChange: (productIds: string[]) => void; 
}) {
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock products for demo - replace with real API call
  const mockProducts = [
    { _id: '65f1a2b3c4d5e6f7a8b9c0d1', name: 'Silk Midi Dress', price: 299, category: 'Women' },
    { _id: '65f1a2b3c4d5e6f7a8b9c0d2', name: 'Cashmere Sweater', price: 189, category: 'Women' },
    { _id: '65f1a2b3c4d5e6f7a8b9c0d3', name: 'Leather Loafers', price: 249, category: 'Men' },
    { _id: '65f1a2b3c4d5e6f7a8b9c0d4', name: 'Wool Blazer', price: 349, category: 'Men' },
    { _id: '65f1a2b3c4d5e6f7a8b9c0d5', name: 'Designer Handbag', price: 599, category: 'Accessories' },
    { _id: '65f1a2b3c4d5e6f7a8b9c0d6', name: 'Minimalist Watch', price: 199, category: 'Accessories' },
  ];

  useEffect(() => {
    // In a real app, fetch products from API
    setAvailableProducts(mockProducts);
  }, []);

  const handleProductToggle = (productId: string) => {
    const isSelected = selectedProductIds.includes(productId);
    if (isSelected) {
      onChange(selectedProductIds.filter(id => id !== productId));
    } else {
      onChange([...selectedProductIds, productId]);
    }
  };

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Select Products Manually</label>
      
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Selected Products Count */}
      <div className="mb-3 text-sm text-gray-600">
        {selectedProductIds.length} product(s) selected
      </div>

      {/* Products List */}
      <div className="max-h-60 overflow-y-auto border rounded p-3 bg-white">
        {filteredProducts.map((product) => {
          const isSelected = selectedProductIds.includes(product._id);
          return (
            <label key={product._id} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleProductToggle(product._id)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">
                  {product.category} • ${product.price}
                </div>
              </div>
            </label>
          );
        })}
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}