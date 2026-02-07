'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    checkUser();

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(updatedCart.length);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          👗 متجر الأزياء الفاخرة
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/products" className="hover:text-yellow-300 transition-colors">
            المنتجات
          </Link>

          <Link href="/cart" className="relative hover:text-yellow-300 transition-colors">
            🛒 السلة
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link href="/orders" className="hover:text-yellow-300 transition-colors">
                📦 طلباتي
              </Link>
              <Link href="/admin/products" className="hover:text-yellow-300 transition-colors">
                ⚙️ لوحة التحكم
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="bg-yellow-400 text-pink-600 px-3 py-1 rounded font-bold hover:bg-yellow-300 transition-colors"
            >
              تسجيل دخول
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
