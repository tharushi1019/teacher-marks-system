import { useEffect, useState } from "react";
import API from "../services/api";

const MarksTable = ({ studentId }) => {
  const [marks, setMarks] = useState([]);

  const fetchMarks = () => {
    if (studentId) {
      API.get(`/marks/${studentId}`).then(res => setMarks(res.data));
    }
  };

  useEffect(() => {
    fetchMarks();
  }, [studentId]);

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
      <h3>Marks</h3>

      <table border="1">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((m) => (
            <tr key={m._id}>
              <td>{m.subjectId?.name}</td>
              <td>{m.marks}</td>
              <td>
                <button onClick={() => handleUpdate(m._id)}>Edit</button>
                <button onClick={() => handleDelete(m._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;