const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.occupation-form')
const salleInputDOM = document.querySelector('.salle')
const creneauInputDOM = document.querySelector('.creneau')
const submitDOM = document.querySelector('.btn')
var id = ''

// Load occupations from /api/occupations
const showOccupations = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const { data: occupations } = await axios.get('/api/occupations')
    if (occupations.length < 1) {
      tasksDOM.innerHTML =
        '<h5 class="empty-list">No occupations in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allOccupations = occupations
      .map((occupation) => {
        const { _id: occupationID, salle, creneau } = occupation
        return `
          <tr>
              <th scope="row">${occupationID}</th>
              <td>${salle.nom}</td>
              <td>${creneau.heure_debut}-${creneau.heure_fin}</td>
              <td>
              <button type="button" class="btnu btn-secondary"data-id="${occupationID}" data-salleid="${salle._id}" data-creneauid="${creneau._id}">
              <i>modify</i>
              </button>
              </td>
              <td>
              <button type="button" class="btnd btn-danger" data-id="${occupationID}">
              <i>delete</i>
              </button>
              </td>
            </tr>
          `
      })
      .join('')
    tasksDOM.innerHTML = allOccupations
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showOccupations()

// Load salles from /api/salles
const showSalles = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const { data: salles } = await axios.get('/api/salles')
    if (salles.length < 1) {
      tasksDOM.innerHTML =
        '<h5 class="empty-list">No Occupations found</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allSalles = salles
      .map((salle) => {
        const { _id: salleID, nom } = salle
        return `
                <option value="${salleID}">${nom}</option>
          `
      })
      .join('')
    salleInputDOM.innerHTML = allSalles
  } catch (error) {
    salleInputDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showSalles()

// Load creneaux from /api/creneaux

const showCreneaux = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const { data: creneaux } = await axios.get('/api/creneaux')
    if (creneaux.length < 1) {
      tasksDOM.innerHTML =
        '<h5 class="empty-list">No Occupations found</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allCreneaux = creneaux
      .map((creneau) => {
        const { _id: creneauID, heure_debut, heure_fin } = creneau
        return `
                <option value="${creneauID}">${heure_debut}-${heure_fin}</option>
          `
      })
      .join('')
    creneauInputDOM.innerHTML = allCreneaux
  } catch (error) {
    creneauInputDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}
showCreneaux()

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const salle = salleInputDOM.value
  const creneau = creneauInputDOM.value
  try {
    if (submitDOM.value == 'Ajouter une occupation') {
      const { data: msg } = await axios.post('/api/occupations', {
        salle: salle,
        creneau: creneau,
      })
      if (msg.msg == 'La salle est déjà occupée !') {
        alert(msg.msg)
        return
      }
      showOccupations()
      salleInputDOM.value = ''
      creneauInputDOM.value = ''
    } else {
      await axios.patch(`/api/occupations/${id}`, {
        salle: salle,
        creneau: creneau,
      })
      submitDOM.value = 'Ajouter une occupation'
      submitDOM.innerHTML = 'Ajouter une occupation'
      showOccupations()
      salleInputDOM.value = ''
      creneauInputDOM.value = ''
    }
  } catch (error) {
    alert(error)
  }
})

// delete occupation /api/occupations/:id
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('btnd')) {
    loadingDOM.style.visibility = 'visible'
    id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/occupations/${id}`)
      showOccupations()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// update bloc /api/blocs/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('btnu')) {
    id = el.parentElement.dataset.id
    salleInputDOM.value = el.parentElement.dataset.salleid
    creneauInputDOM.value = el.parentElement.dataset.creneauid
    submitDOM.value = "Modify"
    submitDOM.innerHTML = "delete"
  }
})

/*// Créer une connexion WebSocket
const socket = new WebSocket('ws://localhost:3000')
// La connexion est ouverte
socket.addEventListener('open', function (event) {})
// Écouter les messages
socket.addEventListener('message', function (event) {
  if (event.data == '1') {
    showOccupations()
    socket.send(0)
  } else {
    socket.send(0)
  }
})*/
const socket = new WebSocket('ws://localhost:3000')
// La connexion est ouverte
socket.addEventListener('open', function (event) {})
// Écouter les messages
socket.addEventListener('message', function (event) {
  showOccupations()
})
