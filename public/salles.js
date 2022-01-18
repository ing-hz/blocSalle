const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM=document.querySelector('.salle-form')
const nomInputDOM=document.querySelector('.nom-salle');
const typeInputDOM=document.querySelector('.type-salle');
const blocInputDOM=document.querySelector('.form-select');
const submitDOM=document.querySelector('.btn');
var id="";
var qr=[];
// form

formDOM.addEventListener('submit', async (e) => {
    qr=[]
    e.preventDefault()
    const nom = nomInputDOM.value
    const type= typeInputDOM.value
    const bloc=blocInputDOM.value
    try {
        if(submitDOM.value=="Ajouter une salle"){
            await axios.post('/api/salles', { nom:nom,type:type,bloc:bloc })
            showSalles()
            nomInputDOM.value=''
            typeInputDOM.value=''
            blocInputDOM.value = ''
        }else{
            await axios.patch(`/api/salles/${id}`, { nom:nom,type:type,bloc:bloc })
            submitDOM.value="Ajouter une salle"
            submitDOM.innerHTML="Ajouter une salle"
            showSalles()
            nomInputDOM.value=''
            typeInputDOM.value=''
            blocInputDOM.value = ''
        }
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
        tasksDOM.innerHTML = '<h5 class="empty-list">No salles in your list</h5>'
        loadingDOM.style.visibility = 'hidden'
        return
      }
      const allSalles = salles
        .map((salle) => {
          const { _id: salleID,type,nom,bloc } = salle
          qr.push(salleID+"");
          
          return `
          <tr>
              <th scope="row">${salleID}</th>
              <td>${nom}</td>
              <td>${type}</td>
              <td>${bloc.nom}</td>
              <td><div id="${salleID}"></div></td>
              <td>
              <button type="button" class="btnu btn-primary" data-blocid="${bloc._id}" data-bloc="${bloc.nom}" data-type="${type}" data-nom="${nom}" data-id="${salleID}">
              <i>modify</i>
              </button>
              </td>
              <td>
              <button type="button" class="btnd btn-warning" data-id="${salleID}">
              <i>supprimer</i>
              </button>
              </td>
            </tr>
            
          `
        })
        .join('')

      tasksDOM.innerHTML = allSalles
      for(let i = 0; i < qr.length; i++){
        new QRCode(document.getElementById(qr[i]), {
          text:qr[i],
          width:128,
          height:128
        });
      }
    } catch (error) {
      tasksDOM.innerHTML =
        '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
  }
  
  showSalles()

  // delete salle /api/salles/:id

tasksDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('btnd')) {
      loadingDOM.style.visibility = 'visible'
      id = el.parentElement.dataset.id
      try {
        await axios.delete(`/api/salles/${id}`)
        showSalles();
      } catch (error) {
        console.log(error)
      }
    }
    loadingDOM.style.visibility = 'hidden'
  });

  // update bloc /api/blocs/:id

  tasksDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('btnu')) {
      id = el.parentElement.dataset.id
      nomInputDOM.value=el.parentElement.dataset.nom
      typeInputDOM.value=el.parentElement.dataset.type
      blocInputDOM.value= el.parentElement.dataset.blocid
      submitDOM.value="Modifier la salle"
      submitDOM.innerHTML="Modifier la salle"
    }
  });

  // Load blocs from /api/blocs
const showBlocs = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
      const {
        data: blocs,
      } = await axios.get('/api/blocs')
      if (blocs.length < 1) {
        tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
        loadingDOM.style.visibility = 'hidden'
        return
      }
      const allBlocs = blocs
        .map((bloc) => {
          const { _id: blocID, nom } = bloc
          return `
                <option value="${blocID}">${nom}</option>
          `
        })
        .join('')
        blocInputDOM.innerHTML = allBlocs
    } catch (error) {
        blocInputDOM.innerHTML =
        '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
  }
  
  showBlocs()