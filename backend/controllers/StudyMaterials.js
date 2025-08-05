const StudyMaterial = require('../models/StudyMaterials');

// Get all materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ createdAt: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching materials' });
  }
};

// Add material
exports.addMaterial = async (req, res) => {
  const { title, subject, link } = req.body;
  if (!title || !subject || !link) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMaterial = new StudyMaterial({
      title,
      subject,
      link,
      createdBy: req.user.userId,
    });
    await newMaterial.save();
    res.status(201).json({ message: 'Material added!', material: newMaterial });
  } catch (err) {
    res.status(500).json({ message: 'Error adding material' });
  }
};

// Update material
exports.updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { title, subject, link } = req.body;

  try {
    const updated = await StudyMaterial.findByIdAndUpdate(
      id,
      { title, subject, link },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Material not found' });
    res.json({ message: 'Material updated!', material: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating material' });
  }
};

// Delete material
exports.deleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await StudyMaterial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Material not found' });
    res.json({ message: 'Material deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting material' });
  }
};
