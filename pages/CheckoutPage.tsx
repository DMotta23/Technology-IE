import React from 'react';
import type { CartItem } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  placeOrder: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, placeOrder }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process payment here.
    placeOrder();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-forest-green mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="bg-white p-8 rounded-lg shadow-lg order-last lg:order-first">
          <h2 className="text-2xl font-bold text-forest-green mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 rounded-md object-cover"/>
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-forest-green">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 mt-6 pt-6 space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-medium">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p className="font-medium">${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-bold text-forest-green">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-forest-green mb-6">Shipping & Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-forest-green mb-1">Full Name</label>
                <input type="text" id="name" required className="w-full px-4 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-earth-green focus:border-earth-green transition" placeholder="John Doe" />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-semibold text-forest-green mb-1">Address</label>
                <input type="text" id="address" required className="w-full px-4 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-earth-green focus:border-earth-green transition" placeholder="123 Farmhouse Lane" />
            </div>
            {/* Add more fields for city, state, zip, etc. */}
            
            {/* Dummy Payment section */}
            <div className="pt-4">
                 <label htmlFor="card" className="block text-sm font-semibold text-forest-green mb-1">Card Details</label>
                 <div className="p-3 bg-stone-100 border border-stone-300 rounded-lg">
                    <p className="text-sm text-stone-600">Demo payment field</p>
                 </div>
            </div>

            <button type="submit" className="w-full py-3 mt-6 bg-earth-green text-white font-bold rounded-lg text-lg hover:bg-forest-green transition-colors">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;