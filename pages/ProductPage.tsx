
import React, { useState, useCallback } from 'react';
import type { View, Product, Farm, Recipe } from '../types';
import { getRecipeIdeas } from '../services/geminiService';
import { SparklesIcon, XIcon } from '../components/Icons';

interface ProductPageProps {
  product: Product;
  farm?: Farm;
  addToCart: (product: Product, quantity: number) => void;
  setView: (view: View) => void;
}

const RecipeModal: React.FC<{ recipes: Recipe[]; onClose: () => void; productName: string; }> = ({ recipes, onClose, productName }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-6 border-b border-stone-200 flex justify-between items-start z-10">
                <div>
                    <h2 className="text-2xl font-bold text-forest-green">Recipe Ideas For</h2>
                    <p className="text-lg text-warm-brown">{productName}</p>
                </div>
                <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-stone-100 transition-colors">
                    <XIcon className="w-6 h-6 text-stone-500" />
                </button>
            </div>
            <div className="p-6 space-y-6">
                {recipes.map((recipe, index) => (
                    <div key={index} className="p-4 border border-stone-200 rounded-lg">
                        <h3 className="text-xl font-bold text-earth-green">{recipe.recipeName}</h3>
                        <p className="mt-1 text-stone-600 italic">"{recipe.description}"</p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2 text-forest-green">Ingredients:</h4>
                                <ul className="list-disc list-inside text-stone-700 space-y-1">
                                    {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-forest-green">Instructions:</h4>
                                <ol className="list-decimal list-inside text-stone-700 space-y-1">
                                    {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                                </ol>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ProductPage: React.FC<ProductPageProps> = ({ product, farm, addToCart, setView }) => {
  const [quantity, setQuantity] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [recipeError, setRecipeError] = useState<string | null>(null);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleGetRecipes = useCallback(async () => {
    setIsLoadingRecipes(true);
    setRecipeError(null);
    try {
        const ideas = await getRecipeIdeas(product.name);
        setRecipes(ideas);
    } catch (error) {
        setRecipeError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
        setIsLoadingRecipes(false);
    }
  }, [product.name]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-2xl shadow-lg"/>
        </div>
        <div>
          <span className="text-sm font-semibold text-warm-brown">{product.category.toUpperCase()}</span>
          <h1 className="text-5xl font-extrabold text-forest-green mt-2">{product.name}</h1>
          {farm && (
            <button onClick={() => setView({ name: 'farm', payload: farm.id })} className="text-xl text-earth-green font-medium mt-2 hover:underline">
              From {farm.name}
            </button>
          )}
          <p className="text-4xl font-bold text-earth-green mt-6">${product.price.toFixed(2)} <span className="text-xl font-normal text-stone-500">/ {product.unit}</span></p>
          <p className="text-lg text-stone-700 mt-6 leading-relaxed">{product.description}</p>
          
          <div className="mt-8 flex items-center gap-4">
            <input 
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              className="w-20 p-3 border-2 border-stone-300 rounded-lg text-center text-lg font-semibold focus:ring-2 focus:ring-earth-green focus:border-earth-green"
            />
            <button onClick={handleAddToCart} className="flex-grow py-3 px-6 bg-earth-green text-white text-lg font-semibold rounded-lg hover:bg-forest-green transition-colors">
              Add to Cart
            </button>
          </div>
          <p className="text-sm text-stone-500 mt-2">{product.stock} units available</p>

          <div className="mt-10 border-t pt-8">
             <button onClick={handleGetRecipes} disabled={isLoadingRecipes} className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-sun-yellow text-forest-green text-lg font-semibold rounded-lg hover:bg-yellow-300 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed">
                 {isLoadingRecipes ? (
                     <>
                        <div className="w-5 h-5 border-2 border-forest-green border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating Ideas...</span>
                     </>
                 ) : (
                    <>
                        <SparklesIcon className="w-6 h-6" />
                        <span>Get AI Recipe Ideas</span>
                    </>
                 )}
            </button>
            {recipeError && <p className="text-red-600 mt-2 text-center">{recipeError}</p>}
          </div>
        </div>
      </div>
      {recipes && <RecipeModal recipes={recipes} onClose={() => setRecipes(null)} productName={product.name} />}
    </div>
  );
};

export default ProductPage;
