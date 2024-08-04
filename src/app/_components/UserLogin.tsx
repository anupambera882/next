import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserLogin({
  redirect: { order },
}: {
  redirect: { order: boolean };
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { result, success } = await res.json();
    if (success) {
      result.password = undefined;
      localStorage.setItem("user", JSON.stringify(result));
      if (order) {
        router.push("/order");
      } else {
        router.push("/"); 
      }
    }
  };

  return (
    <>
      <h3>Login</h3>
      <div>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Enter your email"
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
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}
