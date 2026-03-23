import { useState } from "react";
import StudentList from "./components/StudentList";
import MarksForm from "./components/MarksForm";
import MarksTable from "./components/MarksTable";

function App() {
  const [studentId, setStudentId] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Teacher Marks System</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <StudentList setStudentId={setStudentId} />
        <div className="mt-4">
          <MarksForm studentId={studentId} />
        </div>
      </div>

      <div className="mt-6 w-96">
        <MarksTable studentId={studentId} />
      </div>
    </div>
  );
}
export default App;