"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { GetProductResponse } from '@/model/spec/GetProductDetailResponse';

export default function Detail({ params }: { params: { id: string } }) {
  const [orderAmount, setOrderAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState<GetProductResponse | null>(null);
  const [price, setPrice] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products?product_id=${params.id}`);
      const data = await res.json();
      setProduct(data);
      setPrice(data.variations[0].price);
    }

    fetchProduct();
  }, []);

  useEffect(() => {
    setTotalPrice(price * orderAmount)
  }, [orderAmount]);

  useEffect(() => {
    setTotalPrice(price * orderAmount)
  }, [price]);

  const stepUp = () => {
    if (!product) return;
    if (orderAmount + product?.order_count < product?.max_order) {
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

  useEffect(() => {
    if (!product) return;
    if (product.order_count < product.min_order) {
      setText(`has been ordered, needs ${product.min_order - product.order_count} more to proceed`);
    } else {
      setText(`has been ordered, only ${product.max_order - product.order_count} left!`);
    }
  }, [product]);

  if (!product) {
    return <div></div>;
  }

  return (
    <div>
      <img src={product.image_url} alt="Campaign image" className="w-full" />
      <div className="flex flex-col px-4">
        <h2 className="text-4xl font-bold mt-1 mb-4">{product.name}</h2>
        <p className="text-2xl font-bold">{product.order_count} orders</p>
        <p className="text-secondary">{text}</p>
        <div className="relative overflow-hidden h-3 mb-4 rounded bg-blue-200">
          <div style={{ width: `${((product.order_count + orderAmount) / product.max_order) * 100}%` }} className="absolute top-0 left-0 h-full bg-blue-300 transition-all duration-300"></div>
          <div style={{ width: `${(product.order_count / product.max_order) * 100}%` }} className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"></div>
        </div>
        <h3 className="text-2xl mt-1">Price: <span className="font-bold">{formatIDR(price)}</span></h3>
        <div className="flex items-center mb-4">
          <p>{formatIDR(totalPrice)}</p>
          <div className='ml-auto'>
            <button className="py-2 px-4 text-white bg-blue-900 rounded-l-lg hover:bg-blue-700" onClick={stepDown}>-</button>
            <input type="number" id="donationAmount" className="text-center w-16 py-2 border-t border-b border-gray-300" value={orderAmount} />
            <button className="py-2 px-4 text-white bg-blue-900 rounded-r-lg hover:bg-blue-700" onClick={stepUp}>+</button>
          </div>
        </div>
        <Button variant="primary" className="py-3">
          Order
        </Button>
        <section className="mt-10">
          <h3 className="text-2xl font-bold mb-4">About the PreOrder</h3>
          <p className="text-lg mb-4">{product.description}</p>
        </section>
      </div>
    </div>
  )
}
