'use client';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-100">
      <div className="card max-w-md w-full text-center p-8">
        <p className="text-7xl mb-4">🚫</p>
        <h1 className="text-3xl font-bold mb-2">الصفحة مش موجودة</h1>
        <p className="text-gray-600 mb-6">الصفحة اللي دورتِ عليها مش موجودة أو اتعذفت</p>
        <div className="space-y-2">
          <a href="/" className="btn-primary block">
            🏠 الرئيسية
          </a>
          <a href="/products" className="btn-secondary block">
            🛍️ المنتجات
          </a>
        </div>
      </div>
    </div>
  );
}
