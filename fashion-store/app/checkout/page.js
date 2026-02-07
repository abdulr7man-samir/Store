'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const cart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      router.push('/auth');
      return;
    }

    if (!formData.name || !formData.phone || !formData.address || !formData.city || cart.length === 0) {
      setMessage('❌ لازم تملي كل البيانات');
      setLoading(false);
      return;
    }

    // Create order in database
    const orderData = {
      user_id: userData.user.id,
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_address: formData.address,
      customer_city: formData.city,
      total_price: total,
      items: JSON.stringify(cart),
      status: 'انتظار التحضير',
      payment_method: 'دفع عند الاستلام',
    };

    const { error } = await supabase.from('orders').insert(orderData);

    if (error) {
      setMessage(`❌ فشل إنشاء الطلب: ${error.message}`);
      setLoading(false);
      return;
    }

    setMessage('✅ تم الطلب بنجاح! شكراً لك 🎉');
    localStorage.removeItem('cart');
    setTimeout(() => router.push('/orders'), 2000);
    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-2xl mb-4">السلة فاضية!</p>
        <a href="/products" className="btn-primary inline-block">
          عودي للتسوق
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">💳 إتمام الطلب</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg font-bold text-center ${
            message.includes('✅')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">📦 الطلب</h2>
          <div className="space-y-3 border-b pb-4 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-bold">{item.price * item.quantity} ج.م</span>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg mb-4 border border-yellow-200">
            <p className="text-sm textellow-800">
              <strong>التوصيل:</strong> مجاني<br />
              <strong>طريقة الدفع:</strong> عند الاستلام
            </p>
          </div>

          <div className="flex justify-between items-center text-xl font-bold">
            <span>الإجمالي:</span>
            <span className="text-pink-600">{total} ج.م</span>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-6">👤 بيناتك</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">الاسم الكامل</label>
              <input
                type="text"
                placeholder="زينب أحمد"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">رقم الموبايل</label>
              <input
                type="tel"
                placeholder="01012345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">المحافظة</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600"
              >
                <option value="">اختاري المحافظة</option>
                <option value="القاهرة">القاهرة</option>
                <option value="الإسكندرية">الإسكندرية</option>
                <option value="الجيزة">الجيزة</option>
                <option value="الغربية">الغربية</option>
                <option value="دمياط">دمياط</option>
                <option value="الشرقية">الشرقية</option>
                <option value="المنوفية">المنوفية</option>
                <option value="أسيوط">أسيوط</option>
                <option value="سوهاج">سوهاج</option>
                <option value="قنا">قنا</option>
                <option value="الأقصر">الأقصر</option>
                <option value="أسوان">أسوان</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">العنوان</label>
              <textarea
                placeholder="شارع... حي... المرجة..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600 h-24"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary font-bold py-3 disabled:opacity-50"
            >
              {loading ? '⏳ جاري الإنشاء...' : '✅ تأكيد الطلب'}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 card bg-blue-50 border-2 border-blue-200">
        <h3 className="font-bold text-blue-700 mb-2">ℹ️ معلومات مهمة:</h3>
        <ul className="text-blue-600 space-y-2 text-sm">
          <li>✅ تأكدي من البيانات قبل التأكيد</li>
          <li>✅ سيتم التوصيل خلال 1-3 أيام</li>
          <li>✅ ستستقبلين كول من المندوب قبل الوصول</li>
          <li>✅ ادفعي عند استقبال الطلب مباشرة</li>
        </ul>
      </div>
    </div>
  );
}
