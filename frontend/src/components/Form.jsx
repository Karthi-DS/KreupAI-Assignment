import React, { useEffect, useState } from "react";
import axios from "axios";


const Form = () => {

  const [subjectsList,setSubjectsList] = useState(["Mathematics", "Science", "English", "History"])
  const [formData, setFormData] = useState({
    student_id: "",
    class_id: "",
    academic_year: "",
    exam_name: "",
    finalized_by: "",
    timetable_id: "",
    total_marks_obtained: "",
    total_maximum_marks: "",
    overall_grade: "",
    teacher_remarks: "",
  });

  const [subjectGrades, setSubjectGrades] = useState([]);
  const [currentSubject, setCurrentSubject] = useState("");
  const [currentMarks, setCurrentMarks] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  async function getSubjects() {
    try {
      const response = await axios.get("http://localhost:4000/api/get-subjects");
      setSubjectsList(response.data.data)
    } catch (error) {
      console.error("Error fetching in subjects:", error);
      setError("Failed to load subject data. Please try again later.");
    }
  }
    useEffect(()=>{
        getSubjects()
    },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSubjectGrade = () => {
    if (!currentSubject || !currentMarks) {
      setError("Please select a subject and enter marks.");
      return;
    }

    if (subjectGrades.some((grade) => grade.subject === currentSubject)) {
      setError("Subject already added.");
      return;
    }

    setSubjectGrades([
      ...subjectGrades,
      { subject: currentSubject, marks: Number(currentMarks) },
    ]);
    setCurrentSubject("");
    setCurrentMarks("");
    setError("");
  };

//   useEffect(()=>{
//     const marks = subjectGrades.reduce((acc,{subject,marks})=>{
//         acc+= Number(marks)
//         return acc
//     },0)
//     console.log(marks)
//   },[subjectGrades])
// created for adding the total marks by itself

  const handleRemoveSubject = (subject) => {
    setSubjectGrades(subjectGrades.filter((grade) => grade.subject !== subject));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        subject_grades: subjectGrades.reduce((acc, { subject, marks }) => {
          acc[subject] = marks;
          return acc;
        }, {}),
      };
      console.log(formattedData)

      const response = await axios.post(
        "http://localhost:4000/api/add-report-card",
        formattedData
      );

      setSuccess("Report card created successfully!");
      setError("");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to create the report card. Check your inputs.");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Report Card
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: "student_id", label: "Student ID" },
              { id: "class_id", label: "Class ID" },
              { id: "academic_year", label: "Academic Year" },
              { id: "exam_name", label: "Exam Name" },
              { id: "finalized_by", label: "Teacher ID" },
              { id: "timetable_id", label: "Timetable ID" },
            ].map(({ id, label }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <input
                  type="text"
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Grades
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <select
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                className="w-full sm:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {subjectsList.map(({subject_name,subject_id}) => (
                  <option key={subject_name} value={subject_name}>
                    {subject_name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={currentMarks}
                onChange={(e) => setCurrentMarks(e.target.value)}
                placeholder="Marks"
                className="w-full sm:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={handleAddSubjectGrade}
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {subjectGrades.map(({ subject, marks }) => (
                <li
                  key={subject}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                >
                  <span>
                    {subject}: {marks} marks
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(subject)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label
                htmlFor="total_marks_obtained"
                className="block text-sm font-medium text-gray-700"
              >
                Total Marks Obtained
              </label>
              <input
                type="number"
                id="total_marks_obtained"
                name="total_marks_obtained"
                value={formData.total_marks_obtained}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="total_maximum_marks"
                className="block text-sm font-medium text-gray-700"
              >
                Total Maximum Marks
              </label>
              <input
                type="number"
                id="total_maximum_marks"
                name="total_maximum_marks"
                value={formData.total_maximum_marks}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="overall_grade"
              className="block text-sm font-medium text-gray-700"
            >
              Overall Grade
            </label>
            <input
              type="text"
              id="overall_grade"
              name="overall_grade"
              value={formData.overall_grade}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="teacher_remarks"
              className="block text-sm font-medium text-gray-700"
            >
              Teacher Remarks
            </label>
            <textarea
              id="teacher_remarks"
              name="teacher_remarks"
              value={formData.teacher_remarks}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
