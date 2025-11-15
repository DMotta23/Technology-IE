import React from 'react';
import type { View } from '../types';
import { LeafIcon, ShoppingBagIcon, LogOutIcon, UserIcon } from './Icons';
import type { Session } from '@supabase/supabase-js';


interface HeaderProps {
  setView: (view: View) => void;
  cartItemCount: number;
  onCartClick: () => void;
  session: Session | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ setView, cartItemCount, onCartClick, session, onSignOut }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-cream/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => setView({ name: 'home' })} className="flex items-center gap-2 text-2xl font-bold text-earth-green hover:text-forest-green transition-colors">
            <LeafIcon className="w-8 h-8"/>
            <span>Harvest & Home</span>
          </button>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView({ name: 'home' })} className="text-lg font-medium text-forest-green hover:text-warm-brown transition-colors">Home</button>
            <button onClick={() => setView({ name: 'browse' })} className="text-lg font-medium text-forest-green hover:text-warm-brown transition-colors">Browse</button>
            {/* Future links can go here */}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-earth-green/10 transition-colors">
              <ShoppingBagIcon className="w-7 h-7 text-earth-green"/>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-warm-brown text-white text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            {session && (
                 <div className="flex items-center gap-2">
                    <UserIcon className="w-7 h-7 text-earth-green p-1 bg-earth-green/10 rounded-full"/>
                    <button onClick={onSignOut} title="Sign Out" className="p-2 rounded-full hover:bg-earth-green/10 transition-colors">
                        <LogOutIcon className="w-6 h-6 text-warm-brown"/>
                    </button>
                 </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
