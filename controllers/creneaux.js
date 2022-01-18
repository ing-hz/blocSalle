const Creneau = require('../models/creneaux');

const getAllCreneaux=async (req,res)=>{
    try {
        const creneau=await Creneau.find();
        res.status(200).send(creneau);
    } catch (error) {
        res.status(500).send({msg:error});
    }
}

const getCreneau=async (req,res)=>{
    try {
        const {id:creneauID}=req.params;
        const creneau=await Creneau.findOne({_id:creneauID});
        if(creneau==null){
            return res.status(404).send(`Il n y a pas de créneau avec cette ID :${creneauID}`);
        }
        res.status(200).send(creneau);
    } catch (error) {
        res.status(500).send({msg:error});
    }
}

const createCreneau=async (req,res)=>{
    try {
        const creneau=await Creneau.create(req.body);
        res.status(201).send(creneau);
    } catch (error) {
        res.status(500).status({msg:error});
    }
}
const deleteCreneau=async (req,res)=>{
    try {
        const {id:creneauID}=req.params;
        const creneau=await Creneau.findOneAndDelete({_id:creneauID});
        if(creneau==null){
            return res.status(404).send(`Il n'y a pas de creneau avec cette id :${creneauID}`);
        }
        res.status(200).send(creneau);
    } catch (error) {
        res.status(500).send({msg:error});
    }
}
const updateCreneau=async (req,res)=>{
    try {
        const {id:creneauID}=req.params;
        const creneau=await Creneau.findOneAndUpdate({_id:creneauID},req.body,{
            new:true,
            runValidators:true
        });
        if(creneau==null){
            return res.status(200).send(`I l n'y a pas de creneau avec cette id:${creneauID}`);
        }
        res.status(200).send(creneau);
    } catch (error) {
        res.status(500).send({msg:error})   
    }
}

module.exports={getAllCreneaux,getCreneau,createCreneau,deleteCreneau,updateCreneau};