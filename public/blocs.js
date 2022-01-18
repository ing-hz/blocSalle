const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.bloc-form')
const blocInputDOM = document.querySelector('.form-control')
const submitDOM = document.querySelector('.btn')
var id = ''
// Load blocs from /api/blocs
const showBlocs = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const { data: blocs } = await axios.get('/api/blocs')
    if (blocs.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allBlocs = blocs
      .map((bloc) => {
        const { _id: blocID, nom } = bloc
        return `
          <tr>
              <th scope="row">${blocID}</th>
              <td>${nom}</td>
              <td>
              <button type="button" class="btnu btn-primary" data-nom="${nom}" data-id="${blocID}">
              <i>modify</i>
              </button>
              </td>
              <td>
              <button type="button" class="btnd btn-warning" data-id="${blocID}">
              <i>delete</i>
              </button>
              </td>
            </tr>
          `
      })
      .join('')
    tasksDOM.innerHTML = allBlocs
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showBlocs()

// update bloc /api/blocs/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('btnu')) {
    id = el.parentElement.dataset.id
    blocInputDOM.value = el.parentElement.dataset.nom
    submitDOM.value = 'Modifier le bloc'
    submitDOM.innerHTML = 'Modifier le bloc'
  }
})

// delete bloc /api/blocs/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('btnd')) {
    loadingDOM.style.visibility = 'visible'
    id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/blocs/${id}`)
      showBlocs()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const nom = blocInputDOM.value
  try {
    if (submitDOM.value == 'Ajouter un bloc') {
      await axios.post('/api/blocs', { nom })
      showBlocs()
      blocInputDOM.value = ''
    } else {
      await axios.patch(`/api/blocs/${id}`, { nom })
      submitDOM.value = 'Ajouter un bloc'
      submitDOM.innerHTML = 'Ajouter un bloc'
      showBlocs()
      blocInputDOM.value = ''
    }
  } catch (error) {
    alert(error)
  }
})
