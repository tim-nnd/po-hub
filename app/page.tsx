"use client";

import { useAuth } from "@/components/ui/AuthProvider";
import { HomeListItem } from "@/components/home/HomeListItem";
import { useEffect, useState } from "react";
import { GetProductFeedItem } from "@/model/spec/GetProductFeedItem";

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<GetProductFeedItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products/feeds');
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4">
      <div className = "w-full">
        {products.map((product, index) => (
          <HomeListItem
            key = {index}
            title = {product.name}
            subtitle = {product.description}
            progress = {Math.floor((product.order_count / product.max_order) * 100)} 
            image = {product.image_url}
          />
        ))}
      </div>
    </main>
  );
}
