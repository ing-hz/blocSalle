const express = require('express')
const router = express.Router()
const {
  createOccupation,
  getAllOccupations,
  getOccupation,
  deleteOccupation,
  updateOccupation,
} = require('../controllers/occupations')

router.route('/').get(getAllOccupations).post(createOccupation)
router
  .route('/:id')
  .get(getOccupation)
  .delete(deleteOccupation)
  .patch(updateOccupation)

module.exports = router
