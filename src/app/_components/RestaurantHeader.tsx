"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RestaurantHeader() {
  const [details, setDetails] = useState<{ name: string }>({ name: '' });
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    const data = localStorage.getItem('restaurantUser');
    if (!data && pathName === '/restaurant/dashboard') {
      router.push('/restaurant');
    } else if (data && pathName === '/restaurant') {
      router.push('/restaurant/dashboard');
    } else if (data) {
      setDetails(JSON.parse(data));
    }

  }, [pathName, router]);

  const logout = () => {
    localStorage.removeItem('restaurantUser');
    router.push('/restaurant');
  }

  return (
    <div className="header-wrapper">
      <div className="logo">
        <Image src="/logo.jpg" alt="logo" width={100} height={100} />
      </div>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          {details?.name ? <> <button onClick={logout}>Logout</button> <Link href={'/'}>Profile</Link> </> : <Link href={'/'}>Login/Register</Link>}
        </li>
      </ul>
    </div>
  )
}
