"use client"
import AddFoodItem from "@/app/_components/AddFoodItem"
import { useState } from "react"

export default function RestaurantDashboard() {
  const [addItem, setAddItem] = useState(false);
  return (
    <>
      <button onClick={() => setAddItem(true)}>Add food</button>
      <button onClick={() => setAddItem(false)}>Dashboard</button>
      {
        addItem ? <AddFoodItem /> : <h1>This is from RestaurantDashboard</h1>
      }
    </>
  )
}
