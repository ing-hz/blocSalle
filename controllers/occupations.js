const Occupation = require('../models/occupations')
const WebSocket = require('ws')
const createOccupation = async (req, res) => {
  try {
    const c = await Occupation.findOne(req.body)

    var occupation
    if (c == null) {
      occupation = await Occupation.create(req.body)
      // Créer une connexion WebSocket
      const socket = new WebSocket('ws://localhost:3000')
      // La connexion est ouverte
      socket.addEventListener('open', function (event) {
        socket.send('')
      })
      // Écouter les messages
      socket.addEventListener('message', function (event) {})
    } else {
      return res.send({ msg: `La salle est déjà occupée !` })
    }
    res.status(201).send(occupation)
  } catch (error) {
    res.status(500).send({ msg: error })
  }
}
const getAllOccupations = async (req, res) => {
  try {
    const occupation = await Occupation.find()
      .populate('creneau')
      .populate('salle')
    res.status(200).send(occupation)
  } catch (error) {
    res.status(500).send({ msg: error })
  }
}
const getOccupation = async (req, res) => {
  try {
    const { id: occupationID } = req.params
    const occupation = await Occupation.findOne({ _id: occupationID }).populate(
      'creneau'
    )
    if (occupation == null) {
      return res
        .status(404)
        .send(`Il n'y a pas d'occupation avec cette id:${occupationID}`)
    }
    res.status(200).send(occupation)
  } catch (error) {
    res.status(500).send({ msg: error })
  }
}

const deleteOccupation = async (req, res) => {
  try {
    const { id: occupationID } = req.params
    const occupation = await Occupation.findOneAndDelete({ _id: occupationID })
    if (occupation == null) {
      return res
        .status(404)
        .send(`Il n'y a pas d'occupation avec cette id :${occupationID}`)
    }
    res.status(200).send(occupation)
  } catch (error) {
    res.status(500).send({ msg: error })
  }
}
const updateOccupation = async (req, res) => {
  try {
    const { id: occupationID } = req.params
    const occupation = await Occupation.findOneAndUpdate(
      { _id: occupationID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('salle')
    if (occupation == null) {
      return res
        .status(200)
        .send(`I l n'y a pas d'occupation' avec cette id:${occupationID}`)
    }
    res.status(200).send(occupation)
  } catch (error) {
    res.status(500).send({ msg: error })
  }
}

module.exports = {
  createOccupation,
  getAllOccupations,
  getOccupation,
  deleteOccupation,
  updateOccupation,
}
