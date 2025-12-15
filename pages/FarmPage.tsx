
import React from 'react';
import type { View, Farm, Product } from '../types';

interface FarmPageProps {
  farm: Farm;
  products: Product[];
  setView: (view: View) => void;
}

const ProductCard: React.FC<{ product: Product, onClick: () => void }> = ({ product, onClick }) => (
    <div onClick={onClick} className="cursor-pointer group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h4 className="font-semibold text-lg text-forest-green truncate">{product.name}</h4>
            <p className="text-stone-500 text-sm">{product.category}</p>
            <p className="mt-2 text-lg font-bold text-earth-green">${product.price.toFixed(2)} <span className="text-sm font-normal text-stone-500">/ {product.unit}</span></p>
        </div>
    </div>
);


const FarmPage: React.FC<FarmPageProps> = ({ farm, products, setView }) => {
  return (
    <div>
      <div className="h-64 md:h-80 relative">
        <img src={farm.coverImageUrl} alt={`${farm.name} cover`} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="bg-cream p-8 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-8">
            <img src={farm.imageUrl} alt={farm.name} className="w-32 h-32 rounded-full border-4 border-white object-cover" />
            <div>
                <h1 className="text-4xl font-extrabold text-forest-green">{farm.name}</h1>
                <p className="text-lg text-warm-brown font-semibold mt-1">{farm.location}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-forest-green mb-4">Our Story</h2>
                <p className="text-lg text-stone-700 leading-relaxed">{farm.story}</p>
                <div className="mt-8">
                    <h3 className="text-2xl font-bold text-forest-green mb-3">Certifications</h3>
                    <div className="flex flex-wrap gap-3">
                        {farm.certifications?.map(cert => (
                            <span key={cert} className="bg-earth-green/10 text-earth-green font-semibold px-4 py-1 rounded-full">{cert}</span>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="lg:col-span-1">
                 <div className="bg-white p-6 rounded-lg shadow-md">
                     <h3 className="text-2xl font-bold text-forest-green mb-4">Farm Details</h3>
                     <button className="w-full py-3 bg-earth-green text-white rounded-lg font-semibold hover:bg-forest-green transition-colors mb-3">
                        Message Farmer
                     </button>
                      <button className="w-full py-3 border border-earth-green text-earth-green rounded-lg font-semibold hover:bg-earth-green/10 transition-colors">
                        Schedule a Visit
                     </button>
                 </div>
            </div>
        </div>
        
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-forest-green mb-6">Available from {farm.name}</h2>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                       <ProductCard key={product.id} product={product} onClick={() => setView({ name: 'product', payload: product.id })} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-stone-500 text-lg py-8 bg-stone-100 rounded-lg">No products currently available from this farm.</p>
            )}
        </div>

      </div>
    </div>
  );
};

export default FarmPage;
