"use client";

import { useAuth } from "@/components/ui/AuthProvider";
import { useEffect, useState } from "react";
import GetOrderMeResponse from "@/model/spec/GetOrderMeResponse";
import { OrderListItem } from "@/components/order/OrderListItem";

export default function Home() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<GetOrderMeResponse[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/orders/me');
      const data = await res.json();
      setOrders(data);
    }

    fetchProducts();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-2">My Orders</h1>
      <hr className="mb-6" />
      <div className="w-full">
        {orders.map((order, index) => (
          <OrderListItem
            key={index}
            id={order.id}
            title={order.product_detail.name}
            subtitle={order.product_detail.description}
            min = {order.product_detail.min_order}
            max = {order.product_detail.max_order}
            currentValue = {order.product_detail.order_count}
            image={order.product_detail.image_url}
          />
        ))}
      </div>
    </main>
  );
}
