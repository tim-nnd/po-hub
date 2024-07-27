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
      <h1 className="text-4xl font-bold mb-2">My Orders</h1>
      <hr className="mb-6" />
      {!!loading ? (
        <SpinnerIcon />
      ) : (
        <div className="w-full">
          {(!orders || orders.length == 0) && <div>There are no orders</div>}
          {!!orders && orders.length > 0 && orders.map((order, index) => (
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
