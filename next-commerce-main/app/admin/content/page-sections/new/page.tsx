'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

import { Product } from '@/types/product';

export default function CreatePageSectionPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await fetch(`/api/admin/products?search=${encodeURIComponent(searchQuery)}&limit=20`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data || []);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (selectedProducts.length === 0) {
      alert('Please select at least one product.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/admin/page-sections/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          sortOrder,
          products: selectedProducts,
        }),
      });
      if (response.ok) {
        router.push('/admin/content/page-sections');
      } else {
        alert('Error creating page section');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating page section');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create New Page Section</h1>
        <p className="text-muted-foreground">Add a new section to your website's landing page.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="sortOrder">Sort Order</Label>
          <Input
            type="number"
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Products</Label>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="button" onClick={handleSearch}>Search</Button>
            </div>
            <div className="max-h-40 overflow-y-auto border rounded p-2">
              {searchResults.map(product => (
                <div key={product._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={product._id}
                    checked={selectedProducts.includes(product._id)}
                    onCheckedChange={() => handleProductToggle(product._id)}
                  />
                  <Label htmlFor={product._id} className="flex-1 flex items-center space-x-2 cursor-pointer">
                    <Image
                      src={product.images?.[0]?.url ?? '/placeholder.png'}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{product.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {product.price != null
                          ? (typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : String(product.price))
                          : 'Price unavailable'}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
            {selectedProducts.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedProducts.length} product(s)
              </p>
            )}
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Section'}
        </Button>
      </form>
    </div>
  );
}