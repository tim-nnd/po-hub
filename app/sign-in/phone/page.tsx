"use client";

import { Button } from "@/components/ui/Button";
import { useAlert } from "@/components/ui/AlertProvider";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPhonePage() {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    phone_number: ''
  });

  const handleChange = (e: any) => {
    const target = e.target;
    let value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/users`, form);
      showAlert('Profile updated successfully!');
      setLoading(false);
      setTimeout(() => router.push('/'), 1500);
    } catch (exception) {
      showAlert('Failed to update profile.');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 rounded-lg">
      <h1 className="mb-8 text-3xl font-bold">PreOrdr</h1>
      <div className="text-center">
        <h2 className="mb-2 text-xl font-bold">
          Hi, <span className="text-secondary">{!!form.username ? form.username : ``}</span>!
        </h2>
        <p className="mb-8">We will need the following information for you to use our app</p>
      </div>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-secondary">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your name here"
              className="w-full px-3 py-2 rounded-md mb-4"
              value={form.username}
              onChange={handleChange}
            />
            <label htmlFor="phone" className="block mb-1 text-sm font-medium text-secondary">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="ex: +62 8785670921"
              className="w-full px-3 py-2 rounded-md"
              value={form.phone_number}
              onChange={handleChange}
            />
          </div>
          <p className="mb-8 text-sm text-secondary">this will be used for others to contact you</p>
          <Button variant="primary" className="w-full px-4 py-2">
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  )
}
