import React, { useEffect, useState } from "react";

const Admin = () => {
  const [users, setUsers] = useState([]);
  // change to true later
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
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
              <td>
                <button onClick={() => alert(`Deleting user ${user.id}`)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
