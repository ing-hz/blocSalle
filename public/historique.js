const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM=document.querySelector('.historique-form')
const salleInputDOM=document.querySelector('.salle');
const submitDOM=document.querySelector('.btn');
var id="";


// Load occupations from /api/occupations
const showhistorique = async (id) => {
    loadingDOM.style.visibility = 'visible'
    try {
      const {
        data: historique,
      } = await axios.get(`/api/historique/${id}`)
      if (historique.length < 1) {
        tasksDOM.innerHTML = '<h5 class="empty-list">Cette n\'a jamais été occupée !</h5>'
        loadingDOM.style.visibility = 'hidden'
        return
      }
      const h = historique
        .map((hist) => {
          const { _id: occupationID,creneau,date } = hist
          return `
          <tr>
              <th scope="row">${occupationID}</th>
              <td>${creneau.heure_debut}-${creneau.heure_fin}</td>
              <td>
              ${date.split("T")[0]}
              </td>
            </tr>
          `
        })
        .join('')
      tasksDOM.innerHTML = h
    } catch (error) {
        alert(error);
      tasksDOM.innerHTML =
        '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
  }


  //afficher l'historique
  formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const salle = salleInputDOM.value
    try {
            showhistorique(salle)
            salleInputDOM.value=''
    } catch (error) {
      alert(error);
    }
  })


// Load salles from /api/salles
const showSalles = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
      const {
        data: salles,
      } = await axios.get('/api/salles')
      if (salles.length < 1) {
        tasksDOM.innerHTML = '<h5 class="empty-list">No Occupations found</h5>'
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