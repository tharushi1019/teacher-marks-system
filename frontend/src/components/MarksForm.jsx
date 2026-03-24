import { useState } from "react";
import API from "../services/api";
import SubjectSelector from "./SubjectSelector";

const MarksForm = ({ studentId, setRefresh }) => {
  const [subjectId, setSubjectId] = useState("");
  const [marks, setMarks] = useState("");

  const handleSubmit = async () => {
    if (!studentId || !subjectId) {
      alert("Select student and subject!");
      return;
    }

    await API.post("/marks", { studentId, subjectId, marks });

    // ✅ trigger table refresh
    if (setRefresh) {
      setRefresh(prev => !prev);
    }

    // ✅ reset input (better UX)
    setMarks("");
    setSubjectId("");

    alert("Marks saved!");
  };

  return (
    <div>
      <h3>Enter Marks</h3>

      <SubjectSelector setSubjectId={setSubjectId} />

      <input
        type="number"
        placeholder="Marks"
        value={marks}
        className="input-modern"
        onChange={(e) => setMarks(e.target.value)}
      />

      <button 
        onClick={handleSubmit}
        className="btn-primary w-full mt-3"
      >
        Save Marks
      </button>
    </div>
  );
};

export default MarksForm;