import { useEffect, useState } from "react";
import API from "../services/api";

const AdminPanel = ({ refresh, setRefresh }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    API.get("/students").then(res => setStudents(res.data));
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const handleAdd = async () => {
    if (!name || !grade) return alert("Fill all fields");

    await API.post("/students", { name, grade });

    setName("");
    setGrade("");
    setRefresh(prev => !prev);
  };

  const handleDelete = async (id) => {
    await API.delete(`/students/${id}`);
    setRefresh(prev => !prev);
  };

  return (
    <div className="glass p-6 space-y-4">
      <h2 className="text-blue-500 font-semibold">Admin Panel</h2>

      <input
        className="input-modern"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="input-modern"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      >
        <option value="">Select Grade</option>

        {[...Array(13)].map((_, i) => (
          <option key={i + 1} value={(i + 1).toString()}>
            Grade {i + 1}
          </option>
        ))}
      </select>

      <button onClick={handleAdd} className="btn-primary w-full">
        Add Student
      </button>

      <div className="space-y-2 mt-4">
        {students.map(s => (
          <div key={s._id} className="flex justify-between">
            <span>{s.name} (G{s.grade})</span>
            <button
              onClick={() => handleDelete(s._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;