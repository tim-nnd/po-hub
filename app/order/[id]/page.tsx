"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { GetOrderDetailResponse } from '@/model/spec/GetOrderDetailResponse';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function Detail({ params }: { params: { id: string } }) {
  const [orderAmount, setOrderAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState<GetOrderDetailResponse | null>(null);
  const [price, setPrice] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/orders?order_id=${params.id}`);
      const data = await res.json();
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
    return <div>Not found</div>;
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
        <ProgressBar 
          className="h-3"
          min={order.product_detail?.min_order}
          max={order.product_detail?.max_order}
          currentValue={order.product_detail?.order_count}
        />
        <h3 className="text-2xl mt-1">Price: <span className="font-bold">{formatIDR(order.total_price)}</span></h3>
        <div className="">
          <span className="px-4 py-2 whitespace-nowrap bg-green-700 text-white font-cambria text-lg rounded-full shadow-lg">
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
