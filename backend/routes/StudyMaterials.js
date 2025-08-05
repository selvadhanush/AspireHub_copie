const express = require('express');
const router = express.Router();
const {
  getAllMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial
} = require('../controllers/StudyMaterials');

const requireAuth = require('../middleware/authmiddleware');

router.get('/', getAllMaterials);
router.post('/', requireAuth, addMaterial);
router.put('/:id', requireAuth, updateMaterial);
router.delete('/:id', requireAuth, deleteMaterial);

module.exports = router;
