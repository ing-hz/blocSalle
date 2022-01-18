const Bloc = require('../models/blocs')
const Salle = require('../models/salles')
const Occupation = require('../models/occupations')

const getAllBlocs = async (req, res) => {
  try {
    const bloc = await Bloc.find()

    res.status(201).json(bloc)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const createBloc = async (req, res) => {
  try {
    const bloc = await Bloc.create(req.body)
    res.status(201).json(bloc)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const getBloc = async (req, res) => {
  try {
    const { id: blocID } = req.params
    const bloc = await Bloc.findOne({ _id: blocID })
    if (bloc == null) {
      return res
        .status(404)
        .json({ message: `Il n y a pas de bloc avec cet ID : ${blocID}` })
    }
    res.status(200).json(bloc)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const updateBloc = async (req, res) => {
  try {
    const { id: blocID } = req.params
    const bloc = await Bloc.findOneAndUpdate({ _id: blocID }, req.body, {
      new: true,
      runValidators: true,
    })
    if (bloc == null) {
      return res
        .status(404)
        .json({ message: `Il n y a pas de bloc avec cet ID : ${blocID}` })
    }
    res.status(200).json({ bloc })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const deleteBloc = async (req, res) => {
  try {
    const { id: blocID } = req.params
    const s = await Salle.find({ bloc: blocID })
    var occupation
    for (var i = 0; i < s.length; i++) {
      occupation = await Occupation.deleteMany({ salle: s[i]._id })
    }
    const salle = await Salle.deleteMany({ bloc: blocID })
    const bloc = await Bloc.findOneAndDelete({ _id: blocID })
    if (bloc == null) {
      return res
        .status(404)
        .json({ message: `Il n y a pas de bloc avec cet ID : ${blocID}` })
    } else if (bloc != null && salle == null) {
      return res.status(200).json(bloc)
    } else if (bloc != null && salle != null && occupation == null) {
      return res.status(200).json({
        bloc,
        'nombre de salles supprimées': salle.deletedCount,
      })
    }
    res.status(200).json({
      bloc,
      'nombre de salles supprimées': salle.deletedCount,
      "nombre d'occupations supprimées": occupation.deletedCount,
    })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
module.exports = {
  getAllBlocs,
  createBloc,
  getBloc,
  updateBloc,
  deleteBloc,
}
