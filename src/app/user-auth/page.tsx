"use client";
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import UserRegister from "../_components/UserRegister";
import UserLogin from "../_components/UserLogin";

export default function UserAuth({
  searchParams: { order },
}: {
  searchParams: { order: boolean };
}) {
  const [login, setLogin] = useState(true);
  return (
    <>
      <CustomerHeader cartData={undefined} removeCartData={undefined} />
      <div className="container">
        <h1>{login ? "User logon" : "User Register"}</h1>
        {login ? (
          <UserRegister redirect={{ order }} />
        ) : (
          <UserLogin redirect={{ order }} />
        )}
        <button className="button-link" onClick={() => setLogin(() => !login)}>
          {login
            ? "Do not have an account? Register"
            : "Already have account ? Login"}
        </button>
      </div>
    </>
  );
}
