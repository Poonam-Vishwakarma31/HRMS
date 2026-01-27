import { useEffect, useState } from "react";
import { createUser, assignManager, getUsers } from "../api/user.api.js";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    managerId: "",
  });

  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch managers ONLY for employee creation
  useEffect(() => {
    if (form.role === "employee") {
      fetchManagers();
    } else {
      setForm((prev) => ({ ...prev, managerId: "" }));
    }
  }, [form.role]);

 const fetchManagers = async () => {
  const res = await getUsers({ role: "manager" });
  setManagers(res.data.users || []);
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation (match backend rules)
    if (!form.name || !form.email || !form.password || !form.role) {
      alert("All fields are required");
      return;
    }

    if (form.role === "employee" && !form.managerId) {
      alert("Employee must have a manager");
      return;
    }

    if (["admin", "HR"].includes(form.role) && form.managerId) {
      alert("Admin/HR cannot have a manager");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ create user
      const res = await createUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        managerId: form.role === "employee" ? form.managerId : null,
      });

      const createdUser = res.data.user;

      // 2️⃣ Assign manager explicitly (optional but clean)
      if (form.role === "employee" && form.managerId) {
        await assignManager({
          employeeId: createdUser._id,
          managerId: form.managerId,
        });
      }

      alert("User created successfully");
      setForm({
        name: "",
        email: "",
        password: "",
        role: "",
        managerId: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Temporary Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <select name="role" value={form.role} onChange={handleChange} required>
        <option value="">Select role</option>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
        <option value="HR">HR</option>
        <option value="admin">Admin</option>
      </select>

      {form.role === "employee" && (
        <select
          name="managerId"
          value={form.managerId}
          onChange={handleChange}
          required
        >
          <option value="">Select manager</option>
           {Array.isArray(managers) &&
    managers.map((m) => (
      <option key={m._id} value={m._id}>
        {m.name}
      </option>
    ))}
        </select>
      )}

      <button className="bg-blue-500" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}

