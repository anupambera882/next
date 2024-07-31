import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function FoodItemList() {
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    loadFoodItem();
  }, []);

  const loadFoodItem = async () => {
    const { id } = JSON.parse(localStorage.getItem('restaurantUser') || '')
    const res = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`);
    const { success, result } = await res.json();
    if (success) {
      setFoodItems(result);
      setIsLoading(false);
    } else {
      alert('error while fetch restaurant food list');
    }
  }

  const deleteFoodItem = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, { method: 'delete' });
    const { success } = await res.json();
    if (!success) {
      alert('error while delete food');
      return;
    }
    loadFoodItem();
  }

  if (isLoading) {
    return (
      <>
        loading......
      </>
    )
  }
  return (
    <>
      <h1>Food item</h1>
      <table>
        <thead>
          <tr>
            <td>S.no</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, key) => (
            <tr key={key + 1}>
              <td>{key + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              {/* eslint-disable-next-line @next/next/no-img-element  */}
              <td>{<img src={item.path} alt="food image" width={80} />}</td>
              <td>
                <button onClick={() => { deleteFoodItem(item.id) }}>Delate</button>
                <button onClick={() => router.push(`dashboard/${item.id}`)}>Edit</button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </>
  )
}
