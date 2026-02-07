'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/auth');
      }
    };
    checkAuth();
  }, [router]);

  return children;
}
