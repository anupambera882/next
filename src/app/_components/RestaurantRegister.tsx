import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react"

export default function RestaurantRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }

    if (!name || !email || !password || !confirmPassword || !city || !address || !contactNo) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    const res = await fetch('http://localhost:3000/api/restaurant/register', {
      method: "POST",
      body: JSON.stringify({ name, email, password, city, address, contactNo }),
    });
    const { result, success } = await res.json();
    if (success) {
      result.password = undefined;
      localStorage.setItem('restaurantUser', JSON.stringify(result));
      router.push('/restaurant/dashboard');
    }
  }

  return (
    <>
      <h3>Register</h3>
      <div>
        <div className="input-wrapper">
          <input type="text" placeholder="Name of Restaurant" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
          {error && !name && <span className="input-error">Please Enter valid name</span>}
        </div>
        <div className="input-wrapper">
          <input type="email" placeholder="Enter email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
          {error && !email && <span className="input-error">Please Enter valid email</span>}
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && !password && <span className="input-error">Please Enter valid password</span>}
          {passwordError && <span className="input-error">password and confirmPassword not match</span>}
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Confirm password" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {passwordError && <span className="input-error">password and confirmPassword not match</span>}
          {error && !confirmPassword && <span className="input-error">Please Enter valid confirmPassword</span>}
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter city" className="input-field" value={city} onChange={(e) => setCity(e.target.value)} />
          {error && !city && <span className="input-error">Please Enter valid city</span>}
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter full address" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} />
          {error && !address && <span className="input-error">Please Enter valid address</span>}
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter contact No." className="input-field" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
          {error && !contactNo && <span className="input-error">Please Enter valid contactNo</span>}
        </div>
        <div className="input-wrapper">
          <button type="button" className="button" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </>
  )
}
