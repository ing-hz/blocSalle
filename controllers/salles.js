const Salle = require('../models/salles')
const Occupation = require('../models/occupations')

/**
 * @swagger
 * /api/salles:
 *   get:
 *     description: Get all Salles
 *     responses:
 *       200:
 *         description: Success
 *
 */
const getAllSalles = async (req, res) => {
  try {
    const salle = await Salle.find().populate('bloc')
    res.status(200).json(salle)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const getSalle = async (req, res) => {
  try {
    const { id: salleID } = req.params
    const salle = await Salle.findOne({ _id: salleID }).populate('bloc')
    if (salle == null) {
      return res
        .status(404)
        .json({ msg: `Il n'y a pas de salle avec cette id:${salleID}` })
    }
    res.status(201).json(salle)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createSalle = async (req, res) => {
  try {
    const salle = await Salle.create(req.body)
    res.status(201).json(salle)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const updateSalle = async (req, res) => {
  try {
    const { id: salleID } = req.params
    const salle = await Salle.findOneAndUpdate({ _id: salleID }, req.body, {
      new: true,
      runValidators: true,
    }).populate('bloc')
    if (salle == null) {
      return res
        .status(404)
        .json({ msg: `Il n'y a pas de salle avec cette id :${salleID}` })
    }
    res.status(201).json(salle)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const deleteSalle = async (req, res) => {
  try {
    const { id: salleID } = req.params
    const occupation = await Occupation.deleteMany({ salle: salleID })
    const salle = await Salle.findOneAndDelete({ _id: salleID }).populate(
      'bloc'
    )
    if (salle == null) {
      return res
        .status(404)
        .json({ msg: `Il n'y a pas de salle avec cette id:${salleID}` })
    } else if (salle != null && occupation == null) {
      return res.status(201).send(salle)
    }
    res
      .status(201)
      .json({ salle, 'ocuupations supprimées': occupation.deletedCount })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
module.exports = {
  getAllSalles,
  getSalle,
  createSalle,
  updateSalle,
  deleteSalle,
}
