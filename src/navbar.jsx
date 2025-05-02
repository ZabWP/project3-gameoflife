import useUserStore from "./Stores/userStore";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const username = useUserStore((state) => state.username);
  const navigate = useNavigate();

  const handleLogout = () => {
    useUserStore.getState().logout();
    navigate("/project3-gameoflife");
  };

  const handleAdmin = () => {
    if (username == null) {
      alert("You must be logged in to access the admin page.");
    } else {
      navigate("/project3-gameoflife/admin");
    }
  };

  return (
    <div className="navbar">
      <button onClick={() => navigate("/project3-gameoflife/")}>Play</button>

      <button onClick={() => handleAdmin()}>Admin</button>
      {username ? (
        <div>
          <p>{username}</p>
          <button onClick={() => handleLogout()}>Logout</button>{" "}
        </div>
      ) : (
        <button onClick={() => navigate("project3-gameoflife/login")}>
          Login
        </button>
      )}
    </div>
  );
};
export default Navbar;
