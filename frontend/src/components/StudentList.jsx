import { useEffect, useState } from "react";
import API from "../services/api";

const StudentList = ({ setStudentId, setStudentName, grade, refresh }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (grade) {
      API.get(`/students?grade=${grade}`)
        .then(res => setStudents(res.data));
    } else {
      setStudents([]);
    }
  }, [grade, refresh]);

  return (
    <select
      className="input-modern"
      onChange={(e) => {
        const selected = e.target.options[e.target.selectedIndex];
        setStudentId(e.target.value);
        setStudentName(selected.text);
      }}
    >
      <option value="">Select Student</option>

      {students.map(s => (
        <option key={s._id} value={s._id}>
          {s.name}
        </option>
      ))}
    </select>
  );
};

export default StudentList;