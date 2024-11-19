'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './Authentication';
import { login } from '@/redux/features/AuthSlice';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      const user = {
        displayName: result.user.displayName || '',
        email: result.user.email || '',
        photoURL: result.user.photoURL || '',
        uid: result.user.uid,
      };
  
      dispatch(login(user));
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <button onClick={loginWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  );
};

export default Login;
