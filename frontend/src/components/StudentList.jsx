import { useEffect, useState } from "react";
import API from "../services/api";

const StudentList = ({ setStudentId, setStudentName, refresh }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
  }, [refresh]); // ✅ reload when refresh changes

  return (
    <select
      className="input-modern"
      onChange={(e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        setStudentId(e.target.value);

        if (setStudentName) {
          setStudentName(selectedOption.text); // ✅ send name
        }
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