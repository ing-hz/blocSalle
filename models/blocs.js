const mongoose=require('mongoose');

const BlocSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:[true,'Vous devez entrer un nom !'],
        trim:true
    }
})
module.exports=mongoose.model('Bloc',BlocSchema)