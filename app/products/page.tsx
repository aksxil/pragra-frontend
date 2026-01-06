"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import Navbar from "../components/Navbar";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const buy = async (id: string) => {
    const res = await api.post(`/orders/checkout/${id}`);
    window.location.href = res.data.checkoutUrl;
  };

  return (
    <>
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-8 py-8">
        <h2 className="text-4xl font-bold mb-8">Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* IMAGE */}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
                <p className="text-zinc-400 mb-4">${p.price}</p>

                <button
                  onClick={() => buy(p._id)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
