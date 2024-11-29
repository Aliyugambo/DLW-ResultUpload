const UploadModel = require('../models/UploadModel');

// Controller to upload files with metadata
exports.uploadFiles = (req, res) => {
    const { date, courseTitle, department } = req.body;
    const generalResult = req.files['generalResult'] ? req.files['generalResult'][0].filename : null;
    const proficiencyDocument = req.files['proficiencyDocument'] ? req.files['proficiencyDocument'][0].filename : null;
    const proficiencySecondTerm = req.files['proficiencySecondTerm'] ? req.files['proficiencySecondTerm'][0].filename : null;

    if (!generalResult || !proficiencyDocument || !date || !courseTitle || !department) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Save file information to the database
    const newUpload = new UploadModel({
        date,
        courseTitle,
        department,
        generalResult,
        proficiencyDocument,
        proficiencySecondTerm,
    });

    newUpload.save()
        .then(() => res.json({ message: 'Files uploaded successfully' }))
        .catch((error) => {
            console.error('Error saving to database:', error);
            res.status(500).json({ error: 'Error saving to database' });
        });
};

// Controller to get all uploaded files
exports.getAllUploads = async (req, res) => {
    try {
        const uploads = await UploadModel.find();
        const uploadsWithUrls = uploads.map(upload => ({
            ...upload._doc,
            generalResultUrl: `${req.protocol}://${req.get('host')}/uploads/${upload.generalResult}`,
            proficiencyDocumentUrl: `${req.protocol}://${req.get('host')}/uploads/${upload.proficiencyDocument}`,
            proficiencySecondUrl: `${req.protocol}://${req.get('host')}/uploads/${upload.proficiencySecondTerm}`,
        }));
        res.json(uploadsWithUrls);
    } catch (error) {
        console.error('Error fetching uploads:', error);
        res.status(500).json({ error: 'Error fetching uploaded files' });
    }
};


exports.deleteUploads = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Delete the document from the database
        const deletedUpload = await UploadModel.findByIdAndDelete(id);
    
        if (!deletedUpload) {
          return res.status(404).json({ message: 'Document not found' });
        }
    
        res.status(200).json({ message: 'Document deleted successfully' });
      } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.editUploads = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body; // should contain fields like courseTitle, department, etc.
    
        // Update the document in the database
        const updatedUpload = await UploadModel.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!updatedUpload) {
          return res.status(404).json({ message: 'Document not found' });
        }
    
        res.status(200).json(updatedUpload);
      } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ message: 'Server error' });
      }
}