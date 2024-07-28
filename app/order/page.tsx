"use client";

import { useAuth } from "@/components/ui/AuthProvider";
import { useEffect, useState } from "react";
import GetOrderMeResponse from "@/model/spec/GetOrderMeResponse";
import { OrderListItem } from "@/components/order/OrderListItem";
import SpinnerIcon from "@/components/icon/SpinnerIcon";
import axios from "axios";
import { useAlert } from "@/components/ui/AlertProvider";

export default function Home() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<GetOrderMeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/orders/me');
        const data = await res.data;
        setLoading(false);
        setOrders(data);
      } catch (error) {
        setLoading(false);
        showAlert('Failed to fetch orders');
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-4xl font-semibold mb-2">My Orders</h1>
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
              min = {order.product_detail.min_order}
              max = {order.product_detail.max_order}
              currentValue = {order.product_detail.order_count}
              image={order.product_detail.image_url}
            />
          ))}
        </div>
      )}
    </main>
  );
}
