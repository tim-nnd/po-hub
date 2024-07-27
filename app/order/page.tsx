"use client";

import { useAuth } from "@/components/ui/AuthProvider";
import { useEffect, useState } from "react";
import GetOrderMeResponse from "@/model/spec/GetOrderMeResponse";
import { OrderListItem } from "@/components/order/OrderListItem";
import SpinnerIcon from "@/components/icon/SpinnerIcon";

export default function Home() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<GetOrderMeResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/orders/me');
      const data = await res.json();
      setLoading(false);
      setOrders(data);
    }

    fetchProducts();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-2">My Orders</h1>
      <hr className="mb-6" />
      {!!loading ? (
        <SpinnerIcon />
      ) : (
        <div className="w-full">
          {orders.map((order, index) => (
            <OrderListItem
              key={index}
              id={order.id}
              title={order.product_detail.name}
              subtitle={order.product_detail.description}
              progress={Math.floor((order.product_detail.order_count / order.product_detail.max_order) * 100)}
              image={order.product_detail.image_url}
            />
          ))}
        </div>
      )}
    </main>
  );
}
