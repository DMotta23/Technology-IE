
import React, { useState } from 'react';
import type { View, Product, AssistantRecipe } from '../types';
import { generateRecipesFromInventory } from '../services/geminiService';
import { SparklesIcon, ChevronRightIcon, PlusIcon, CheckCircleIcon } from '../components/Icons';

interface RecipeAssistantPageProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  setView: (view: View) => void;
}

const RecipeCard: React.FC<{ 
    recipe: AssistantRecipe; 
    products: Product[]; 
    onAddToCart: (items: {product: Product, quantity: number}[]) => void 
}> = ({ recipe, products, onAddToCart }) => {
    const [expanded, setExpanded] = useState(false);
    
    // Calculate total cost and find matched products
    let totalCost = 0;
    const itemsToAdd: {product: Product, quantity: number}[] = [];

    const ingredientsWithMeta = recipe.ingredients.map(ing => {
        let product: Product | undefined;
        let cost = 0;
        if (ing.matchedProductId) {
            product = products.find(p => p.id === ing.matchedProductId);
            if (product && ing.quantityToBuy) {
                cost = product.price * ing.quantityToBuy;
                totalCost += cost;
                itemsToAdd.push({ product, quantity: ing.quantityToBuy });
            }
        }
        return { ...ing, product, cost };
    });

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-100 transition-all duration-300 hover:shadow-xl">
            <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-forest-green">{recipe.name}</h3>
                        <p className="text-stone-600 mt-1 text-sm">{recipe.description}</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-2xl font-bold text-earth-green">${totalCost.toFixed(2)}</span>
                        <span className="text-xs text-stone-500">Est. Cost</span>
                    </div>
                </div>
                <div className="mt-4 flex items-center text-warm-brown text-sm font-semibold">
                    {expanded ? 'Hide Details' : 'View Ingredients & Instructions'}
                    <ChevronRightIcon className={`w-4 h-4 ml-1 transform transition-transform ${expanded ? 'rotate-90' : ''}`} />
                </div>
            </div>

            {expanded && (
                <div className="px-6 pb-6 bg-cream/30 border-t border-stone-100">
                    <div className="mt-4">
                        <h4 className="font-bold text-forest-green mb-3">Ingredients from Store</h4>
                        <div className="space-y-3">
                            {ingredientsWithMeta.map((ing, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm p-2 rounded-lg bg-white border border-stone-200">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-stone-800">{ing.name}</span>
                                        <span className="text-stone-500">{ing.amount}</span>
                                    </div>
                                    {ing.product ? (
                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-1 text-earth-green font-semibold">
                                                <CheckCircleIcon className="w-4 h-4" />
                                                <span>{ing.product.name}</span>
                                            </div>
                                            <span className="text-stone-500 text-xs">
                                                {ing.quantityToBuy} x ${ing.product.price.toFixed(2)} = ${ing.cost.toFixed(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-stone-400 italic text-xs">Not in stock</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="font-bold text-forest-green mb-3">Instructions</h4>
                        <ol className="list-decimal list-inside space-y-2 text-stone-700 text-sm">
                            {recipe.instructions.map((step, idx) => (
                                <li key={idx} className="leading-relaxed">{step}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-200">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(itemsToAdd);
                            }}
                            disabled={itemsToAdd.length === 0}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-earth-green text-white font-bold rounded-lg hover:bg-forest-green transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Add All Ingredients to Cart (${totalCost.toFixed(2)})
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const RecipeAssistantPage: React.FC<RecipeAssistantPageProps> = ({ products, addToCart, setView }) => {
  const [prompt, setPrompt] = useState('');
  const [recipes, setRecipes] = useState<AssistantRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const results = await generateRecipesFromInventory(prompt, products);
      if (results.length === 0) {
        setError("I couldn't find any recipes matching that request using our inventory. Try something else!");
      } else {
        setRecipes(results);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBatchAddToCart = (items: {product: Product, quantity: number}[]) => {
      items.forEach(item => {
          addToCart(item.product, item.quantity);
      });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-earth-green/10 rounded-full mb-4">
            <SparklesIcon className="w-8 h-8 text-earth-green" />
        </div>
        <h1 className="text-4xl font-extrabold text-forest-green mb-4">AI Recipe Assistant</h1>
        <p className="text-lg text-stone-600">
          Tell me what you're craving (e.g., "vegetarian pasta" or "something with tomatoes"), 
          and I'll create a recipe using ingredients from our store with prices calculated for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleGenerate} className="relative">
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What would you like to cook today?"
                className="w-full pl-6 pr-16 py-4 text-lg border-2 border-stone-200 rounded-full focus:outline-none focus:border-earth-green focus:ring-2 focus:ring-earth-green/20 shadow-sm transition-all"
            />
            <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 bg-earth-green text-white font-bold rounded-full hover:bg-forest-green disabled:bg-stone-300 transition-colors flex items-center justify-center"
            >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Go'}
            </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {recipes.map((recipe, index) => (
            <RecipeCard 
                key={index} 
                recipe={recipe} 
                products={products} 
                onAddToCart={handleBatchAddToCart}
            />
        ))}
      </div>
    </div>
  );
};

export default RecipeAssistantPage;
