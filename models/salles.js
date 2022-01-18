const mongoose=require('mongoose');
const SalleSchema=new mongoose.Schema({
    type:{
        type:String,
        required:[true,'salle required !'],
        trim:true
    },
    nom:{
        type:String,
        required:[true,'name salle required!'],
        trim:true
    },
    bloc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bloc',
        required:[true,'id salle required']
    }
})
module.exports=mongoose.model('Salle',SalleSchema);