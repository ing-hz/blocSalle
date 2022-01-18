const express =require('express');
const router=express.Router();
const {getAllBlocs,createBloc,getBloc,updateBloc,deleteBloc}=require('../controllers/blocs');


router.route('/').get(getAllBlocs).post(createBloc);
router.route('/:id').get(getBloc).patch(updateBloc).delete(deleteBloc);



module.exports=router;