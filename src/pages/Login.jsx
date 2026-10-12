import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (email.trim() === "" || password === "") {
      setError("Please enter your email and password.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (user) => user.email === cleanEmail && user.password === password
    );

    if (!foundUser) {
      setError("Incorrect email or password.");
      return;
    }

    dispatch(loginUser({ name: foundUser.name, email: foundUser.email }));
    navigate("/events");
  }

  return (
    <div className="form-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error !== "" && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
      <p>
        New here? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;