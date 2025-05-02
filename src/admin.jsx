import React, { useEffect, useState } from "react";
import useUserStore from "./Stores/userStore";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  // change to true later
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const username = useUserStore((state) => state.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/project3-gameoflife");
      return;
    }

    const checkAdmin = async () => {
      try {
        const response = await fetch(
          "https://codd.cs.gsu.edu/~zbronola1/GOL/findUser.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to check admin status");
        }
        const data = await response.json();
        if (data[0].isAdmin != 1) {
          navigate("/project3-gameoflife");
          alert("You are not an admin");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        window.location.href = "/project3-gameoflife/";
      }
    };
    checkAdmin();

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://codd.cs.gsu.edu/~zbronola1/GOL/findUser.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userID) => {
    try {
      const response = await fetch(
        "https://codd.cs.gsu.edu/~zbronola1/GOL/deleteUser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      const data = await response.json();
      if (data.status === "success") {
        setUsers(users.filter((user) => user.userID !== userID));
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="adminPage">
      <h1>Registered Users</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Time spent</th>
            <th>Date Registered</th>
            <th>isAdmin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userID}>
              <td>{user.userID}</td>
              <td>{user.username}</td>
              <td>{user.timeSpent}</td>
              <td>{user.createdAt}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                {user.userID == 1 || user.username == username ? null : (
                  <button onClick={() => handleDelete(user.userID)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
