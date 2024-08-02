"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const [location, setLocation] = useState([]);
  const [selectLocation, setSelectLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [restaurant, setRestaurant] = useState<any[]>([]);
  const [restaurantName, setRestaurantName] = useState('');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/customer/location');
      const { success, result } = await res.json();
      if (success) {
        setLocation(result);
      }
      const response = await fetch(`http://localhost:3000/api/customer?${selectLocation ? `location=${selectLocation}&` : ''}${restaurantName ? `restaurant=${restaurantName}` : ''}`);
      const body = await response.json();
      if (body.success) {
        setRestaurant(body.result);
      }
    })();
  }, [restaurantName, selectLocation])

  return (
    <div>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="main-input-wrapper">
          <input type="text" value={selectLocation} onClick={() => setShowLocation(true)} className="select-input" placeholder="select place" />
          <ul className="location-list">
            {showLocation && location.map((item, _) => (
              <li key={_} onClick={() => {
                setSelectLocation(item);
                setShowLocation(false);
              }}>{item}</li>
            ))}
          </ul>
          <input type="text" onChange={(e) => setRestaurantName(e.target.value)} className="search-input" placeholder="Enter food or restaurant name" />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurant.map((item) =>
        (
          <div key={item.id} onClick={() => router.push(`/explore/${item.name}?id=${item.id}`)} className="restaurant-wrapper">
            <div className="heading-wrapper">
              <h3>{item.name}</h3>
              <h5>Contact:{item.contactNo}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city} , </div>
              <div> {item.address}, Email: {item.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
