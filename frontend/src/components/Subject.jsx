import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  // const [success, setSuccess] = useState(null);

  // Fetch subjects
  const fetchSubjects = async () => {
    setLoading(true);
    toast.error(null);
    try {
      const response = await axios.get("http://localhost:4000/api/get-subjects");
      setSubjects(response.data.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      toast.error("Failed to load subjects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Add a new subject
  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubject.trim()) {
      toast.error("Subject name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/add-subject", {
        subject_name: newSubject,
      });
      if (response.data.status) {
        toast.success("Subject Added Successfully.", {
                  position: "top-right",
                  autoClose: 2000,
                });
        setNewSubject("");
        fetchSubjects(); // Refresh subjects
      } else {
        toast.error("Failed to add subject. Please try again.");
      }
    } catch (err) {
      console.error("Error adding subject:", err);
      toast.error("Failed to add subject. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Subjects</h1>
        {/* {success && <p className="text-green-500 text-center mb-4">{success}</p>} */}
        <ToastContainer/>
        {/* Form to Add Subject */}
        <form onSubmit={handleAddSubject} className="mb-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter subject name"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 flex-grow"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Subject
            </button>
          </div>
        </form>

        {/* Subjects Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-xs md:text-sm">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <tr key={subject.subject_id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {subject.subject_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {subject.subject_name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No subjects available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;
