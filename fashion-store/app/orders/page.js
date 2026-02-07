'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        window.location.href = '/auth';
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (!error) {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold">⏳ جاري التحميل...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-3xl mb-4">📦 ما عندك طلبات</p>
        <p className="text-gray-600 mb-6">ابدأي التسوق دلوقتي!</p>
        <Link href="/products" className="btn-primary">
          🛍️ اذهبي للتسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">📦 طلباتي</h1>

      <div className="grid gap-6">
        {orders.map((order) => {
          const items = JSON.parse(order.items || '[]');
          const statusColor = {
            'انتظار التحضير': 'bg-yellow-100 text-yellow-700',
            'قيد التوصيل': 'bg-blue-100 text-blue-700',
            'تم التوصيل': 'bg-green-100 text-green-700',
            'ملغى': 'bg-red-100 text-red-700',
          };

          return (
            <div key={order.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">#{order.id.slice(0, 8)}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.created_at).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-bold text-sm ${
                    statusColor[order.status] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                <p className="mb-2">
                  <strong>الاسم:</strong> {order.customer_name}
                </p>
                <p className="mb-2">
                  <strong>الموبايل:</strong> {order.customer_phone}
                </p>
                <p className="mb-2">
                  <strong>العنوان:</strong> {order.customer_address} - {order.customer_city}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">المنتجات:</h4>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-gray-700">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-bold">{item.price * item.quantity} ج.م</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">الإجمالي:</span>
                <span className="text-2xl font-bold text-pink-600">
                  {order.total_price} ج.م
                </span>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  <strong>💚 الدفع عند الاستلام</strong> - مجاني التوصيل
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
