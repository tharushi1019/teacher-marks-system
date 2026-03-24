import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function TeacherPage({ setRole }) {
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marksData, setMarksData] = useState({});

  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [marks, setMarks] = useState("");

  const reportRef = useRef();

  // Students
  useEffect(() => {
    if (grade) {
      API.get(`/students?grade=${grade}`)
        .then(res => setStudents(res.data));
    }
  }, [grade]);

  // Subjects
  useEffect(() => {
    API.get("/subjects").then(res => setSubjects(res.data));
  }, []);

  // Marks
  const fetchMarks = () => {
    if (grade) {
      API.get("/marks").then(res => {
        const formatted = {};

        res.data.forEach(m => {
          const sid = m.studentId?._id;
          const sub = m.subjectId?._id;

          if (!formatted[sid]) formatted[sid] = {};
          formatted[sid][sub] = m.marks;
        });

        setMarksData(formatted);
      });
    }
  };

  useEffect(() => {
    fetchMarks();
  }, [grade]);

  const handleSubmit = async () => {
    if (!studentId || !subjectId || !marks) {
      return alert("Fill all fields");
    }

    await API.post("/marks", { studentId, subjectId, marks });
    setMarks("");
    fetchMarks();
  };

  // =====================
  // 📊 CALCULATIONS
  // =====================

  const calculateAverage = (studentId) => {
    const marks = marksData?.[studentId];
    if (!marks) return 0;

    const values = Object.values(marks).map(Number);
    if (!values.length) return 0;

    const total = values.reduce((a, b) => a + b, 0);
    return (total / values.length).toFixed(1);
  };

  const getGrade = (avg) => {
    if (avg >= 75) return "A";
    if (avg >= 65) return "B";
    if (avg >= 50) return "C";
    return "F";
  };

  // Ranking
  const rankedStudents = [...students]
    .map(s => ({
      ...s,
      avg: Number(calculateAverage(s._id))
    }))
    .sort((a, b) => b.avg - a.avg);

  // Subject averages
  const subjectAverages = subjects.map(sub => {
    let total = 0;
    let count = 0;

    students.forEach(stu => {
      const val = marksData?.[stu._id]?.[sub._id];
      if (val) {
        total += Number(val);
        count++;
      }
    });

    return count ? (total / count).toFixed(1) : 0;
  });

  // Chart data
  const chartData = {
    labels: subjects.map(s => s.name),
    datasets: [
      {
        label: "Subject Average",
        data: subjectAverages
      }
    ]
  };

  // PDF export
  const exportPDF = async () => {
    const canvas = await html2canvas(reportRef.current);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(img, "PNG", 10, 10, 180, 160);
    pdf.save("class-report.pdf");
  };

  return (
    <div className="min-h-screen p-6 space-y-6">

      <Navbar role="teacher" setRole={setRole} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="glass p-6 space-y-4 hover:shadow-2xl transition fade-in">

          <h2 className="text-blue-500 font-semibold text-lg">
            Add Marks
          </h2>

          <select className="input-modern" onChange={(e) => setGrade(e.target.value)}>
            <option>Select Grade</option>
            {[...Array(13)].map((_, i) => (
              <option key={i + 1} value={(i + 1).toString()}>
                Grade {i + 1}
              </option>
            ))}
          </select>

          <select className="input-modern" onChange={(e) => setStudentId(e.target.value)}>
            <option>Select Student</option>
            {students.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>

          <select className="input-modern" onChange={(e) => setSubjectId(e.target.value)}>
            <option>Select Subject</option>
            {subjects.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Marks"
            className="input-modern"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />

          <button onClick={handleSubmit} className="btn-primary w-full">
            Save Marks
          </button>

          <button onClick={exportPDF} className="btn-primary w-full">
            Export Report (Coming Soon)
          </button>
        </div>

        {/* RIGHT */}
        <div className="glass p-6 overflow-x-auto fade-in" ref={reportRef}>

          <h2 className="text-blue-500 font-semibold mb-4 text-lg">
            Class Dashboard
          </h2>

          <table className="w-full text-sm mb-6">
            <thead className="table-head rounded-lg">
              <tr>
                <th className="p-2">Rank</th>
                <th className="p-2 text-left">Student</th>

                {subjects.map(sub => (
                  <th key={sub._id} className="p-2">{sub.name}</th>
                ))}

                <th className="p-2">Avg</th>
                <th className="p-2">Grade</th>
              </tr>
            </thead>

            <tbody>
              {rankedStudents.map((stu, index) => {
                const avg = calculateAverage(stu._id);
                const grade = getGrade(avg);

                return (
                  <tr key={stu._id} className="table-row border-b">

                    <td className="p-2 font-bold text-blue-500">
                      #{index + 1}
                    </td>

                    <td className="p-2 font-medium">{stu.name}</td>

                    {subjects.map(sub => {
                      const val = marksData?.[stu._id]?.[sub._id];

                      return (
                        <td key={sub._id} className="p-2 text-center">
                          {val ?? "-"}
                        </td>
                      );
                    })}

                    <td className="p-2 font-semibold">{avg}</td>

                    <td className="p-2">
                      <span className={`badge badge-${grade}`}>
                        {grade}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>

          <Bar data={chartData} />
        </div>

      </div>
    </div>
  );
}