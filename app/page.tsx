"use client";

import { useAuth } from "@/components/ui/AuthProvider";
import { HomeListItem } from "@/components/home/HomeListItem";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4">
      <div className = "w-full">
        <HomeListItem
          title = 'Mie'
          subtitle = 'lorem ipsum dolor sit amet'
          progress = {40}
          image = '/chikapu.jpg'
        />
        <HomeListItem
          title = 'Ayam'
          subtitle = 'lorem ipsum dolor sit amet'
          progress = {20}
          image = '/chikapu.jpg'
        />
        <HomeListItem
          title = 'Pangsit'
          subtitle = 'lorem ipsum dolor sit amet'
          progress = {70}
          image = '/chikapu.jpg'
        />
        <HomeListItem
          title = 'Ayam'
          subtitle = 'lorem ipsum dolor sit amet'
          progress = {20}
          image = '/chikapu.jpg'
        />
        <HomeListItem
          title = 'Ayam'
          subtitle = 'lorem ipsum dolor sit amet'
          progress = {20}
          image = '/chikapu.jpg'
        />
        <HomeListItem
          title = 'Ayam'
          subtitle = 'lorem ipsum dolor sit amet'
          progress = {20}
          image = '/chikapu.jpg'
        />
        <HomeListItem
          title = 'Ayam'
          subtitle = 'lorem ipsum dolor sit amet'
          progress = {20}
          image = '/chikapu.jpg'
        />
        <HomeListItem
          title = 'Ayam'
          subtitle = 'lorem ipsum dolor sit amet'
          progress = {20}
          image = '/chikapu.jpg'
        />
      </div>
    </main>
  );
}
