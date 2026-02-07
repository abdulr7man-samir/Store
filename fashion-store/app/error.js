'use client';

export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-100">
      <div className="card max-w-md w-full text-center p-8">
        <p className="text-7xl mb-4">⚠️</p>
        <h1 className="text-3xl font-bold mb-2">حصل خطأ!</h1>
        <p className="text-gray-600 mb-2 text-sm">{error?.message || 'حصل خطأ غير متوقع'}</p>
        <p className="text-gray-500 text-xs mb-6">الرجاء المحاولة مرة أخرى</p>
        <div className="space-y-2">
          <button
            onClick={() => reset()}
            className="btn-primary block w-full"
          >
            🔄 حاولي مرة تانية
          </button>
          <a href="/" className="btn-secondary block">
            🏠 الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}
