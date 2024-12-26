const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const StudentProfile = require('./studentProfile');
const ClassSection = require('./classSection');
const ExamGrades = require('./examGrades');
const AcademicSubjects = require('./academicSubjects');

const ReportCards = sequelize.define('ReportCards', {
    report_card_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    academic_year: { type: DataTypes.STRING(10), allowNull: false },
    exam_name: { type: DataTypes.STRING(255), allowNull: false },
    subject_grades: { type: DataTypes.JSON, allowNull: false },
    total_marks_obtained: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_maximum_marks: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    overall_grade: { type: DataTypes.STRING(10) },
    teacher_remarks: { type: DataTypes.TEXT },
    generated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},
{
    tableName: 'report_cards',
    timestamps: false,
});

// Define relationships
ReportCards.belongsTo(StudentProfile, { foreignKey: 'student_id', onDelete: 'CASCADE' });
ReportCards.belongsTo(ClassSection, { foreignKey: 'class_id', onDelete: 'CASCADE' });


ReportCards.afterCreate(async (reportCard, options) => {
    try {
        console.log('Processing afterCreate hook for report card...');

        const subjectGrades = reportCard.subject_grades;

        if (!subjectGrades || typeof subjectGrades !== 'object') {
            console.error('Invalid subjectGrades format:', subjectGrades);
            return;
        }

        // Fetch all subjects from the database to avoid querying inside the loop
        const subjects = await AcademicSubjects.findAll();
        const subjectMap = subjects.reduce((map, subject) => {
            map[subject.subject_name] = subject.subject_id;
            return map;
        }, {});

        console.log('Fetched subjects:', subjectMap);

        // Extract finalized_by and timetable_id from options
        const { finalized_by, timetable_id } = options;

        // Prepare grade entries
        const gradeEntries = Object.entries(subjectGrades).map(([subject, marks]) => {
            const subject_id = subjectMap[subject] || null;

            if (!subject_id) {
                console.warn(`Subject "${subject}" not found in AcademicSubjects.`);
            }

            return {
                student_id: reportCard.student_id,
                marks_obtained: marks || 0,
                maximum_marks: 100,
                grade: marks > 90 ? "A+" : marks > 80 ? "A" : marks > 70 ? "B+" : marks > 60 ? "B" : marks > 50 ? "C" : "C-",
                teacher_remarks: reportCard.teacher_remarks,
                subject_id,
                timetable_id,
                finalized_by,
            };
        });

        console.log('Grade entries to insert:', gradeEntries);

        // Bulk insert exam grades
        await ExamGrades.bulkCreate(gradeEntries);
        console.log('Exam grades created successfully for the report card.');
    } catch (error) {
        console.error('Error creating exam grades:', error.message, error.stack);
    }
});



module.exports = ReportCards;

