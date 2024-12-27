/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const GradeTable = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjectsList, setSubjectsList] = useState({});
  const [studentsList, setStudentsList] = useState({});
  const location = useLocation();
  const { studentId, studentName } = location.state || {};

  async function getGrades() {
    setLoading(true);
    const postPayload = studentId?{studentId:studentId}:{studentId:'All'}
    try {
      const response = await axios.post(
        "http://localhost:4000/api/get-grades",
        postPayload
      );
      if(response.data.status){
        setGrades(response.data.data);
        await getSubjects()
        if(!studentId){
          await getStudents()
        }
      }
    } catch (error) {
      console.error("Error fetching in subjects:", error);
      toast.error("Failed to load subject data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getGrades();
  }, []);
  async function getSubjects() {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get-subjects"
      );
      const subjects = response.data.data.reduce(
        (acc, { subject_id, subject_name }) => {
          acc[subject_id] = subject_name;
          return acc;
        },
        {}
      );
      setSubjectsList(subjects)
    } catch (error) {
      console.error("Error fetching in subjects:", error);
      toast.error("Failed to load subject data. Please try again later.");
    }
  }
  async function getStudents() {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get-students"
      );
      const students = response.data.data.reduce(
        (acc, { student_id, student_name }) => {
          acc[student_id] = student_name;
          return acc;
        },
        {}
      );
      setStudentsList(students)
    } catch (error) {
      console.error("Error fetching in subjects:", error);
      toast.error("Failed to load grade data. Please try again later.");
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer/>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">{studentId?studentName+" - Grades":"Grades"}</h1>
        {grades.length === 0 && !loading?  (
          <div className="text-gray-500 text-center mb-4">No data Found</div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-xs md:text-sm">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Subjects
                </th>
                <th className="border border-gray-300 px-4 py-2">Marks</th>
                <th className="border border-gray-300 px-4 py-2">Grades</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((item) => (
                <tr key={item.grade_id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {studentName?studentName:studentsList[item.student_id]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subjectsList[item.subject_id]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.marks_obtained}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GradeTable;
