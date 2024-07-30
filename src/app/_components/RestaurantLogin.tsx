import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function RestaurantLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    const res = await fetch('http://localhost:3000/api/restaurant/login', {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { result, success } = await res.json();
    if (success) {
      result.password = undefined;
      localStorage.setItem('restaurantUser', JSON.stringify(result));
      router.push('/restaurant/dashboard');
    } else {
      alert('login fail');
    }
  }

  return (
    <>
      <h3>Login</h3>
      <div>
        <div className="input-wrapper">
          <input type="email" placeholder="Enter your email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
          {error && !email && <span className="input-error">Please Enter valid email</span>}
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && !password && <span className="input-error">Please Enter valid password</span>}
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  )
}

