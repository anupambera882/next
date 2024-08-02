"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";

export default function Page({
  params: { name },
  searchParams: { id },
}: {
  params: { name: string };
  searchParams: { id: string };
}) {
  const [restaurantDetails, setRestaurantDetails] = useState<{
    id: number;
    name: string;
    city: string;
    address: string;
    contactNo: string;
    email: string;
    Food: {
      id: number;
      name: string;
      price: number;
      path: string;
      description: String;
      createdAt: string;
      updatedAt: string;
    }[];
  }>({
    address: "",
    city: "",
    contactNo: "",
    email: "",
    Food: [],
    id: 0,
    name: "",
  });
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/customer/${id}`);
      const { success, result } = await res.json();
      if (success) {
        setRestaurantDetails(result);
      }
    })();
  }, [id]);

  return (
    <>
      <CustomerHeader />
      <div className="restaurant-page-banner">
        <h1>{restaurantDetails.name}</h1>
      </div>
      <div>
        <h3>{restaurantDetails.contactNo}</h3>
        <h3>{restaurantDetails.city}</h3>
        <h3>{restaurantDetails.address}</h3>
        <h3>{restaurantDetails.email}</h3>
      </div>
      <div>
        {restaurantDetails.Food.map((item) => (
          <>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.description}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.path} alt="food image" width={100} />
          </>
        ))}
      </div>
    </>
  );
}
