'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import OrderAuth from './OrderAuth';
import { useSearchParams, useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
  const [query, setQuery] = useState('');

  const router = useRouter();

  const basketItemsCount = useSelector((state: RootState) => state.basket.items.length);


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex flex-wrap justify-between items-center w-full">
    
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          Shopr
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="w-full sm:flex-1 sm:mx-4 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </form>

        <div className="flex items-center space-x-4 mt-4 sm:flex-none ml-5 sm:-mt-1">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:px-4"
          >
            <IoCartOutline className="w-6 h-6" />
            <span>My Basket</span>

            
            <span className="absolute top-0 -right-3 bg-red-500 rounded-full px-2 py-1 text-xs font-bold text-white">
              {basketItemsCount}
            </span>
          </Link>
          <OrderAuth />
        </div>
      </div>
    </header>
  );
};

export default Header;
