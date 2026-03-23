import { useState } from "react";
import API from "../services/api";
import SubjectSelector from "./SubjectSelector";

const MarksForm = ({ studentId }) => {
  const [subjectId, setSubjectId] = useState("");
  const [marks, setMarks] = useState("");

  const handleSubmit = async () => {
    if (!studentId || !subjectId) {
      alert("Select student and subject!");
      return;
    }

    await API.post("/marks", { studentId, subjectId, marks });
    alert("Marks saved!");
  };

  return (
    <div>
      <h3>Enter Marks</h3>

      <SubjectSelector setSubjectId={setSubjectId} />

      <input
        type="number"
        placeholder="Marks"
        onChange={(e) => setMarks(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MarksForm;