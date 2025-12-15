
import React from 'react';
import type { View, Farm } from '../types';

interface FarmsPageProps {
  farms: Farm[];
  setView: (view: View) => void;
}

const FarmCard: React.FC<{ farm: Farm; onClick: () => void }> = ({ farm, onClick }) => (
    <div onClick={onClick} className="cursor-pointer group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={farm.imageUrl} alt={farm.name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-xl font-bold text-earth-green group-hover:text-warm-brown transition-colors">{farm.name}</h3>
            <p className="text-stone-500 mb-2">{farm.location}</p>
            <p className="text-stone-600 line-clamp-3 text-sm">{farm.story}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                 {farm.certifications?.map(cert => (
                    <span key={cert} className="text-xs bg-earth-green/10 text-earth-green px-2 py-1 rounded-full">{cert}</span>
                 ))}
            </div>
        </div>
    </div>
);

const FarmsPage: React.FC<FarmsPageProps> = ({ farms, setView }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-forest-green mb-8">Our Partner Farmers</h1>
      <p className="text-lg text-stone-600 mb-12 max-w-3xl">
        We work directly with passionate farmers who believe in sustainable, organic, and ethical practices. 
        Get to know the people behind your food.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {farms.map((farm) => (
          <FarmCard key={farm.id} farm={farm} onClick={() => setView({ name: 'farm', payload: farm.id })} />
        ))}
      </div>
    </div>
  );
};

export default FarmsPage;
