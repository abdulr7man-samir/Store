'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (!error) {
          setProducts(data || []);
        }
      } catch (err) {
        console.error('خطأ في تحميل المنتجات:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find(p => p.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('✅ تمت الإضافة للسلة!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold">⏳ جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-center">🛍️ كل المنتجات</h1>
      <p className="text-center text-gray-600 mb-8">اختاري اللي يعجبك وأحنا هنوصلهالك</p>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-500">لسه ما فيش منتجات 😔</p>
          <p className="text-gray-400 mt-2">تابعينا قريباً هيكون فيه منتجات كتيرة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card hover:scale-105 transition-transform duration-300">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-pink-600 font-bold text-xl mb-4">{product.price} ج.م</p>
              <button
                onClick={() => addToCart(product)}
                className="btn-primary w-full"
              >
                إضافة للسلة 🛒
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
