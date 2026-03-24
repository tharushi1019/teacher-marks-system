const GradeSelector = ({ setGrade }) => {
  return (
    <select
      className="input-modern"
      onChange={(e) => setGrade(e.target.value)}
    >
      <option value="">Select Grade</option>

      {[...Array(13)].map((_, i) => (
        <option key={i + 1} value={(i + 1).toString()}>
          Grade {i + 1}
        </option>
      ))}
    </select>
  );
};

export default GradeSelector;