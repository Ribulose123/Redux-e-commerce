'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaPlusCircle , FaMinusCircle } from "react-icons/fa";
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateItemQuantity } from '@/redux/features/BasketSlices';
import { FaArrowLeft } from "react-icons/fa";


const ProductDetails: React.FC = () => {
  const { slug } = useParams();
  const route = useRouter()
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch()
  const [product, setProduct] = useState(() => {
    const storedProduct = localStorage.getItem(`product_${slug}`);
    return storedProduct ? JSON.parse(storedProduct) : null;
  });

  const [quantity, setQuantity] = useState <number>(1)

  useEffect(() => {

    if(product === null){
        const foundProduct = products.find((product) => product.id === Number(slug));

        if (foundProduct) {
          setProduct(foundProduct);
          
          localStorage.setItem(`product_${slug}`, JSON.stringify(foundProduct));
        } else if (product) {
          setProduct(JSON.parse(localStorage.getItem(`product_${slug}`) || '{}'));
        }
    }
    
  }, [slug, products, product]);


  const handleIncrease =()=>{
    setQuantity ( quantity + 1)
    dispatch(updateItemQuantity({id: product.id, quantity: quantity +1}))
  }

  const handleDecrease =()=>{
    setQuantity (quantity > 0 ? quantity -1 : 0)
    dispatch(updateItemQuantity({id: product.id, quantity: quantity + 1 }))
  }

  const handleReturn = ()=>{
      route.push ('/')
  }

  if (!product) return <p>Product not found</p>;

  return (
    <div className='mt-6'>

      <div className='flex items-center g-2 ml-3 border w-2/5 p-2 m-auto justify-center'>
      <p>Return to Home</p>
      <FaArrowLeft onClick={handleReturn} className='m-2 text-[1.5rem] cursor-pointer'/>
      </div>
    

        <div className='hover:scale-105 flex justify-center'>
            <Image
            src={product.image}
            alt='product img'
            width={200}
            height={24}
            className='object-contain transition-transform duration-300 group-hover:scale-105 w-[250px] sm:w-[300px]'
        />
        </div>
        <div className='w-full bg-white shadow-xl flex flex-col justify-betwwen gap-3  px-3 py-2 h-full mt-5'>
        
            <h2 className='text-2xl font-bold'>{product.title}</h2>
            <p className='font-bold text-xl'>${product.price}</p>
            <p className='text-[12px] line-clamp-2 text-gray-500'>{product.description}</p>
                
            <div className='flex justify-center gap-4 mb-5' >
            <button className='text-3xl' onClick={handleIncrease}>
                <FaPlusCircle className='text-violet-600'/>
            </button>
            <span>{quantity}</span>
            <button onClick={handleDecrease}  className='text-3xl'>
                <FaMinusCircle className='text-blue-500 hover:text-blue-700'/>
            </button>
        </div>
        </div>

       
    </div>
    
  );
};

export default ProductDetails;
