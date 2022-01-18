const mongoose =require('mongoose');

const OccupationSchema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    creneau:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Creneau',
        required:true,
        trim:true
    },
    salle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Salle',
        required:true,
        trim:true
    }
});

module.exports=mongoose.model('Occupation',OccupationSchema);