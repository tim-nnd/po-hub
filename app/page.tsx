"use client";

import { useAuth } from "@/components/ui/AuthProvider";
import { HomeListItem } from "@/components/home/HomeListItem";
import { useEffect, useState } from "react";
import { GetProductFeedItem } from "@/model/spec/GetProductFeedItem";
import SpinnerIcon from "@/components/icon/SpinnerIcon";
import axios from "axios";
import { useAlert } from "@/components/ui/AlertProvider";

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<GetProductFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products/feeds');
        const data = await res.data;
        setLoading(false);
        setProducts(data);
      } catch (error) {
        setLoading(false);
        showAlert('Failed to fetch products');
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-2">PreOrdr</h1>
      <hr className="mb-6" />
      {!!loading ? (
        <SpinnerIcon />
      ) : (
        <div className="w-full">
          {(!products || products.length == 0) && <div>There are no products</div>}
          {!!products && products.length > 0 && products.map((product, index) => (
            <HomeListItem
              key={index}
              id={product.id}
              title={product.name}
              subtitle={product.description}
              progress={Math.floor((product.order_count / product.max_order) * 100)}
              image={product.image_url}
            />
          ))}
        </div>
      )}
    </main>
  );
}
