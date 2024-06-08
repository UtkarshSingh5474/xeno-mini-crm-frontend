// utils/useAuth.ts
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from './firebase';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);
};

export default useAuth;
