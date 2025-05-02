import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "./Stores/userStore";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const setUsernameStore = useUserStore((state) => state.setUsername);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if username is empty
    if (username.trim() === "") {
      alert("Username is required");
      setLoading(false);
      return;
    }

    // Check if username has a space in it
    if (/\s/.test(username)) {
      alert("Username cannot contain spaces");
      setLoading(false);
      return;
    }
    // Check if username is less than 3 characters
    if (username.length < 3) {
      alert("Username must be at least 3 characters long");
      setLoading(false);
      return;
    }
    // Check if username is more than 20 characters
    if (username.length > 20) {
      alert("Username must be less than 20 characters long");
      setLoading(false);
      return;
    }

    // Check if username has special characters
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
    if (specialChars.test(username)) {
      alert("Username cannot contain special characters");
      setLoading(false);
      return;
    }

    // Check if password is empty
    if (password.trim() === "") {
      alert("Password is required");
      setLoading(false);
      return;
    }

    // Check if password is than 3 characters
    if (password.length < 3) {
      alert("Password must be at least 3 characters long");
      setLoading(false);
      return;
    }
    // Check if password is more than 20 characters
    if (password.length > 20) {
      alert("Password must be less than 20 characters long");
      setLoading(false);
      return;
    }
    // Check if password has special characters
    const passwordSpecialChars = /[!@#$%^&*(),.?":{}|<>]/g;
    if (passwordSpecialChars.test(password)) {
      alert("Password cannot contain special characters");
      setLoading(false);
      return;
    }
    // Check if password and passwordConfirm match
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    // Check if passwordConfirm is empty
    if (passwordConfirm.trim() === "") {
      alert("Password confirmation is required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://codd.cs.gsu.edu/~zbronola1/GOL/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      // Error:  backend server crashed
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response from server:", data);
      if (data.status === "success") {
        setUsernameStore(username);
        navigate("/project3-gameoflife");
      } else {
        // Error: backend returns invalid data
        setErrorMsg(data.message || data.error || "Unknown error occurred.");
        setLoading(false);
        alert(errorMsg);
      }
    } catch (err) {
      // Error: Cannot connect to backend
      console.error("Error:", err);
      setErrorMsg("Username already exists.");
      setLoading(false);
      alert(errorMsg);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="registerPage">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
