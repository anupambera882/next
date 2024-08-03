import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerHeader({
  cartData,
  removeCartData,
}: {
  cartData:
    | {
        id: number;
        name: string;
        price: number;
        path: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: number;
      }
    | undefined;
  removeCartData: number | undefined;
}) {
  const userStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : undefined;
  const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [user, setUser] = useState(userStorage);
  const [cartNumber, setCartNumber] = useState<number>(
    cartStorage ? cartStorage?.length : 0
  );
  const [cartItem, setCartItem] = useState<
    {
      id: number;
      name: string;
      price: number;
      path: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
      restaurantId: number;
    }[]
  >(cartStorage ? cartStorage : []);
  const router = useRouter();

  useEffect(() => {
    if (cartData) {
      if (cartNumber) {
        if (cartItem[0]?.restaurantId !== cartData.restaurantId) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([cartData]);
          localStorage.setItem("cart", JSON.stringify([cartData]));
        } else {
          localStorage.setItem("cart", JSON.stringify([...cartItem, cartData]));
          setCartItem((prev) => [...prev, cartData]);
          setCartNumber((prev) => ++prev);
        }
      } else {
        setCartNumber(1);
        setCartItem([cartData]);
        localStorage.setItem("cart", JSON.stringify([cartData]));
      }
    }
  }, [cartData]);

  useEffect(() => {
    if (removeCartData) {
      localStorage.setItem(
        "cart",
        JSON.stringify(cartItem.filter((item) => item.id !== removeCartData))
      );
      setCartItem((prev) => prev.filter((item) => item.id !== removeCartData));
      setCartNumber((prev) => --prev);
    }
  }, [removeCartData]);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  return (
    <div className="header-wrapper">
      <div className="logo">
        <Image src="/logo.jpg" alt="logo" width={100} height={100} />
      </div>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        {user ? (
          <>
            {" "}
            <li>
              <Link href={"/#"}>{user?.name}</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link href={"/user-auth"}>Login/SignUp</Link>
          </li>
        )}
        <li>
          <Link href={"/cart"}>Cart({cartNumber})</Link>
        </li>
        <li>
          <Link href={"/"}>Add restaurant</Link>
        </li>
      </ul>
    </div>
  );
}
