import { useNavigate } from "react-router-dom";
import useUserStore from "./Stores/userStore";

const Login = () => {
  const navigate = useNavigate();
  const setUsername = useUserStore((state) => state.setUsername);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Check if username is empty
    if (username.trim() === "") {
      alert("Username is required");
      return;
    }
    // Check if password is empty
    if (password.trim() === "") {
      alert("Password is required");
      return;
    }
    // Check if username has a space in it
    if (/\s/.test(username)) {
      alert("Username cannot contain spaces");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://codd.cs.gsu.edu/~zbronola1/GOL/findUser.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        const data = await response.json();
        if (data.status === "success") {
          setUsername(username);
          navigate("/project3-gameoflife");
        } else {
          alert(data.message);
        }
      } catch (error) {}
    };

    fetchData();
  };

  return (
    <div className="loginComponent">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <button
            onClick={() => {
              navigate("/project3-gameoflife/register");
            }}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};
export default Login;
