'use client'
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantRegister from "../_components/RestaurantRegister";

export default function Restaurant() {
  const [login, setLogin] = useState(true);
  return (
    <div className="container">
      <div>Restaurant page</div>
      <div>
        {login ? <RestaurantLogin /> : <RestaurantRegister />}
      </div>
      <button onClick={() => setLogin((login) => !login)} className="button-link">{login ? `don't have an account register` : 'Already have account? login'}</button>
    </div>
  )
}
