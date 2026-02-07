'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setMessage('❌ لازم تملي البريد والرقم السري');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setMessage(`❌ ${error.message}`);
        } else {
          setMessage('✅ حساب جديد تم إنشاؤه! سجلي دخول دلوقتي');
          setIsSignUp(false);
          setEmail('');
          setPassword('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setMessage('❌ البريد أو الرقم السري غلط');
        } else {
          setMessage('✅ تسجيل الدخول بنجاح!');
          setTimeout(() => router.push('/admin/products'), 1500);
        }
      }
    } catch (err) {
      setMessage(`❌ حصل خطأ: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 p-4">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isSignUp ? '📝 حساب جديد' : '🔐 تسجيل الدخول'}
        </h1>

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

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">الرقم السري</label>
            <input
              type="password"
              placeholder="كلمة سرية قوية"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-pink-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary font-bold py-3 disabled:opacity-50"
          >
            {loading ? '⏳ جاري...' : isSignUp ? 'إنشاء حساب' : 'تسجيل دخول'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-3">
            {isSignUp ? 'عندك حساب بالفعل؟' : 'ما عندك حساب؟'}
          </p>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
              setEmail('');
              setPassword('');
            }}
            className="text-pink-600 font-bold hover:text-pink-700"
          >
            {isSignUp ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-yellow-800">
          <p className="font-bold mb-2">👤 تجربة سريعة:</p>
          <p>Email: admin@test.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}
