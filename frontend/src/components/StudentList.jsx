import { useEffect, useState } from "react";
import API from "../services/api";

const StudentList = ({ setStudentId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
  }, []);

  return (
    <select onChange={(e) => setStudentId(e.target.value)}>
      <option>Select Student</option>
      {students.map(s => (
        <option key={s._id} value={s._id}>
          {s.name}
        </option>
      ))}
    </select>
  );
};

export default StudentList;