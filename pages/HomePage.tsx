

import React from 'react';
import type { View, Farm, Product } from '../types';
import { ChevronRightIcon } from '../components/Icons';

interface HomePageProps {
  setView: (view: View) => void;
  farms: Farm[];
  products: Product[];
}

const FarmCard: React.FC<{ farm: Farm; onClick: () => void }> = ({ farm, onClick }) => (
    <div onClick={onClick} className="cursor-pointer group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={farm.imageUrl} alt={farm.name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-xl font-bold text-earth-green group-hover:text-warm-brown transition-colors">{farm.name}</h3>
            <p className="text-stone-500">{farm.location}</p>
        </div>
    </div>
);

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => (
    <div onClick={onClick} className="cursor-pointer group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h4 className="font-semibold text-lg text-forest-green truncate">{product.name}</h4>
            <p className="text-stone-500 text-sm">{product.category}</p>
            <p className="mt-2 text-lg font-bold text-earth-green">${product.price.toFixed(2)} <span className="text-sm font-normal text-stone-500">/ {product.unit}</span></p>
        </div>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ setView, farms, products }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center text-white" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Fresh from the farm.</h1>
          <p className="mt-4 text-xl md:text-2xl max-w-2xl">Discover the best local, organic produce delivered right to your doorstep.</p>
          <button 
            onClick={() => setView({ name: 'browse' })}
            className="mt-8 px-8 py-3 bg-sun-yellow text-forest-green font-bold text-lg rounded-lg shadow-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300"
          >
            Shop All Produce
          </button>
        </div>
      </section>

      {/* Featured Farms Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-forest-green">Meet Our Farmers</h2>
          <button onClick={() => { /* Navigate to all farms page in future */ }} className="flex items-center text-warm-brown font-semibold hover:underline">
            View All <ChevronRightIcon className="w-5 h-5 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farms.map((farm) => (
            <FarmCard key={farm.id} farm={farm} onClick={() => setView({ name: 'farm', payload: farm.id })} />
          ))}
        </div>
      </section>

      {/* What's Fresh This Week Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-forest-green">What's Fresh This Week</h2>
           <button onClick={() => setView({ name: 'browse' })} className="flex items-center text-warm-brown font-semibold hover:underline">
            Shop All <ChevronRightIcon className="w-5 h-5 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => setView({ name: 'product', payload: product.id })} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;