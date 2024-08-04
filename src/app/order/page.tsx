"use client";
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { useRouter } from "next/navigation";

export default function Order() {
  const [userStorage, setUserStorage] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : undefined
  );
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
  const [totalPrice, setTotalPrice] = useState(() =>
    cartStorage.reduce((a, b) => a + b.price, 0)
  );
  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

  const orderNow = async () => {
    const userId = userStorage?.id;
    const restaurantId = cartStorage[0]?.restaurantId;
    const foodIds = cartStorage.map((item) => item.id);
    const status = "confirm";
    const amount = (totalPrice + 100 + totalPrice * (10 / 100)).toString();
    const res = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify({ userId, restaurantId, foodIds, status, amount }),
    });
    const { success, result } = await res.json();
    if (success) {
      setRemoveCartData(true);
      router.push("/myprofile");
    }
  };

  return (
    <div>
      <CustomerHeader
        cartData={undefined}
        removeCartData={undefined}
        isRemoveCartData={removeCartData}
      />
      <div className="total-price-wrapper">
        <div className="block-1">
          <h2>User Details</h2>
          <div className="row">
            <span>Name: </span>
            <span>{userStorage.name}</span>
          </div>
          <div className="row">
            <span>Address: </span>
            <span>{userStorage.address}</span>
          </div>
          <div className="row">
            <span>Mobile: </span>
            <span>{userStorage.mobile}</span>
          </div>
          <h2>Amount details: </h2>
          <div className="row">
            <span>Tax: </span>
            <span>{totalPrice * (10 / 100)}</span>
          </div>
          <div className="row">
            <span>Delivery Charges: </span>
            <span>100</span>
          </div>
          <div className="row">
            <span>Total Amount</span>
            <span>{totalPrice + 100 + totalPrice * (10 / 100)}</span>
          </div>
          <h2>Payment Methods</h2>
          <div className="row">
            <span>Cash on Delivery: </span>
            <span>{totalPrice + 100 + totalPrice * (10 / 100)}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Place Your Order now</button>
        </div>
      </div>
    </div>
  );
}
