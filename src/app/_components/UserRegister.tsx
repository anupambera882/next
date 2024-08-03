import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        city,
        address,
        mobile,
      }),
    });
    const { result, success } = await res.json();
    if (success) {
      result.password = undefined;
      localStorage.setItem("user", JSON.stringify(result));
      router.push("/");
    }
  };

  return (
    <>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="input-error">Please Enter valid name</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="email"
          placeholder="Enter email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && (
          <span className="input-error">Please Enter valid email</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Enter password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && !password && (
          <span className="input-error">Please Enter valid password</span>
        )}
        {passwordError && (
          <span className="input-error">
            password and confirmPassword not match
          </span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Confirm password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError && (
          <span className="input-error">
            password and confirmPassword not match
          </span>
        )}
        {error && !confirmPassword && (
          <span className="input-error">
            Please Enter valid confirmPassword
          </span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter city"
          className="input-field"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {error && !city && (
          <span className="input-error">Please Enter valid city</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter address"
          className="input-field"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && !address && (
          <span className="input-error">Please Enter valid address</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter mobile"
          className="input-field"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        {error && !mobile && (
          <span className="input-error">Please Enter valid contactNo</span>
        )}
      </div>
      <div className="input-wrapper">
        <button type="button" className="button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </>
  );
}
