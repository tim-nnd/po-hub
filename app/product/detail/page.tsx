"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";

export default function Detail() {
  const orders = 15, minimum = 4, maximum = 20; // TODO: change from response
  const price = 15000; // TODO: change from response
  var text = ""
  const [orderAmount, setOrderAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    updatePrice()
  }, [orderAmount]);

  const updatePrice = () => {
    setTotalPrice(price * orderAmount)
  }

  const stepUp = () => {
    if (orderAmount + orders < maximum) {
      setOrderAmount(orderAmount + 1);
    }
  }

  const stepDown = () => {
    if (orderAmount > 0) {
      setOrderAmount(orderAmount - 1);
    }
  }

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  if (orders < minimum) {
    text = `has been ordered, needs ${minimum-orders} more to proceed`
  } else {
    text = `has been ordered, only ${maximum-orders} left!`
  }

  return (
    <div>
      <img src="/chikapu.jpg" alt="Campaign image" className="w-full"/>
      <div className="flex flex-col px-4">
        <h2 className="text-4xl font-bold mt-1 mb-4">PreOrder Title</h2>
        <p className="text-lg mb-4">A brief description about the PreOrder. This section introduces the PO and its goal to the customers.</p>
        <p className="text-2xl font-bold">{orders} orders</p>
        <p className="text-secondary">{text}</p>
        <div className="relative overflow-hidden h-3 mb-4 rounded bg-blue-200">
          <div style={{ width: `${((orders+orderAmount)/maximum)*100}%` }} className="absolute top-0 left-0 h-full bg-blue-300 transition-all duration-300"></div>
          <div style={{ width: `${(orders/maximum)*100}%` }} className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"></div>
        </div>
        <h3 className="text-2xl mt-1">Price: <span className="font-bold">{formatIDR(price)}</span></h3>
        <div className="flex items-center mb-4">
          <p>{formatIDR(totalPrice)}</p>
          <div className='ml-auto'>
            <button className="py-2 px-4 text-white bg-blue-900 rounded-l-lg hover:bg-blue-700" onClick={stepDown}>-</button>
            <input type="number" id="donationAmount" className="text-center w-16 py-2 border-t border-b border-gray-300" value={orderAmount}/>
            <button className="py-2 px-4 text-white bg-blue-900 rounded-r-lg hover:bg-blue-700" onClick={stepUp}>+</button>
          </div>
        </div>
        <Button variant="primary" className="py-3">
          Order
        </Button>
        <section className="mt-10">
          <h3 className="text-2xl font-bold mb-4">About the PreOrder</h3>
          <p className="text-lg mb-4">This section provides a detailed description of the product, including the qualities, delivery detail, and any other relevant information.</p>
        </section>
      </div>
    </div>
  )
}
