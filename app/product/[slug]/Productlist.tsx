'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '@/redux/features/productSlice';
import { addItemToBasket } from '@/redux/features/BasketSlices';
import { RootState, AppDispatch } from '../../../redux/store';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <div>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-4 mb-4 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl"
          aria-label="Select product category"
        >
          <option value="all">All</option>
          {[...new Set(items.map((product) => product.category))].map(
            (category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>

      <AnimatePresence>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((product) => (
            <div
              key={product.id}
              className="w-full bg-white shadow-xl flex flex-col justify-center items-center px-3 py-2 h-full"
            >
              <Link
                href={`/product/${product.id}`} // Adjust the href to point to the dynamic route
                className="hover:scale-105"
              >
                <Image
                  src={product.image}
                  alt={`${product.title} image`}
                  width={200}
                  height={200}
                  className="object-contain transition-transform duration-300 group-hover:scale-105 w-[200px] sm:w-[150px]"
                />
              </Link>
              <h2 className="text-[13px] font-bold">
                <Link href={`/product/${product.id}`}>{product.title}</Link>
              </h2>
              <p className="text-[12px] line-clamp-2 text-gray-500">
                {product.description}
              </p>
              <p className="font-bold text-xl">${product.price}</p>
              <button className="border border-solid bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:px-4"
                  onClick={() =>
                    dispatch(addItemToBasket({id: product.id, title:product.title, price: product.price,  image:product.image}))
                  }
                  aria-label={`Add ${product.title} to basket`}
              >
                Add to Basket
              </button>

            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
