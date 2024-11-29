const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true }, // The original name of the uploaded file
  storedName: { type: String, required: true },   // The filename generated and stored by multer
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serviceNumber: { type: String, required: true },
  course: { type: String, required: true },
  award: { type: String },
  position: { type: String },
  certificate: fileSchema,       // Use fileSchema for each document type
  endOfTermResult: fileSchema,
  endofTermReport: fileSchema,    // Use fileSchema for each document type
  servicePaper: fileSchema,       // Use fileSchema for each document type
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
