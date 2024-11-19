'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { FaArrowLeft, FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { updateItemQuantity, removeItemFromBasket, clearBasket } from '@/redux/features/BasketSlices';
import { addOrder } from '@/redux/features/OrderSlice';
import Login from '@/components/Login';
import Image from 'next/image';
import PayPalButton from '@/components/PayPalButton';

const Basket: React.FC = () => {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleReturn = () => {
    router.push('/');
  };

  const handleIncrease = (id: string) => {
    const item = basketItems.find((item) => item.id === id);
    if (item) {
      dispatch(updateItemQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrease = (id: string) => {
    const item = basketItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: item.quantity - 1 }));
    } else if (item && item.quantity === 1) {
      dispatch(removeItemFromBasket(id));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(removeItemFromBasket(id));
  };

  const calculateTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSuccess = () => {
    const orderItems = basketItems.map((item) => ({
      ...item,
      userId: item.id, // Ensure userId is added to each item
    }));
  
    dispatch(addOrder(orderItems));
    dispatch(clearBasket());
    router.push('/success');
  };

  return (
    <div className="m-auto p-2">
      <div className="flex items-center gap-2 ml-3 border w-2/5 p-2 m-auto justify-center mb-4">
        <p>Return to Home</p>
        <FaArrowLeft onClick={handleReturn} className="m-2 text-[1.5rem] cursor-pointer" />
      </div>
      {basketItems.length === 0 ? (
        <p>Your basket is empty!</p>
      ) : (
        <div className="mt-3">
          <h1 className="font-semibold text-xl sm:text-2xl text-center">Your Basket</h1>
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start mt-6">
            <div className="basket-container flex-1">
              {basketItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center gap-4 p-4 border rounded-md shadow-md mb-4"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex gap-2 text-xl text-blue-500">
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="hover:text-blue-700"
                    >
                      <FaPlusCircle />
                    </button>
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="hover:text-blue-700"
                    >
                      <FaMinusCircle />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="hover:text-red-600 text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-summary w-full lg:w-1/3 lg:sticky lg:top-5 bg-white p-4 border rounded-md shadow-md lg:order-last">
              <h2 className="text-xl font-semibold mb-4 text-center">Order Summary</h2>
              <p className="text-lg">
                <strong>Grand Total:</strong> ${calculateTotalPrice().toFixed(2)}
              </p>
              
              {isAuthenticated ? (
                <PayPalButton
                  amount={calculateTotalPrice().toFixed(2)}
                  onSuccess={handleSuccess}
                />
              ) : (
                <div className="mt-4">
                  <p className="text-sm text-red-500">You must sign in to checkout.</p>
                  <Login />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
