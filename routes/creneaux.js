const express=require('express');
const router=express.Router();
const {getAllCreneaux,getCreneau,createCreneau,deleteCreneau,updateCreneau}=require('../controllers/creneaux');

router.route('/').get(getAllCreneaux).post(createCreneau);
router.route('/:id').get(getCreneau).delete(deleteCreneau).patch(updateCreneau);

module.exports=router;