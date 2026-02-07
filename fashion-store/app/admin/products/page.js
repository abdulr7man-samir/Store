'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminProductsPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage.from('products').upload(fileName, file);
      if (error) {
        console.error('خطأ الرفع:', error);
        return null;
      }
      const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(fileName);
      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('خطأ:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !price || !image) {
      setMessage('❌ لازم تملي كل الحقول يا عم!');
      setLoading(false);
      return;
    }

    const imageUrl = await uploadImage(image);
    if (!imageUrl) {
      setMessage('❌ فشل رفع الصورة، حاولي مرة تانية');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('products').insert({
      name,
      price: parseInt(price),
      image: imageUrl,
    });

    if (error) {
      setMessage(`❌ فشلت الإضافة: ${error.message}`);
    } else {
      setMessage('✅ تمت الإضافة بنجاح!');
      setName('');
      setPrice('');
      setImage(null);
      setTimeout(() => setMessage(''), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 py-12">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6 text-center">➕ إضافة منتج جديد</h1>

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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-bold mb-2">اسم المنتج</label>
            <input
              type="text"
              placeholder="مثلاً: فستان أسود فاخر"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">السعر (جنيه)</label>
            <input
              type="number"
              placeholder="مثلاً: 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">صورة المنتج</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600"
            />
            {image && <p className="text-green-600 mt-2 font-bold">✅ تم اختيار الصورة</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary font-bold text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ جاري الإضافة...' : '➕ إضافة المنتج'}
          </button>
        </form>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
        <h2 className="font-bold text-blue-700 mb-2">💡 نصيحة:</h2>
        <ul className="text-blue-600 space-y-1 text-sm">
          <li>• استخدمي صور عالية الجودة والألوان واضحة</li>
          <li>• تأكدي من كتابة اسم المنتج بشكل صحيح</li>
          <li>• السعر لازم يكون معقول ومناسب</li>
          <li>• الصور تظهر المنتج من أحسن زوايا ممكنة</li>
        </ul>
      </div>
    </div>
  );
}
