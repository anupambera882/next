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
      description: string;
      createdAt: string;
      updatedAt: string;
      restaurantId: number;
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

  const [cartData, setCartData] = useState<
    | {
        id: number;
        name: string;
        price: number;
        path: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        restaurantId: number;
      }
    | undefined
  >();
  const [cartStorage, setCartStorage] = useState<
    {
      id: number;
      name: string;
      price: number;
      path: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      restaurantId: number;
    }[]
  >(JSON.parse(localStorage.getItem("cart") || "[]"));
  const [cardIds, setCardIds] = useState(() =>
    cartStorage.map((item) => item.id)
  );
  const [removeCartData, setRemoveCartData] = useState<number | undefined>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/customer/${id}`);
      const { success, result } = await res.json();
      if (success) {
        setRestaurantDetails(result);
      }
    })();
  }, [id]);

  const addCartData = (item: {
    id: number;
    name: string;
    price: number;
    path: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    restaurantId: number;
  }) => {
    setCartData(item);
    setCardIds((prev) => [...prev, item.id]);
    setRemoveCartData(undefined);
  };

  const removeFromCart = (id: number) => {
    setRemoveCartData(id);
    setCardIds((prev) => prev.filter((number) => number !== id));
    setCartData(undefined);
  };

  return (
    <>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{restaurantDetails.name}</h1>
      </div>
      <div className="details-wrapper">
        <h4>Contact :{restaurantDetails.contactNo}</h4>
        <h4>City :{restaurantDetails.city}</h4>
        <h4>Address :{restaurantDetails.address}</h4>
        <h4>Email :{restaurantDetails.email}</h4>
      </div>
      <div className="food-item-wrapper">
        {restaurantDetails.Food.length ? (
          restaurantDetails.Food.map((item, _) => (
            <div key={_} className="list-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.path} alt="food image" width={100} />
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {cardIds.includes(item.id) ? (
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove from cart
                  </button>
                ) : (
                  <button onClick={() => addCartData(item)}>Add to cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No food item added for now</h1>
        )}
      </div>
    </>
  );
}
