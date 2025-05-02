import useUserStore from "./Stores/userStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = useUserStore((state) => state.username);
  const navigate = useNavigate();

  const handleLogout = () => {
    useUserStore.getState().logout();
  };

  return (
    <div className="navbar">
      <a href="/project3-gameoflife/">Play</a>
      {username ? (
        <button onClick={() => handleLogout()}>Logout</button>
      ) : (
        <button onClick={() => navigate("project3-gameoflife/login")}>
          Login
        </button>
      )}
    </div>
  );
};
export default Navbar;
