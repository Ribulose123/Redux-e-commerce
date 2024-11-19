'use client';
import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './Authentication';
import { login, logout } from '@/redux/features/AuthSlice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import Image from 'next/image';
import { GoPackage } from 'react-icons/go';
import Login from './Login';

const OrderAuth: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          login({
            uid: currentUser.uid,
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            photoURL: currentUser.photoURL || '',
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      {user && (
        <Link
          href="/order"
          className="flex-1 relative flex justify-center sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <GoPackage className="w-6 h-6" />
          <span>My Order</span>
        </Link>
      )}

      {user ? (
        <div className="flex items-center space-x-2">
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt="User profile"
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <div className="hidden sm:block text-xs">
            <p className="text-gray-400">Welcome Back</p>
            <span className="font-bold">{user.displayName}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default OrderAuth;
