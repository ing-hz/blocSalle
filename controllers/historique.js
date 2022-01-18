const Occupation = require('../models/occupations')
const getHistorique = async (req, res) => {
  try {
    const { id: salleID } = req.params
    const occupations = await Occupation.find({ salle: salleID })
      .populate('creneau')
      .populate('salle')
    if (occupations == null) {
      return res
        .status(404)
        .send({ mg: `Il n'y a pas de salle avec cette id ${salleID}` })
    }
    res.status(200).send(occupations)
  } catch (error) {
    res.status(500).send({ msg: error })
  }
}

module.exports = { getHistorique }
