import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = useSelector((state) => state.auth.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/events" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (name.trim() === "") {
      setError("Name is required.");
      return;
    }

    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const existingUser = users.find((user) => user.email === cleanEmail);

    if (existingUser) {
      setError("An account with this email already exists.");
      return;
    }

    dispatch(
      registerUser({
        name: name.trim(),
        email: cleanEmail,
        password: password,
      })
    );

    navigate("/login");
  }

  return (
    <div className="form-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

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

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;