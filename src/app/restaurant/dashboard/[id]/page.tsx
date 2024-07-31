'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function UpdateFoodItem({ params: { id } }: { params: { id: string } }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [path, setPath] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`);
      const { success, result } = await res.json();
      if (!success) {
        alert('Error while update');
        return;
      }
      setName(result.name);
      setPrice(result.price);
      setPath(result.path);
      setDescription(result.description);
    })();
  }, [setDescription, id, setName, setPath, setPrice]);

  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    }

    await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ name, price, path, description }),
      });

    router.push("../dashboard");
  }
  return (
    <div className="container">
      <h1>Update food item</h1>
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
        <button className="button" onClick={handleEditFoodItem}>Update Food Item</button>
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={() => router.push("../dashboard")}>Back To list</button>
      </div>
    </div>
  )
}
