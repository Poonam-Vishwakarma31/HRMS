// src/pages/leaves/ApplyLeave.jsx
import { useState } from "react";
import { createLeave } from "../../api/leave.api.js";

export default function ApplyLeave() {
  const [form, setForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Hard validation (don’t rely on backend for obvious stuff)
    if (!form.type || !form.startDate || !form.endDate || !form.reason) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await createLeave(form); // ONLY payload, nothing extra
      alert("Leave applied successfully");
      setForm({
        type: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Apply Leave</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="">Select Leave Type</option>
          <option value="CASUAL">Casual</option>
          <option value="SICK">Sick</option>
          <option value="PAID">Paid</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />

        <textarea
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
        />

        <button className="bg-blue-500" type="submit" disabled={loading}>
          {loading ? "Applying..." : "Apply Leave"}
        </button>
      </form>
    </div>
  );
}
