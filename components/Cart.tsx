import React from 'react';
import type { CartItem, View } from '../types';
import { XIcon, TrashIcon } from './Icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setView: (view: View) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, updateQuantity, clearCart, setView }) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    setView({ name: 'checkout' });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-2xl font-bold text-forest-green">Your Cart</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-200 transition-colors">
              <XIcon className="w-6 h-6 text-forest-green" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
              <p className="text-lg text-stone-600">Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-earth-green text-white rounded-lg font-semibold hover:bg-forest-green transition-colors">
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex items-start gap-4">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover"/>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-forest-green">{item.product.name}</h3>
                      <p className="text-sm text-stone-500">${item.product.price.toFixed(2)} / {item.product.unit}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10))}
                          className="w-16 p-1 border border-stone-300 rounded-md text-center"
                        />
                        <button onClick={() => updateQuantity(item.product.id, 0)} className="p-1 text-warm-brown hover:text-red-600">
                           <TrashIcon className="w-5 h-5"/>
                        </button>
                      </div>
                    </div>
                    <p className="font-semibold text-forest-green">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-stone-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-forest-green">${subtotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-3 bg-earth-green text-white rounded-lg font-semibold text-lg hover:bg-forest-green transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button onClick={clearCart} className="w-full mt-2 text-sm text-warm-brown hover:underline">
                    Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;