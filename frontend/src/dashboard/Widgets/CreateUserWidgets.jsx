// dashboard/widgets/CreateUser.jsx
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  return (
    <div className="widget">
      <h3>User Management</h3>

      <button onClick={() => navigate("/dashboard/users/create")}>
        ➕ Create New User
      </button>
    </div>
  );
};

export default CreateUser;

