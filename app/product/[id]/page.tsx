"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { GetProductResponse } from '@/model/spec/GetProductDetailResponse';
import { useAlert } from '@/components/ui/AlertProvider';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ui/ProgressBar';
import SpinnerIcon from '@/components/icon/SpinnerIcon';
import axios from 'axios';

export default function Detail({ params }: { params: { id: string } }) {
  const [orderAmount, setOrderAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState<GetProductResponse | null>(null);
  const [price, setPrice] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [textContent, setTextContent] = useState('');


  const { showAlert } = useAlert();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products?product_id=${params.id}`);
        const data = await res.data;
        setProduct(data);
        setLoading(false);
        setPrice(data.variations[0].price);
        setTextContent(data.description);
        calculateLines(data.description);
      } catch (error) {
        setLoading(false);
        showAlert('Failed to fetch product');
      }
    }

    fetchProduct();
  }, []);

  const calculateLines = (content: string) => {
    const lineHeight = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
    const lines = content.split("\n").reduce((totalLines, para) => 
        totalLines + Math.ceil(para.length * parseFloat(getComputedStyle(document.documentElement).fontSize) / (20 * lineHeight)), 0);
    setHasMore(lines > 5);
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    if (orderAmount <= 0) {
      showAlert('Order amount must be greater than 0');
      return;
    }

    try {
      const res = await axios.post(`/api/orders`, {
        product_id: product.id,
        variations: [{
          variation_id: product.variations[0].variation_id,
          amount: orderAmount
        }]
      });
      const data = await res.data;
      showAlert('Order success');
      setTimeout(() => router.push('/'), 1500);
    } catch (error) {
      showAlert('Order failed');
    }

  }

  if (!product) {
    return <main className="p-4">
      <SpinnerIcon />
    </main>;
  }

  return (
    <div>
      <img src={product.image_url} alt="Campaign image" className="w-full" />
      <div className="flex flex-col px-4">
        <h2 className="text-4xl font-bold mt-1 mb-4">{product.name}</h2>
        <p className="text-2xl font-bold">{product.order_count} orders</p>
        <p className="text-secondary">{text}</p>
        <ProgressBar 
          className="h-3"
          min={product.min_order}
          max={product.max_order}
          currentValue={product.order_count}
          additionalValue={orderAmount}
        />
        <h3 className="text-2xl mt-1">Price: <span className="font-bold">{formatIDR(price)}</span></h3>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <p>{formatIDR(totalPrice)}</p>
            <div className='ml-auto'>
              <Button type='button' rounded="left" className="py-2 px-4" onClick={stepDown}>-</Button>
              <input type="number" className="text-center w-16 py-2 border-0" value={orderAmount} />
              <Button type='button' rounded="right" className="py-2 px-4" onClick={stepUp}>+</Button>
            </div>
          </div>
          <Button variant="primary" className="py-3">
            Order
          </Button>
        </form>
        <section className="mt-10">
          <h3 className="text-2xl font-bold mb-4">About the PreOrder</h3>
          <p className={`text-lg whitespace-pre-line ${isExpanded ? "" : "line-clamp-5 overflow-hidden"}`}>{product.description}</p>
          <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className={`mt-2 px-4 py-1 bg-black border-white border text-white font-medium rounded-lg shadow-md hover:bg-white hover:text-black hover:border-black ${!hasMore ? 'hidden' : ''}`}
            >
                {isExpanded ? "Read Less ▲" : "Read More ▼"}
            </button>  
        </section>
      </div>
    </div>
  )
}
