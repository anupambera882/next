"use client";
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";

export default function Page() {
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

  console.log({ totalPrice });

  return (
    <div>
      <CustomerHeader cartData={undefined} removeCartData={undefined} />
      <div className="food-item-wrapper">
        {cartStorage.length ? (
          cartStorage.map((item, _) => (
            <div key={_} className="list-item">
              <div className="list-item-block-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.path} alt="food image" width={100} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                <button>Remove from cart</button>
              </div>
              <div className="list-item-block-3">Price: {item.price}</div>
            </div>
          ))
        ) : (
          <h1>No food item added in your card</h1>
        )}
      </div>
      <div className="total-price-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food charges: </span>
            <span>{totalPrice}</span>
          </div>
          <div className="row">
            <span>Tax: </span>
            <span>{totalPrice * (10 / 100)}</span>
          </div>
          <div className="row">
            <span>Delivery Charges: </span>
            <span>100</span>
          </div>
          <div className="row">
            <span>Total price</span>
            <span>{totalPrice + 100 + totalPrice * (10 / 100)}</span>
          </div>
        </div>
        <div className="block-2">
          <button>Order now</button>
        </div>
      </div>
    </div>
  );
}
