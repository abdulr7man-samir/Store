'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    orders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        
        // Fetch products
        const { data: productsData } = await supabase.from('products').select('*');

        const totalRevenue = (ordersData || []).reduce((sum, order) => sum + order.total_price, 0);

        setStats({
          totalOrders: ordersData?.length || 0,
          totalRevenue,
          totalProducts: productsData?.length || 0,
          orders: ordersData || [],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold">⏳ جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">📊 لوحة التحكم</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          <p className="text-gray-600 text-sm font-bold">الطلبات</p>
          <p className="text-4xl font-bold text-blue-600">{stats.totalOrders}</p>
          <p className="text-xs text-gray-500 mt-2">إجمالي الطلبات</p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
          <p className="text-gray-600 text-sm font-bold">الإيرادات</p>
          <p className="text-4xl font-bold text-green-600">{stats.totalRevenue}</p>
          <p className="text-xs text-gray-500 mt-2">ج.م</p>
        </div>

        <div className="card bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200">
          <p className="text-gray-600 text-sm font-bold">المنتجات</p>
          <p className="text-4xl font-bold text-pink-600">{stats.totalProducts}</p>
          <p className="text-xs text-gray-500 mt-2">منتج في المتجر</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          href="/admin/products"
          className="card bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-6 hover:shadow-lg transition-all"
        >
          <p className="text-4xl mb-2">➕</p>
          <p className="font-bold text-lg">إضافة منتج جديد</p>
          <p className="text-sm text-gray-100 mt-1">أضيفي منتج جديد للمتجر</p>
        </Link>

        <a
          href="/products"
          className="card bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-6 hover:shadow-lg transition-all"
        >
          <p className="text-4xl mb-2">👁️</p>
          <p className="font-bold text-lg">شوفي المتجر</p>
          <p className="text-sm text-gray-100 mt-1">اعرضي الموقع كما يراه الزبائن</p>
        </a>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">📦 أحدث الطلبات</h2>

        {stats.orders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">لا توجد طلبات حتى الآن</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-right p-3 font-bold">الزبون</th>
                  <th className="text-right p-3 font-bold">الموبايل</th>
                  <th className="text-right p-3 font-bold">السعر</th>
                  <th className="text-right p-3 font-bold">الحالة</th>
                  <th className="text-right p-3 font-bold">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {stats.orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{order.customer_name}</td>
                    <td className="p-3">{order.customer_phone}</td>
                    <td className="p-3 font-bold text-green-600">{order.total_price} ج.م</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          order.status === 'تم التوصيل'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'قيد التوصيل'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('ar-EG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 card bg-blue-50 border-2 border-blue-200">
        <h3 className="font-bold text-blue-700 mb-4">💡 نصائح للنجاح</h3>
        <ul className="text-blue-600 space-y-2">
          <li>✅ أضيفي صور جميلة وعالية الجودة</li>
          <li>✅ حدّثي الملابس كل أسبوع على الأقل</li>
          <li>✅ ردّي على استفسارات الزبائن بسرعة</li>
          <li>✅ شاركي الموقع على مواقع التواصل</li>
          <li>✅ اصنعي عروض خاصة لتشجيع الشراء</li>
        </ul>
      </div>
    </div>
  );
}
