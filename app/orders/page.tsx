'use client';

import { useEffect, useState } from 'react';
import api from '@/utils/api';
import Navbar from "../components/Navbar";


export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my-orders')
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-zinc-400">Loading orders...</p>;
  }

  return (
    <div className='h-screen w-full'><Navbar/>
      <div className="w-full max-w-4xl py-20 px-32">
       
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-zinc-400">No orders found.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-zinc-900 p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                Amount: ${order.amount}
              </p>
              <p className="text-sm text-zinc-400">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-400">
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
    </div>
  
  );
}
