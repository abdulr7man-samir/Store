'use client';

import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    // Redirect to home after logout
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-100">
      <div className="card max-w-md w-full text-center">
        <p className="text-5xl mb-4">👋</p>
        <h1 className="text-2xl font-bold mb-4">شكراً على الزيارة!</h1>
        <p className="text-gray-600 mb-6">تم تسجيل الخروج بنجاح</p>
        <p className="text-sm text-gray-500">سيتم التوجيه للصفحة الرئيسية...</p>
      </div>
    </div>
  );
}
