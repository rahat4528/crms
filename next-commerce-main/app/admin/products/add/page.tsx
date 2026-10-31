'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  variants: Array<{
    name: string;
    size: string;
    color: string;
    sku: string;
    price: number;
    originalPrice: number;
    inventory: number;
    isActive: boolean;
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

export default function AddProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
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
    variants: [],
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
    loadCategories();
  }, []);

  useEffect(() => {
    if (formData.category) {
      loadSubcategories(formData.category);
    } else {
      setSubcategories([]);
    }
  }, [formData.category]);

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.name]);

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

  const updateImage = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => {
        if (i === index) return { ...img, [field]: value };
        if (field === 'isPrimary' && value === true) return { ...img, isPrimary: false };
        return img;
      })
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', alt: '', isPrimary: prev.images.length === 0 }]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const imgs = prev.images.filter((_, i) => i !== index);
      if (!imgs.some(img => img.isPrimary) && imgs.length > 0) imgs[0].isPrimary = true;
      return { ...prev, images: imgs };
    });
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    setFormData(prev => ({ ...prev, tags: Array.from(new Set([...prev.tags, newTag.trim().toLowerCase()])) }));
    setNewTag('');
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    setFormData(prev => ({ ...prev, seo: { ...prev.seo, keywords: Array.from(new Set([...prev.seo.keywords, newKeyword.trim().toLowerCase()])) } }));
    setNewKeyword('');
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({ ...prev, seo: { ...prev.seo, keywords: prev.seo.keywords.filter(k => k !== keyword) } }));
  };

  const addSpecification = () => {
    setFormData(prev => ({ ...prev, specifications: [...prev.specifications, { name: '', value: '' }] }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({ ...prev, specifications: prev.specifications.filter((_, i) => i !== index) }));
  };

  const updateSpecification = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => i === index ? { ...spec, [field]: value } : spec)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Basic validation
      if (!formData.name.trim()) throw new Error('Product name is required');
      if (!formData.description.trim()) throw new Error('Product description is required');
      if (!formData.category) throw new Error('Category is required');
      if (Number.isNaN(Number(formData.price)) || Number(formData.price) < 0) throw new Error('Price must be a non-negative number');

      // Ensure at least one image and one primary image
      const images = formData.images.filter(img => img.url && img.url.trim() !== '');
      if (images.length === 0) throw new Error('At least one image URL is required');
      if (!images.some(img => img.isPrimary)) images[0].isPrimary = true;

      // Sanitize tags and keywords
      const tags = Array.from(new Set(formData.tags.map(t => t.trim().toLowerCase()).filter(Boolean)));
      const keywords = Array.from(new Set(formData.seo.keywords.map(k => k.trim().toLowerCase()).filter(Boolean)));

      // Sanitize specifications
      const specifications = formData.specifications
        .map(s => ({ name: s.name.trim(), value: s.value.trim() }))
        .filter(s => s.name && s.value);

      // Sanitize variants (ensure numeric values and defaults)
      const variants = formData.variants.map(variant => ({
        name: variant.name.trim(),
        size: variant.size.trim(),
        color: variant.color.trim(),
        sku: variant.sku.trim() || undefined,
        price: Number(variant.price) || 0,
        originalPrice: variant.originalPrice ? Number(variant.originalPrice) : undefined,
        inventory: Number(variant.inventory) || 0,
        isActive: Boolean(variant.isActive)
      }));

      // Compute product-level inventory: sum of variant inventories if variants exist, otherwise use base inventory
      const inventory = variants.length > 0
        ? variants.reduce((sum, v) => sum + (Number(v.inventory) || 0), 0)
        : Number(formData.inventory) || 0;

      // Build payload matching the Product schema
      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.trim() || undefined,
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim() || undefined,
        price: Number(formData.price) || 0,
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category || undefined,
        subcategory: formData.subcategory || undefined,
        images: images.map(img => ({ url: img.url.trim(), alt: img.alt?.trim() || '', isPrimary: Boolean(img.isPrimary) })),
        variants,
        tags,
        specifications,
        inventory,
        status: formData.status,
        featured: Boolean(formData.featured),
        isNew: Boolean(formData.isNew),
        isSale: Boolean(formData.isSale),
        weight: formData.weight ? Number(formData.weight) : undefined,
        dimensions: {
          length: formData.dimensions.length ? Number(formData.dimensions.length) : undefined,
          width: formData.dimensions.width ? Number(formData.dimensions.width) : undefined,
          height: formData.dimensions.height ? Number(formData.dimensions.height) : undefined,
        },
        seo: {
          title: formData.seo.title?.trim() || undefined,
          description: formData.seo.description?.trim() || undefined,
          keywords
        }
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Error creating product:', error);
      alert(error.message || 'Error creating product');
    } finally {
      setSaving(false);
    }
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { 
        name: '', 
        size: '', 
        color: '', 
        sku: '', 
        price: 0, 
        originalPrice: 0, 
        inventory: 0, 
        isActive: true 
      }]
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const updateVariant = (index: number, field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-gray-600 mt-1">Create a new product in your catalog</p>
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

        {/* Product Variants */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product Variants</h2>
            <button
              type="button"
              onClick={addVariant}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Variant
            </button>
          </div>
          
          {formData.variants.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No variants added. Click "Add Variant" to create size/color variations.</p>
            </div>
          ) : (
            formData.variants.map((variant, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Variant {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove Variant
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Variant Name *</label>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => updateVariant(index, 'name', e.target.value)}
                      placeholder="e.g., Red Large"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => updateVariant(index, 'size', e.target.value)}
                      placeholder="e.g., L, XL, 42"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Color</label>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => updateVariant(index, 'color', e.target.value)}
                      placeholder="e.g., Red, Blue"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">SKU</label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      placeholder="e.g., SHIRT-RED-L"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value))}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Original Price</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={variant.originalPrice}
                      onChange={(e) => updateVariant(index, 'originalPrice', parseFloat(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Inventory</label>
                    <input
                      type="number"
                      min="0"
                      value={variant.inventory}
                      onChange={(e) => updateVariant(index, 'inventory', parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={variant.isActive}
                      onChange={(e) => updateVariant(index, 'isActive', e.target.checked)}
                      className="mr-2"
                    />
                    Active Variant
                  </label>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Inventory & Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Base Inventory & Status</h2>
          <p className="text-sm text-gray-600 mb-4">
            Base inventory applies when no variants are used. If variants exist, their individual inventories will be used instead.
          </p>
          
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

        {/* Specifications */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          
          {formData.specifications.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={spec.name}
                onChange={(e) => updateSpecification(index, 'name', e.target.value)}
                placeholder="Specification name"
                className="p-2 border rounded"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                  placeholder="Specification value"
                  className="flex-1 p-2 border rounded"
                />
                {formData.specifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="text-red-600 hover:text-red-800 px-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addSpecification}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Specification
          </button>
        </div>

        {/* Physical Properties */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Physical Properties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Length (cm)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.dimensions.length}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, length: parseFloat(e.target.value) }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Width (cm)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.dimensions.width}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, width: parseFloat(e.target.value) }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Height (cm)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.dimensions.height}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, height: parseFloat(e.target.value) }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">SEO Title</label>
            <input
              type="text"
              value={formData.seo.title}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                seo: { ...prev.seo, title: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">SEO Description</label>
            <textarea
              value={formData.seo.description}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                seo: { ...prev.seo, description: e.target.value }
              }))}
              className="w-full p-2 border rounded h-20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">SEO Keywords</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.seo.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                placeholder="Add SEO keyword"
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={addKeyword}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Keyword
              </button>
            </div>
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
            {saving ? 'Creating Product...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
