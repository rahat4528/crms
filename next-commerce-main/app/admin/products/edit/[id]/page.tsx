'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory?: string;
}

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  tags: string[];
  inventory: number;
  status: 'draft' | 'active' | 'inactive' | 'out-of-stock';
  featured: boolean;
  isNew: boolean;
  isSale: boolean;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  specifications: Array<{
    name: string;
    value: string;
  }>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: 0,
    originalPrice: 0,
    category: '',
    subcategory: '',
    images: [{ url: '', alt: '', isPrimary: true }],
    tags: [],
    inventory: 0,
    status: 'draft',
    featured: false,
    isNew: false,
    isSale: false,
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    specifications: [{ name: '', value: '' }],
    seo: {
      title: '',
      description: '',
      keywords: []
    }
  });

  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [productId]);

  useEffect(() => {
    if (formData.category) {
      loadSubcategories(formData.category);
    } else {
      setSubcategories([]);
    }
  }, [formData.category]);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories?active=true&parent=null');
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadSubcategories = async (parentId: string) => {
    try {
      const response = await fetch(`/api/categories?active=true&parent=${parentId}`);
      const result = await response.json();
      if (result.success) {
        setSubcategories(result.data);
      }
    } catch (error) {
      console.error('Error loading subcategories:', error);
    }
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/products/${productId}`);
      const result = await response.json();

      if (result.success) {
        const product = result.data;
        setFormData({
          name: product.name,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription || '',
          price: product.price,
          originalPrice: product.originalPrice || 0,
          category: product.category._id || product.category,
          subcategory: product.subcategory?._id || product.subcategory || '',
          images: product.images.length > 0 ? product.images : [{ url: '', alt: '', isPrimary: true }],
          tags: product.tags || [],
          inventory: product.inventory,
          status: product.status,
          featured: product.featured,
          isNew: product.isNew,
          isSale: product.isSale,
          weight: product.weight || 0,
          dimensions: product.dimensions || { length: 0, width: 0, height: 0 },
          specifications: product.specifications.length > 0 ? product.specifications : [{ name: '', value: '' }],
          seo: {
            title: product.seo?.title || '',
            description: product.seo?.description || '',
            keywords: product.seo?.keywords || []
          }
        });
      } else {
        alert('Product not found');
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      alert('Error loading product');
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', alt: '', isPrimary: false }]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImage = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seo.keywords.includes(newKeyword.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, newKeyword.trim().toLowerCase()]
        }
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter(keyword => keyword !== keywordToRemove)
      }
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const updateSpecification = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        alert('Product updated successfully!');
        router.push('/admin/products');
      } else {
        alert('Error updating product: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-gray-600 mt-1">Update product information</p>
        </div>
        <Link
          href="/admin/products"
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to Products
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border rounded-lg h-32"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              className="w-full p-3 border rounded-lg h-20"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Original Price (for sales)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, subcategory: '' }))}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subcategory</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="w-full p-3 border rounded-lg"
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map(subcategory => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          
          {formData.images.map((image, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Image {index + 1}</h3>
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL *</label>
                  <input
                    type="url"
                    value={image.url}
                    onChange={(e) => updateImage(index, 'url', e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => updateImage(index, 'alt', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={image.isPrimary}
                    onChange={(e) => updateImage(index, 'isPrimary', e.target.checked)}
                    className="mr-2"
                  />
                  Primary Image
                </label>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addImage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Another Image
          </button>
        </div>

        {/* Inventory & Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Inventory & Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Inventory Count *</label>
              <input
                type="number"
                min="0"
                value={formData.inventory}
                onChange={(e) => setFormData(prev => ({ ...prev, inventory: parseInt(e.target.value) }))}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full p-3 border rounded-lg"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="mr-2"
              />
              Featured Product
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
                className="mr-2"
              />
              New Product
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isSale}
                onChange={(e) => setFormData(prev => ({ ...prev, isSale: e.target.checked }))}
                className="mr-2"
              />
              On Sale
            </label>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/products"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Updating Product...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
}