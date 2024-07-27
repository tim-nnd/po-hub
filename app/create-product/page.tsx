"use client";

import { useAlert } from "@/components/ui/AlertProvider";
import { useAuth } from "@/components/ui/AuthProvider";
import { Button } from "@/components/ui/Button";
import { getFirebaseClientApp } from "@/lib/getFirebaseClientApp";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateProductPage() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    image_url: '',
    closed_at: '',
    available_at: '',
    min_order: '',
    max_order: '',
    variationName: '',
    variationPrice: '',
    variationImageUrl: ''
  });

  useEffect(() => {
    getFirebaseClientApp();
  }, [user]);

  const handleChange = (e: any) => {
    const target = e.target;
    let value = target.value;
    const name = target.name;

    if (target.type === 'file' && target.files.length > 0) {
      const file = target.files[0];
      const storageRef = ref(getStorage(), `products/`);
      const fileRef = ref(storageRef, file.name);
      uploadBytes(fileRef, file, {}).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setForm({
            ...form,
            [name]: downloadURL,
          });
        });
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const variations = [{
      name: form.name,
      price: form.variationPrice,
      image_url: form.image_url
    }];

    const newForm = {
      name: form.name,
      description: form.description,
      image_url: form.image_url,
      closed_at: form.closed_at,
      available_at: form.available_at,
      min_order: form.min_order,
      max_order: form.max_order,
      variations
    };

    setLoading(true);
    try {
      await axios.post(`/api/products`, newForm);
      showAlert('Product created successfully!');
      setLoading(false);
      setTimeout(() => router.push('/'), 1500);
    } catch (exception) {
      showAlert('Failed to create product.');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 rounded-lg">
      <h1 className="mb-8 text-3xl font-bold">PreOrdr</h1>
      <div className="text-center">
        <h2 className="mb-2 text-xl font-bold">
          Create your pre-order!
        </h2>
      </div>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="image_url" className="block mb-1 text-sm font-medium text-secondary">
              Image
            </label>
            <input
              type="file"
              id="image_url"
              name="image_url"
              placeholder="Image URL"
              className="w-full px-3 py-2 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-secondary">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full px-3 py-2 rounded-md"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-secondary">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              className="w-full px-3 py-2 rounded-md h-56 resize-none"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="closed_at" className="block mb-1 text-sm font-medium text-secondary">
              Closed At
            </label>
            <input
              type="datetime-local"
              id="closed_at"
              name="closed_at"
              placeholder="Closed At"
              className="w-full px-3 py-2 rounded-md"
              value={form.closed_at}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="available_at" className="block mb-1 text-sm font-medium text-secondary">
              Available At
            </label>
            <input
              type="datetime-local"
              id="available_at"
              name="available_at"
              placeholder="Available At"
              className="w-full px-3 py-2 rounded-md"
              value={form.available_at}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="min_order" className="block mb-1 text-sm font-medium text-secondary">
              Min Order
            </label>
            <input
              type="number"
              id="min_order"
              name="min_order"
              placeholder="Min Order"
              className="w-full px-3 py-2 rounded-md"
              value={form.min_order}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="max_order" className="block mb-1 text-sm font-medium text-secondary">
              Max Order
            </label>
            <input
              type="number"
              id="max_order"
              name="max_order"
              placeholder="Max Order"
              className="w-full px-3 py-2 rounded-md"
              value={form.max_order}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="variationPrice" className="block mb-1 text-sm font-medium text-secondary">
              Price
            </label>
            <div className="flex items-center">
              <span className="mr-4">Rp. </span>
              <input
                type="number"
                id="variationPrice"
                name="variationPrice"
                placeholder="10000"
                className="w-full px-3 py-2 rounded-md"
                value={form.variationPrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button variant="primary" className="w-full px-4 py-2 mt-16">
            Create Product
          </Button>
        </form>
      </div>
    </div>
  )
}