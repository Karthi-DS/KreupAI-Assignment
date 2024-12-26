import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [studentData, setStudentData] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  async function getStudents() {
    try {
      const response = await axios.get("http://localhost:4000/api/get-students");
      setStudentData(response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
      setError("Failed to load student data. Please try again later.");
    }
  }

  useEffect(() => {
    getStudents();
  }, []);

  const handleReport = async (studentId) => {
    setError("")
    const gradesLink = `http://localhost:4000/api/report-cards/${studentId}`;
    
    try {
      const response = await fetch(gradesLink, { method: "HEAD" });
      
      if (response.ok) {
        window.location.href = gradesLink;
      } else {
        throw new Error("The report card could not be found.");
      }
    } catch (err) {
      console.error("Error navigating to report card:", err);
      setError("Failed to open the report card. Please add the report.");
    }
  };
  

  const deleteStudent = async (studentId) => {
    setError("")
    try {
      await axios.post("http://localhost:4000/api/delete-student", {
        student_id: studentId,
      });
      setStudentData(studentData.filter((student) => student.student_id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
      setError("Failed to delete student. Please try again later.");
    }
  };

  const openGrades = (studentId,studentName) =>{
    setError("")
    navigate("/grades",{
      state:{studentId,studentName}
    })
  }

  const addStudent = async () => {
    setError("");
    const studentName = inputRef.current.value.trim();

    if (!studentName) {
      setError("Student name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/add-student", {
        student_name: studentName,
      });

      if (response.data.status) {
        getStudents();
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error adding student:", error);
      setError("Failed to add student. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Student List</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {showTable ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200 text-xs md:text-sm">
                  <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(studentData) && studentData.length > 0 ? (
                  studentData.map((student) => (
                    <tr key={student.student_id}  className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {student.student_id}
                      </td>
                      <td onClick={()=>openGrades(student.student_id,student.student_name)} className=" cursor-pointer border border-gray-300 px-4 py-2">
                        {student.student_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleReport(student.student_id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
                        >
                          Get Report
                        </button>
                        <button
                          onClick={() => navigate("/addReport")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto"
                        >
                          Add Report
                        </button>
                        <button
                          onClick={() => deleteStudent(student.student_id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                    >
                      No students available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-sm">
              <label htmlFor="student" className="block font-semibold mb-2">
                Student Name
              </label>
              <input
                type="text"
                ref={inputRef}
                name="student_name"
                id="student"
                className="border-2 px-2 py-1 rounded-md w-full"
                placeholder="Enter student name..."
              />
              <button
                onClick={addStudent}
                className="mt-2 w-full bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Add Student
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <button
            onClick={() => setShowTable(!showTable)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 w-full sm:w-auto"
          >
            {showTable ? "Add New Student" : "Back to List"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
