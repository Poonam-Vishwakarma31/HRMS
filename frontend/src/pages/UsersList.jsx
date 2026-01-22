import { useEffect, useState } from "react";
import { getUsers } from "../api/user.api.js";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data.data || res.data.users);
    });
  }, []);

  return (
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>
              <Link
                to={`/dashboard/users/${u._id}`}
                className="text-orange-600"
              >
                View Profile
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;
