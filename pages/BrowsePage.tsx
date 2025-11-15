
import React, { useState, useMemo } from 'react';
import type { View, Product } from '../types';
import { PlusIcon } from '../components/Icons';

interface BrowsePageProps {
  setView: (view: View) => void;
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<{ product: Product; onViewDetails: () => void; onAddToCart: () => void; }> = ({ product, onViewDetails, onAddToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-shadow duration-300 hover:shadow-xl">
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover cursor-pointer" onClick={onViewDetails} />
                <button onClick={onAddToCart} className="absolute top-3 right-3 bg-earth-green text-white w-10 h-10 rounded-full flex items-center justify-center transform opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-forest-green hover:scale-110">
                    <PlusIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <span className="text-xs text-warm-brown font-semibold">{product.category.toUpperCase()}</span>
                <h3 className="text-lg font-bold text-forest-green mt-1 cursor-pointer" onClick={onViewDetails}>{product.name}</h3>
                <div className="mt-auto pt-4 flex justify-between items-center">
                    <p className="text-xl font-extrabold text-earth-green">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-stone-500">/ {product.unit}</p>
                </div>
            </div>
        </div>
    );
};


const BrowsePage: React.FC<BrowsePageProps> = ({ setView, products, addToCart }) => {
  const [filter, setFilter] = useState<string>('All');
  const [sort, setSort] = useState<string>('name-asc');
  
  const categories = ['All', 'Vegetable', 'Fruit', 'Dairy', 'Bakery', 'Artisanal'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (filter !== 'All') {
      result = result.filter(p => p.category === filter);
    }
    
    result.sort((a, b) => {
        switch (sort) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'name-asc':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    return result;
  }, [products, filter, sort]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold text-forest-green mb-8">All Produce</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
        {/* Filters */}
        <div className="flex-grow">
            <h3 className="text-sm font-semibold mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <button 
                        key={category} 
                        onClick={() => setFilter(category)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                            filter === category 
                            ? 'bg-earth-green text-white' 
                            : 'bg-white text-forest-green hover:bg-stone-100'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
        {/* Sort */}
        <div>
            <label htmlFor="sort-by" className="text-sm font-semibold mr-2">Sort by</label>
            <select
                id="sort-by"
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="p-2 border border-stone-300 rounded-lg bg-white"
            >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
            </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredAndSortedProducts.map(product => (
            <ProductCard 
                key={product.id} 
                product={product}
                onViewDetails={() => setView({ name: 'product', payload: product.id })}
                onAddToCart={() => addToCart(product, 1)}
            />
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
