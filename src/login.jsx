import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="loginComponent">
      <h2>Login</h2>
      <form>
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
