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
    <main className="flex min-h-screen flex-col items-center justify-between px-4">
      <div className = "w-full">
        {orders.map((order, index) => (
          <OrderListItem
            key = {index}
            id = {order.id}
            title = {order.product_detail.name}
            subtitle = {order.product_detail.description}
            progress = {Math.floor((order.product_detail.order_count / order.product_detail.max_order) * 100)} 
            image = {order.product_detail.image_url}
          />
        ))}
      </div>
    </main>
  );
}
