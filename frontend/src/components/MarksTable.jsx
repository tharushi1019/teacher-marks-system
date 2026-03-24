import { useEffect, useState } from "react";
import API from "../services/api";

const MarksTable = ({ studentId, studentName, refresh }) => {
  const [marks, setMarks] = useState([]);

  const fetchMarks = () => {
    if (studentId) {
      API.get(`/marks/${studentId}`).then(res => setMarks(res.data));
    } else {
      setMarks([]);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, [studentId, refresh]);

  // DELETE
  const handleDelete = async (id) => {
    await API.delete(`/marks/${id}`);
    fetchMarks();
  };

  // UPDATE
  const handleUpdate = async (id) => {
    const newMarks = prompt("Enter new marks:");
    if (!newMarks) return;

    await API.put(`/marks/${id}`, { marks: newMarks });
    fetchMarks();
  };

  return (
    <div>

      {/* ✅ STUDENT NAME DISPLAY */}
      <div className="mb-4 p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
        <p className="text-sm text-gray-500">Selected Student</p>
        <p className="text-lg font-semibold text-blue-600">
          {studentName || "None"}
        </p>
      </div>

      <table className="w-full rounded-xl overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Marks</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white/60 dark:bg-gray-900/40">
          {marks.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-400">
                No marks available
              </td>
            </tr>
          ) : (
            marks.map((m) => (
              <tr 
                key={m._id} 
                className="border-b border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="p-3">{m.subjectId?.name}</td>
                <td className="p-3">{m.marks}</td>
                <td className="p-3 space-x-2">

                  <button 
                    onClick={() => handleUpdate(m._id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>

                  <button 
                    onClick={() => handleDelete(m._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;