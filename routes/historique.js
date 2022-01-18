const express=require('express');
const router=express.Router();
const {getHistorique}=require('../controllers/historique'); 

router.route('/:id').get(getHistorique);

module.exports=router;