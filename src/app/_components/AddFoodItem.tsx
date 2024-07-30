import { useState } from "react"

export default function AddFoodItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [path, setPath] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);

  const handleAddFoodItem = async () => {
    const val = localStorage.getItem('restaurantUser');
    if (!val) {
      return false;
    }
    const { id } = JSON.parse(val);

    if (!name || !price || !path || !description || !id) {
      setError(true);
      return false;
    }
    const res = await fetch('http://localhost:3000/api/restaurant/foods', {
      method: "POST",
      body: JSON.stringify({ name, price, path, description, restaurantId: id }),
    });
    const { result, success } = await res.json();
    if (success) {
      alert('add food item successfully');
    }
  }

  return (
    <div className="container">
      <h1>Add new food item</h1>
      <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter food name" value={name} onChange={(e) => setName(e.target.value)} />
        {error && !name && <span className="input-error">Please Enter valid name</span>}
      </div>
      <div className="input-wrapper">
        <input type="number" className="input-field" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />
        {error && !price && <span className="input-error">Please Enter valid price</span>}
      </div>
      <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter food image path" value={path} onChange={(e) => setPath(e.target.value)} />
        {error && !path && <span className="input-error">Please Enter valid path</span>}
      </div>
      <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter food description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {error && !description && <span className="input-error">Please Enter valid description</span>}
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={handleAddFoodItem}>Add food item</button>
      </div>
    </div>
  )
}

