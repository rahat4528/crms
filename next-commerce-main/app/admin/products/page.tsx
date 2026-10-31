'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory?: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  category: Category;
  subcategory?: Category;
  images: Array<{
    url: string;
    alt?: string;
    isPrimary?: boolean;
  }>;
  tags: string[];
  inventory: number;
  status: 'draft' | 'active' | 'inactive' | 'out-of-stock';
  featured: boolean;
  isNew: boolean;
  isSale: boolean;
  rating: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(10);

  useEffect(() => {
    loadProducts();
  }, [currentPage, searchTerm, categoryFilter, statusFilter, sortBy, itemsPerPage]);

  // Load categories once on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Reset to first page when filters or itemsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, statusFilter, sortBy, itemsPerPage]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const limitValue = itemsPerPage === 'all' ? '10000' : String(itemsPerPage);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limitValue,
        sortBy,
        ...(searchTerm && { search: searchTerm }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/api/admin/products?${params}`);
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotalCount(result.pagination.totalCount);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories?active=true');
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(productId);
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        alert('Product deleted successfully!');
        loadProducts();
      } else {
        alert('Error deleting product: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } finally {
      setDeleteLoading(null);
    }
  };

  const updateProductStatus = async (productId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      const result = await response.json();
      if (result.success) {
        loadProducts();
      } else {
        alert('Error updating product status: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating product status:', error);
      alert('Error updating product status');
    }
  };

  const toggleProductFlag = async (productId: string, field: string, value: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      });

      const result = await response.json();
      if (result.success) {
        loadProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Numeric helpers for pagination (handles itemsPerPage === 'all')
  const itemsPerPageNumber = itemsPerPage === 'all' ? (totalCount || 0) : Number(itemsPerPage);
  const startIndex = totalCount === 0 ? 0 : ((currentPage - 1) * itemsPerPageNumber) + 1;
  const endIndex = itemsPerPage === 'all' ? totalCount : Math.min(currentPage * itemsPerPageNumber, totalCount);

  if (loading && products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search Products</label>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, description... (press Enter to search immediately)"
              onKeyDown={(e) => { if (e.key === 'Enter') { setSearchTerm(searchInput); setCurrentPage(1); } }}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Items per page</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={'all'}>All</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={product.images[0]?.url || '/placeholder.svg'}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category.name}</div>
                    {product.subcategory && (
                      <div className="text-sm text-gray-500">{product.subcategory.name}</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.inventory}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={product.status}
                      onChange={(e) => updateProductStatus(product._id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusBadgeClass(product.status)}`}
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="inactive">Inactive</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleProductFlag(product._id, 'featured', !product.featured)}
                        className={`text-xs px-2 py-1 rounded ${
                          product.featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        Featured
                      </button>
                      <button
                        onClick={() => toggleProductFlag(product._id, 'isNew', !product.isNew)}
                        className={`text-xs px-2 py-1 rounded ${
                          product.isNew ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => toggleProductFlag(product._id, 'isSale', !product.isSale)}
                        className={`text-xs px-2 py-1 rounded ${
                          product.isSale ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        Sale
                      </button>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      disabled={deleteLoading === product._id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deleteLoading === product._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No products found</div>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            <Link
              href="/admin/products/add"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex} to {endIndex} of {totalCount} products
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 border rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
