const mongoose =require('mongoose');
const CreneauSchema=new mongoose.Schema({
    heure_debut:{
        type:String,
        required:true,
        trim:true
    },
    heure_fin:{
        type:String,
        required:true,
        trim:true
    }
});
module.exports=mongoose.model('Creneau',CreneauSchema);
