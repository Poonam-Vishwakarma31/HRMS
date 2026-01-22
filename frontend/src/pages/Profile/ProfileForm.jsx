import { useState } from "react";
import api from "../../api/axios.js";

const ProfileForm = ({ data, onCancel, onSave }) => {
  const [form, setForm] = useState({
    name: data.name,
    email: data.email,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await api.put("/employees/me", form);
    onSave(res.data);
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium">Email</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <label className="block font-medium">Password</label>
      <input
        name="password"
        type="password"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;

