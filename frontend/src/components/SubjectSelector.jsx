import { useEffect, useState } from "react";
import API from "../services/api";

const SubjectSelector = ({ setSubjectId }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    API.get("/subjects").then(res => setSubjects(res.data));
  }, []);

  return (
    <select
      className="input-modern"
      onChange={(e) => setSubjectId(e.target.value)}
    >
      <option>Select Subject</option>
      {subjects.map(sub => (
        <option key={sub._id} value={sub._id}>
          {sub.name}
        </option>
      ))}
    </select>
  );
};

export default SubjectSelector;