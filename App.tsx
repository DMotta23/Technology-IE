import React, { useState, useCallback, useEffect } from 'react';
import type { View, Product, Farm, CartItem, ToastMessage } from './types';
import { supabase } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import FarmPage from './pages/FarmPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import Cart from './components/Cart';
import AuthPage from './pages/AuthPage';
import Toast from './components/Toast';
import { LeafIcon } from './components/Icons';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [view, setView] = useState<View>({ name: 'home' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  
  useEffect(() => {
    const getInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN') {
        setView({ name: 'home' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
        const { data: farmsData, error: farmsError } = await supabase.from('farms').select('*');
        if (farmsError) console.error('Error fetching farms:', farmsError.message);
        else {
            let transformedFarms: Farm[] = farmsData.map((f: any) => ({
                id: f.id,
                name: f.name,
                location: f.location,
                story: f.story,
                certifications: f.certifications,
                imageUrl: f.image_url,
                coverImageUrl: f.cover_image_url,
            }));

            // Override with new farm data and images
            if (transformedFarms.length > 0) {
                transformedFarms[0] = {
                    ...transformedFarms[0],
                    name: "Golden Valley Acres",
                    location: "California, USA",
                    imageUrl: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?q=80&w=800&auto=format&fit=crop",
                    coverImageUrl: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=1600&auto=format&fit=crop",
                };
            }
            if (transformedFarms.length > 1) {
                transformedFarms[1] = {
                    ...transformedFarms[1],
                    name: "Toscana Fields",
                    location: "Tuscany, Italy",
                    imageUrl: "https://images.unsplash.com/photo-1598165426123-f5a8229b3692?q=80&w=800&auto=format&fit=crop",
                    coverImageUrl: "https://images.unsplash.com/photo-1506813561347-cbb27c199f2c?q=80&w=1600&auto=format&fit=crop",
                };
            }
            if (transformedFarms.length > 2) {
                transformedFarms[2] = {
                    ...transformedFarms[2],
                    name: "Serra do Mar Coffee",
                    location: "Minas Gerais, Brazil",
                    imageUrl: "https://images.unsplash.com/photo-1620138459202-a14d50aab414?q=80&w=800&auto=format&fit=crop",
                    coverImageUrl: "https://images.unsplash.com/photo-1500356536257-2a6b1691656b?q=80&w=1600&auto=format&fit=crop",
                };
            }
            
            setFarms(transformedFarms);
        }

        const { data: productsData, error: productsError } = await supabase.from('products').select('*');
        if (productsError) console.error('Error fetching products:', productsError.message);
        else {
            const transformedProducts = productsData.map((p: any) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
                unit: p.unit,
                farmId: p.farm_id,
                category: p.category,
                imageUrl: p.image_url,
                stock: p.stock
            }));
            setProducts(transformedProducts);
        }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setIsCartOpen(true);
    setToast({ message: `${product.name} added to cart`, type: 'info' });
  }, []);

  const updateCartQuantity = useCallback((productId: number, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.product.id !== productId);
      }
      return prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setIsCartOpen(false);
  }, []);
  
  const handlePlaceOrder = useCallback(() => {
    clearCart();
    setView({ name: 'home' });
    setToast({ message: 'Order placed successfully!', type: 'success' });
  }, [clearCart]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const renderView = () => {
    switch (view.name) {
      case 'home':
        return <HomePage setView={setView} farms={farms} products={products} />;
      case 'browse':
        return <BrowsePage setView={setView} products={products} addToCart={addToCart} />;
      case 'farm':
        const farm = farms.find(f => f.id === view.payload);
        if (farm) {
            const farmProducts = products.filter(p => p.farmId === farm.id);
            return <FarmPage farm={farm} products={farmProducts} setView={setView} />;
        }
        return <div>Farm not found</div>;
      case 'product':
        const product = products.find(p => p.id === view.payload);
        if (product) {
            const productFarm = farms.find(f => f.id === product.farmId);
            return <ProductPage product={product} farm={productFarm} addToCart={addToCart} setView={setView} />;
        }
        return <div>Product not found</div>;
      case 'checkout':
        return <CheckoutPage cartItems={cart} placeOrder={handlePlaceOrder} />;
      default:
        return <HomePage setView={setView} farms={farms} products={products} />;
    }
  };
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
              <LeafIcon className="w-16 h-16 text-earth-green animate-pulse" />
              <p className="mt-4 text-xl text-forest-green font-semibold">Loading Harvest & Home...</p>
          </div>
      );
  }

  if (!session) {
      return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-cream font-sans text-forest-green">
      <Header 
        setView={setView} 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)}
        session={session}
        onSignOut={handleSignOut}
      />
      <main className="pt-20">
        {renderView()}
      </main>
      <footer className="bg-earth-green text-cream p-8 mt-16 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <LeafIcon className="w-6 h-6"/>
          <h3 className="text-xl font-bold">Harvest & Home</h3>
        </div>
        <p>&copy; {new Date().getFullYear()} | Supporting local, sustainable agriculture.</p>
      </footer>
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        updateQuantity={updateCartQuantity}
        clearCart={clearCart}
        setView={setView}
      />
      <Toast 
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

export default App;
