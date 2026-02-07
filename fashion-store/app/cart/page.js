'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-3xl mb-4">🛒 السلة فاضية</p>
        <p className="text-gray-600 mb-6">روحي الشوري اختاري منتجات تعجبك</p>
        <Link href="/products" className="btn-primary">
          🛍️ اذهبي للتسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">🛒 سلتك</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="card flex gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-pink-600 font-bold">{item.price} ج.م</p>
                  <div className="flex gap-2 mt-2 items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-300 px-3 py-1 rounded font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-300 px-3 py-1 rounded font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-secondary h-fit"
                >
                  ❌ حذف
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card h-fit">
          <h2 className="text-2xl font-bold mb-4">📋 الملخص</h2>
          <div className="space-y-3 border-b pb-4 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-bold">{item.price * item.quantity} ج.م</span>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg mb-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <span className="font-bold">التوصيل:</span> مجاني لكل مكان
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold">الإجمالي:</span>
            <span className="text-3xl font-bold text-pink-600">{totalPrice} ج.م</span>
          </div>

          <Link
            href="/checkout"
            className="btn-primary w-full text-center font-bold py-3 block"
          >
            الدفع عند الاستلام 💳
          </Link>
        </div>
      </div>
    </div>
  );
}
