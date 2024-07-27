"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { GetOrderDetailResponse } from '@/model/spec/GetOrderDetailResponse';
import SpinnerIcon from '@/components/icon/SpinnerIcon';

export default function Detail({ params }: { params: { id: string } }) {
  const [orderAmount, setOrderAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState<GetOrderDetailResponse | null>(null);
  const [price, setPrice] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/orders?order_id=${params.id}`);
      const data = await res.json();
      setLoading(false);
      setOrder(data);
      // setPrice(data.variations[0].price);
    }

    fetchOrder();
  }, []);

  useEffect(() => {
    setTotalPrice(price * orderAmount)
  }, [orderAmount]);

  useEffect(() => {
    setTotalPrice(price * orderAmount)
  }, [price]);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  useEffect(() => {
    if (!order) return;
    if (order.product_detail?.order_count || 0 < order.product_detail?.min_order || 0) {
      setText(`has been ordered, needs ${order.product_detail?.min_order || 0 - order.product_detail?.order_count || 0} more to proceed`);
    } else {
      setText(`has been ordered, only ${order.product_detail?.max_order || 0 - order.product_detail?.order_count || 0} left!`);
    }
  }, [order]);

  if (!order) {
    return <main className="p-4">
      <SpinnerIcon />
    </main>;
  }

  // TODO: not implemented yet
  const cancelOrder = async () => {
    const res = await fetch(`/api/orders/cancel?order_id=${params.id}`);
    const data = await res.json();
    if (res.status === 200) {
      console.log("cancelled order");
      // TODO: cher to implement refresh content  
    }
  }

  return (
    <div>
      <img src={order.product_detail?.image_url} alt="Campaign image" className="w-full" />
      <div className="flex flex-col px-4">
        <h2 className="text-4xl font-bold mt-1 mb-4">{order.product_detail?.name}</h2>
        <p className="text-2xl font-bold">{order.product_detail?.order_count} orders</p>
        <p className="text-secondary">{text}</p>
        <div className="relative overflow-hidden h-3 mb-4 rounded bg-blue-200">
          <div style={{ width: `${((order.product_detail?.order_count + orderAmount) / order.product_detail?.max_order) * 100}%` }} className="absolute top-0 left-0 h-full bg-blue-300 transition-all duration-300"></div>
          <div style={{ width: `${(order.product_detail?.order_count / order.product_detail?.max_order) * 100}%` }} className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"></div>
        </div>
        <div className="flex justify-between items-center">
          <h2>{order.product_detail?.variations[0].amount} item(s) ordered</h2>
          <h3 className="text-2xl">Price: <span className="font-bold">{formatIDR(order.total_price)}</span></h3>
        </div>
        <div className="my-4">
          <span className={`px-4 py-2 whitespace-nowrap font-cambria text-lg rounded-full shadow-lg ${order.state == 'Cancelled by buyer' ? 'bg-gray-300 text-gray-700' : 'bg-green-700 text-white'}`}>
            {order.state}
          </span>
        </div>
        {/* <div className="flex items-center mb-4">
          <p>{formatIDR(totalPrice)}</p>
          <div className='ml-auto'>
            <button className="py-2 px-4 text-white bg-blue-900 rounded-l-lg hover:bg-blue-700" onClick={stepDown}>-</button>
            <input type="number" id="donationAmount" className="text-center w-16 py-2 border-t border-b border-gray-300" value={orderAmount} />
            <button className="py-2 px-4 text-white bg-blue-900 rounded-r-lg hover:bg-blue-700" onClick={stepUp}>+</button>
          </div>
        </div> */}
        {/* { order.state !== "Cancelled by buyer" &&
          <div onClick={cancelOrder}>
            <Button variant="primary" className="py-3">
              Cancel
            </Button>
          </div>
        } */}
        <section className="mt-10">
          <h3 className="text-2xl font-bold mb-4">About the PreOrder</h3>
          <p className="text-lg mb-4">{order.product_detail?.description}</p>
        </section>
      </div>
    </div>
  )
}
