const Login = () => {
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
          <a href="/project3-gameoflife/register">Register</a>
        </p>
      </form>
    </div>
  );
};
export default Login;
