const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const ReportCards = require('../models/reportCards');
const StudentProfile = require('../models/studentProfile');
const ClassSection = require('../models/classSection');

const generateReportCard = async (req, res) => {
    try {
        const { student_id } = req.params;

        const reportCard = await ReportCards.findOne({
            where: { student_id },
            include: [
                { model: StudentProfile, attributes: ['student_name'] },
                { model: ClassSection, attributes: ['class_name', 'section'] }
            ]
        });

        if (!reportCard) {
            return res.status(404).json({ error: 'Report card not found' });
        }

        const {
            academic_year,
            exam_name,
            subject_grades,
            total_marks_obtained,
            total_maximum_marks,
            overall_grade,
            teacher_remarks,
            generated_date
        } = reportCard;

        const student = reportCard.StudentProfile;
        const classDetails = reportCard.ClassSection;

        const filePath = path.join(__dirname, `../../report_card_${student_id}.pdf`);

        const doc = new PDFDocument({ margin: 50 });
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);
        res.setHeader('Content-Type', 'application/pdf');

        doc.fontSize(20).text(`${student.student_name} - Report Card`, { align: 'center' });
        doc.moveDown(1);

        doc.fontSize(12)
            .text(`Class: ${classDetails.class_name} - ${classDetails.section}`)
            .text(`Academic Year: ${academic_year}`)
            .text(`Exam Name: ${exam_name}`)
            .moveDown(1);

        doc.fontSize(14).text('Subject Grades', { underline: true }).moveDown(0.5);

        doc.fontSize(12)
            .text('Subject', 100, doc.y, { continued: true })
            .text('Grade', 250, doc.y);
        doc.moveTo(100, doc.y + 5).lineTo(400, doc.y + 5).stroke();
        doc.moveDown(0.5);

        Object.entries(subject_grades).forEach(([subject, grade]) => {
            doc.fontSize(12)
               .text(subject, 100, doc.y, { width: 200, align: 'left', continued: true }) 
               .text(grade, 200, doc.y, { width: 140, align: 'center' }); 
            doc.moveDown(0.5);
        });

        doc.moveDown(1);
        doc.fontSize(12)
            .text(`Total Marks Obtained: ${total_marks_obtained}`, { continued: false })
            .text(`Total Maximum Marks: ${total_maximum_marks}`, { continued: false })
            .text(`Overall Grade: ${overall_grade}`)
            .moveDown(1);

        doc.fontSize(12).text('Teacher Remarks:', { underline: true }).moveDown(0.5);
        doc.text(teacher_remarks || 'N/A');

        doc.moveDown(2);
        doc.fontSize(10).text(`Generated on: ${new Date(generated_date).toLocaleString()}`, { align: 'right' });

        doc.end();

        writeStream.on('finish', () => {
            res.download(filePath, `report_card_${student.student_name}.pdf`, (err) => {
                if (err) throw err;
                fs.unlinkSync(filePath);
            });
        });

    } catch (error) {
        console.error('Error generating report card PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
    }
};

const addReport = async(req,res)=>{
    try {
        const { student_id, class_id, academic_year, exam_name, subject_grades, total_marks_obtained, total_maximum_marks, overall_grade, teacher_remarks, finalized_by, timetable_id } = req.body;

        const reportCard = await ReportCards.create(
            {
                student_id,
                class_id,
                academic_year,
                exam_name,
                subject_grades,
                total_marks_obtained,
                total_maximum_marks,
                overall_grade,
                teacher_remarks,
            },
            {
                finalized_by,
                timetable_id,
            }
        );

        res.status(201).json({
            status: true,
            message: 'Report card created successfully',
            data: reportCard,
        });
    } catch (error) {
        console.error('Error in adding report:', error);
        res.status(500).json({ error: 'Failed to add report', details: error.message });
    }
}

module.exports = {generateReportCard,addReport}
