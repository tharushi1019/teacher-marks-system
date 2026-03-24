import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function AdminPage({ setRole }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // ✅ NEW STATES
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editGrade, setEditGrade] = useState("");

  const fetchStudents = () => {
    API.get("/students").then(res => setStudents(res.data));
  };

  const fetchSubjects = () => {
    API.get("/subjects").then(res => setSubjects(res.data));
  };

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, [refresh]);

  const handleAdd = async () => {
    if (!name || !grade) return alert("Fill all fields");

    await API.post("/students", { name, grade });

    setName("");
    setGrade("");
    setRefresh(prev => !prev);
  };

  const handleAddSubject = async () => {
    if (!subject) return alert("Enter subject name");

    await API.post("/subjects", { name: subject });

    setSubject("");
    setRefresh(prev => !prev);
  };

  const handleDelete = async (id) => {
    await API.delete(`/students/${id}`);
    setRefresh(prev => !prev);
  };

  // ✅ EDIT
  const handleEdit = (student) => {
    setEditId(student._id);
    setEditName(student.name);
    setEditGrade(student.grade);
  };

  const handleUpdate = async () => {
    await API.put(`/students/${editId}`, {
      name: editName,
      grade: editGrade
    });

    setEditId(null);
    setRefresh(prev => !prev);
  };

  // ✅ SEARCH FILTER
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">

      <Navbar role="admin" setRole={setRole} />

      {/* ADD SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ADD STUDENT */}
        <div className="glass p-6 space-y-4">
          <h2 className="text-blue-500 font-semibold">Add Student</h2>

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
              <option key={i+1} value={(i+1).toString()}>
                Grade {i+1}
              </option>
            ))}
          </select>

          <button onClick={handleAdd} className="btn-primary w-full">
            Add Student
          </button>
        </div>

        {/* ADD SUBJECT */}
        <div className="glass p-6 space-y-4">
          <h2 className="text-blue-500 font-semibold">Add Subject</h2>

          <input
            className="input-modern"
            placeholder="Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <button onClick={handleAddSubject} className="btn-primary w-full">
            Add Subject
          </button>
        </div>

      </div>

      {/* 🔍 SEARCH */}
      <div className="glass p-4 mt-6">
        <input
          className="input-modern"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📊 GROUPED TABLE */}
      <div className="space-y-6 mt-6">

        {[...Array(13)].map((_, i) => {
          const gradeNum = (i + 1).toString();

          const gradeStudents = filteredStudents.filter(
            s => s.grade === gradeNum
          );

          if (gradeStudents.length === 0) return null;

          return (
            <div key={gradeNum} className="glass p-4">

              <h2 className="text-blue-500 font-semibold mb-3">
                📘 Grade {gradeNum} ({gradeStudents.length})
              </h2>

              <table className="w-full text-sm">

                <thead className="table-head">
                  <tr>
                    <th className="p-2 text-left">Student</th>
                    <th className="p-2">Grade</th>
                    <th className="p-2 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {gradeStudents.map(s => (
                    <tr key={s._id} className="table-row border-b">

                      {/* EDIT MODE */}
                      {editId === s._id ? (
                        <>
                          <td className="p-2">
                            <input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="input-modern"
                            />
                          </td>

                          <td className="p-2">
                            <select
                              value={editGrade}
                              onChange={(e) => setEditGrade(e.target.value)}
                              className="input-modern"
                            >
                              {[...Array(13)].map((_, i) => (
                                <option key={i+1} value={(i+1).toString()}>
                                  {i+1}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="p-2 text-right space-x-2">
                            <button
                              onClick={handleUpdate}
                              className="text-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="text-gray-500"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-2">{s.name}</td>
                          <td className="p-2 text-center">G{s.grade}</td>

                          <td className="p-2 text-right space-x-3">
                            <button
                              onClick={() => handleEdit(s)}
                              className="text-blue-500"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(s._id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          );
        })}

      </div>

    </div>
  );
}