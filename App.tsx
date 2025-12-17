
import React, { useState, useCallback, useEffect } from 'react';
import type { View, Product, Farm, CartItem, ToastMessage } from './types';
import { supabase } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { MOCK_FARMS, MOCK_PRODUCTS } from './constants';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import FarmPage from './pages/FarmPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import FarmsPage from './pages/FarmsPage';
import RecipeAssistantPage from './pages/RecipeAssistantPage';
import Cart from './components/Cart';
import AuthPage from './pages/AuthPage';
import Toast from './components/Toast';
import { LeafIcon } from './components/Icons';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [farms] = useState<Farm[]>(MOCK_FARMS);
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  
  const [view, setView] = useState<View>({ name: 'home' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  
  useEffect(() => {
    const getInitialSession = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        } catch (error) {
            console.error("Failed to retrieve session:", error);
        } finally {
            setLoading(false);
        }
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
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.error("Error signing out:", error);
    }
    setSession(null);
  };

  const handleManualLogin = (email?: string) => {
    const sessionEmail = email || 'demo@harvest.home';
    const demoSession = {
        user: { 
            id: 'manual-user-' + Math.floor(Math.random() * 10000),
            email: sessionEmail,
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString()
        },
        access_token: 'manual-token',
        refresh_token: 'manual-refresh-token',
        expires_in: 3600,
        token_type: 'bearer'
    } as unknown as Session;
    setSession(demoSession);
    setToast({ message: email ? 'Successfully logged in!' : 'Welcome to Demo Mode!', type: 'success' });
  };

  const renderView = () => {
    switch (view.name) {
      case 'home':
        return <HomePage 
          setView={setView} 
          farms={farms} 
          products={products} 
        />;
      case 'browse':
        return <BrowsePage setView={setView} products={products} addToCart={addToCart} />;
      case 'farms':
        return <FarmsPage setView={setView} farms={farms} />;
      case 'farm':
        const farm = farms.find(f => f.id === view.payload);
        if (farm) {
            const farmProducts = products.filter(p => p.farmId === farm.id);
            return <FarmPage 
              farm={farm} 
              products={farmProducts} 
              setView={setView} 
            />;
        }
        return <div>Farm not found</div>;
      case 'product':
        const product = products.find(p => p.id === view.payload);
        if (product) {
            const productFarm = farms.find(f => f.id === product.farmId);
            return <ProductPage 
              product={product} 
              farm={productFarm} 
              addToCart={addToCart} 
              setView={setView} 
            />;
        }
        return <div>Product not found</div>;
      case 'checkout':
        return <CheckoutPage cartItems={cart} placeOrder={handlePlaceOrder} />;
      case 'recipe-assistant':
        return <RecipeAssistantPage products={products} addToCart={addToCart} setView={setView} />;
      default:
        return <HomePage 
          setView={setView} 
          farms={farms} 
          products={products} 
        />;
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
      return <AuthPage onManualLogin={handleManualLogin} />;
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
