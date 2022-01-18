const express=require('express');
const router=express.Router();
const {getAllSalles,getSalle,createSalle,updateSalle,deleteSalle}=require('../controllers/salles');

router.route('/').get(getAllSalles).post(createSalle);
router.route('/:id').get(getSalle).patch(updateSalle).delete(deleteSalle);

module.exports=router;