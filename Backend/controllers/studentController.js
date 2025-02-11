// studentController.js
const Student = require('../models/Student');
const path = require('path');

// studentController.js
exports.createStudent = async (req, res) => {
  try {
    const { name, serviceNumber, course, year, award, position } = req.body;

    const certificate = req.files['certificate']
      ? {
          originalName: req.files['certificate'][0].originalname,
          storedName: req.files['certificate'][0].filename,
        }
      : null;

    const endOfTermResult = req.files['endOfTermResult']
      ? {
          originalName: req.files['endOfTermResult'][0].originalname,
          storedName: req.files['endOfTermResult'][0].filename,
        }
      : null;

      const endofTermReport = req.files['endofTermReport']
      ? {
          originalName: req.files['endofTermReport'][0].originalname,
          storedName: req.files['endofTermReport'][0].filename,
        }
      : null;

    const servicePaper = req.files['servicePaper']
      ? {
          originalName: req.files['servicePaper'][0].originalname,
          storedName: req.files['servicePaper'][0].filename,
        }
      : null;

    // Save student data along with file details in the database
    const newStudent = new Student({
      name,
      serviceNumber,
      course,
      year,
      award,
      position,
      certificate,
      endOfTermResult,
      endofTermReport,
      servicePaper,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student and files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Error saving student data and files' });
  }
};


exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    const studentsWithFiles = students.map(student => ({
      ...student._doc,
      endOfTermResultUrl: `${req.protocol}://${req.get('host')}/uploads/${student.endOfTermResult}`,
      endofTermReportUrl: `${req.protocol}://${req.get('host')}/uploads/${student.endofTermReport}`,
      servicePaperUrl: `${req.protocol}://${req.get('host')}/uploads/${student.servicePaper}`,
      certificateUrl: `${req.protocol}://${req.get('host')}/uploads/${student.certificate}`,
    }));
    res.status(200).json(studentsWithFiles);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

exports.searchStudent = async (req, res) => {
  try {
    const { name, serviceNumber } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive regex for name
    }

    if (serviceNumber) {
      query.serviceNumber = serviceNumber.trim(); // Ensure serviceNumber is a string
    }

    console.log("Search Query:", query); // Debug log for query object

    const student = await Student.findOne(query);
    if (!student) {
      console.log("Student not found with query:", query);
      return res.status(404).json({ error: 'Student not found.' });
    }

    res.status(200).json({
      ...student._doc,
      endOfTermResultUrl: `${req.protocol}://${req.get('host')}/uploads/${student.endOfTermResult}`,
      endofTermReportUrl: `${req.protocol}://${req.get('host')}/uploads/${student.endofTermReport}`,
      servicePaperUrl: `${req.protocol}://${req.get('host')}/uploads/${student.servicePaper}`,
      certificateUrl: `${req.protocol}://${req.get('host')}/uploads/${student.certificate}`,
    });
  } catch (error) {
    console.error("Error searching for student:", error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

exports.filterStudents = async (req, res) => {
  try {
    const { course, year } = req.query;
    const filter = {};

    if (course) filter.course = course;
    if (year) filter.year = parseInt(year, 10);

    const students = await Student.find(filter);
    res.status(200).json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

exports.downloadFile = (req, res) => {
  const { storedName, originalName } = req.params;

  const filePath = path.join(__dirname, '..', 'uploads', storedName);

  res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
  res.setHeader('Content-Type', 'application/octet-stream');

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error serving file:", err);
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: "File not found" });
      } else {
        return res.status(500).json({ error: "Error serving file" });
      }
    }
  });
};


// Example route in your backend (Node.js/Express)
exports.studentcount = async (req, res) => {
  try {
    const courseCounts = await Student.aggregate([
      { $group: { _id: '$course', count: { $sum: 1 } } },
    ]);
    res.status(200).json(courseCounts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student counts per course' });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};

// Edit Student
exports.editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, serviceNumber, course, year, award, position } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, serviceNumber, course, year, award, position },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Error updating student' });
  }
}