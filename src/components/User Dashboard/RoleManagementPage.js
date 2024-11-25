import React, { useState } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import "./RoleManagementPage.css";

const RoleManagementPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "HIV SMG HPV", role: "ADMIN" },
    { id: 2, name: "gymmer gan bé", role: "Signed-In client" },
    { id: 3, name: "thienbanho", role: "Vendor" },
    { id: 4, name: "luubinh", role: "Guess" },
    { id: 5, name: "concanoc", role: "Content Manager" },
  ]);

  const roles = [
    "ADMIN",
    "PT",
    "Signed-In client",
    "Vendor",
    "Content Manager (forum)",
    "Guess",
  ];

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    alert(`Role updated: User ID ${userId} is now ${newRole}`);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <h1>Role Management</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => console.log("Save Changes")}>Save Changes</button>
      </div>
      <Footer></Footer>
    </>
  );
};

export default RoleManagementPage;
