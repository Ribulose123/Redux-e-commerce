'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';

const OrderPage: React.FC = () => {
  const orders = useSelector((state: RootState) => state.order.orders);
  const userId = useSelector((state: RootState) => state.auth.user?.uid);

  const userOrders = userId ? orders.filter((order) => order.userId === userId) : [];

  useEffect(() => {
    // Sync orders with local storage
    if (orders) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {userOrders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {userOrders.map((order) => (
            <div key={order.id} className="order-item">
              <Image
                src={order.image}
                alt={order.title}
                width={80}
                height={80}
                className="order-image"
              />
              <div className="order-details">
                <h2>{order.title}</h2>
                <p>Price: ${order.price.toFixed(2)}</p>
                <p>Quantity: {order.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
