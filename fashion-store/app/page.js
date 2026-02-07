'use client';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">🎀 مرحباً بك في متجر الأزياء الفاخرة</h1>
        <p className="text-xl mb-8">أجمل الملابس والموضات العصرية بأفضل الأسعار</p>
        <div className="space-x-4 space-reverse">
          <a
            href="/products"
            className="bg-yellow-400 text-pink-600 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors inline-block"
          >
            تسوقي الآن
          </a>
          <a
            href="/admin/products"
            className="bg-white text-pink-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
          >
            لوحة المسؤول
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">شحن سريع</h3>
            <p className="text-gray-600">نشحن طلبك في نقس الحين لحد عندك</p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-2">دفع عند الاستلام</h3>
            <p className="text-gray-600">ادفع اللي تقبضي الطلب - آمان وسهل</p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-2">جودة مضمونة</h3>
            <p className="text-gray-600">كل المنتجات محدش وأصلية 100%</p>
          </div>
        </div>
      </div>

      {/* Latest Collections */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">أحدث التشكيلات</h2>
          <a
            href="/products"
            className="btn-primary inline-block text-lg"
          >
            شوفي كل المنتجات ➜
          </a>
        </div>
      </div>
    </div>
  );
}
