"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { addItemToBasket } from "@/redux/features/BasketSlices";
import { RootState } from "@/redux/store";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const products = useSelector((state: RootState) => state.products.items);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (query) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search results for "{query}"</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full bg-white shadow-lg flex flex-col justify-center items-center px-3 py-2 h-full"
            >
              <Link
                href={`/product/${product.id}`}
                className="group w-full text-center"
              >
                <Image
                  src={product.image}
                  alt={`${product.title} image`}
                  width={200}
                  height={200}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <h2 className="text-[13px] font-bold mt-2">{product.title}</h2>
                <p className="text-[12px] line-clamp-2 text-gray-500">
                  {product.description}
                </p>
                <p className="font-bold text-xl mt-1">${product.price}</p>
              </Link>
              <button
                onClick={() =>
                  dispatch(
                    addItemToBasket({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                    })
                  )
                }
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Basket
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No results found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchPage;
