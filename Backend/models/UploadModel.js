// models/UploadModel.js
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  courseTitle: { type: String, required: true },
  department: { type: String, required: true },
  generalResult: { type: String, required: true }, // Stores file path for general result
  proficiencyDocument: { type: String, required: true }, // Stores file path for proficiency document
  proficiencySecondTerm: { type: String, required: true }, // or appropriate type
});

const UploadModel = mongoose.model('Upload', uploadSchema);

module.exports = UploadModel;
