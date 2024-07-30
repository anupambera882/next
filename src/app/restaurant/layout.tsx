import { Inter } from "next/font/google";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import './style.css'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RestaurantHeader />
      <div className={inter.className}>{children}</div>
      <RestaurantFooter />
    </>
  );
}
