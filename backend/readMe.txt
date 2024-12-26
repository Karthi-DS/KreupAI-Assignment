Grading and Reporting System - Assignment

Overview
This project implements a Grading and Reporting System designed to handle academic data for schools or institutions. It enables teachers and administrators to manage student grades, generate report cards, and provide digital PDF versions of reports.

---

Features
1. Grade Entry and Finalization:
   - Teachers can enter marks for each student after exams.
   - Allows finalization of grades with optional comments or feedback.

2. Report Card Management:
   - Automatically generate detailed report cards for students.
   - Includes subject-wise grades, overall performance, and teacher remarks.

3. PDF Generation:
   - Generates downloadable and printable report cards in PDF format.

4. Student and Class Management:
   - Links report cards to specific students and their respective class sections.

---

Modules
1. Models:
   - Database models for managing students, classes, grades, and report cards.
2. Controllers:
   - Business logic for handling requests, grade entry, and report generation.
3. Routes:
   - API endpoints to interact with the system for CRUD operations and PDF downloads.

---

Technologies Used
- Backend Framework: Node.js with Express.js.
- Database: PostgreSQL with Sequelize ORM.
- PDF Generation: PDFKit for creating report cards.
- Environment Management: dotenv for managing environment variables.

---

Usage
1. Grade Management:
   - Teachers enter marks and finalize grades for each student.
2. Report Card Generation:
   - Automatically generate detailed report cards for specific students or classes.
3. PDF Download:
   - Access generated report cards in PDF format for printing or sharing.

---

