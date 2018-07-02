//VARIABLES CONEXIÓN API
let cohortRaw = []
let campusesRaw
let userRaw = []
let progressRaw = {}
let usersWithStats

// VARIABLES
let contentdata = document.querySelector('.contentdata')
const mystyle = document.styleSheets[1]['cssRules']
const acc = document.getElementsByClassName('accordion')
let panel = document.querySelector('.panel')
const cohortGrid = document.querySelector('.grid2x2')
const usersArea = document.querySelector('#usersArea')
const users = document.querySelector('.users')
const searcharea = document.getElementsByClassName('searcharea')
const h1content = document.getElementById('h1content')
const h2content = document.getElementById('h2content')
const textpanel = document.getElementById('textpanel')
const searchbox = document.getElementById('searchbox')
const loader = document.getElementsByClassName('loader')

// FETCH INICIALES
const dataCohorts = fetch('https://api.laboratoria.la/cohorts').then(response =>
  response.json()
)
const dataCampuses = fetch('https://api.laboratoria.la/campuses').then(
  response => response.json()
)

Promise.all([dataCohorts, dataCampuses]).then(data => {
  displayShowHide(loader[0], 'hide')
  displayShowHide(contentdata, 'show')

  cohortRaw = data[0]
  campusesRaw = data[1]

  addCampuses()
  makeAccordeonButton()
})

//-------------------------------------------------------
//FUNCION PARA MOSTRAR, OCULTAR Y HACER APARECER EL MENU
//-------------------------------------------------------
let displayShowHide = (draw, att) => {
  att == 'show' ? (draw.style.display = 'block') : (draw.style.display = 'none')
}

//FUNCION PARA HACER UN CAMBIO ENTRE MOSTRAR Y OCULTAR
let displayToggle = draw => {
  draw.style.display === 'block'
    ? (draw.style.display = 'none')
    : (draw.style.display = 'block')
}

displayShowHide(loader[0], 'show')
displayShowHide(contentdata, 'hide')

let makeAccordeonButton = () => {
  acc[0].addEventListener('click', () => {
    panel = acc[0].nextElementSibling
    displayToggle(panel)
    acc[0].classList.toggle('active')
  })
}

let toggleSidebar = () => {
  x = mystyle[3].style['margin-left']
  y = mystyle[2].style['left']

  if (window.innerWidth < 1024){
    mystyle[2].style['left'] = y == '-232px' ? '0' : '-232px'
  }else{
    mystyle[3].style['margin-left'] = x  == '232px' ? '0' : '232px'
    mystyle[2].style['left'] = y == '-232px' ? '0' : '-232px'
    
  }
  
}

//-------------------------------------------------------//
// AÑADIMOS LOS CAMPUS A LOS BOTONES
//-------------------------------------------------------//
let addCampuses = () => {
  for (n in campusesRaw) {
    if (campusesRaw[n].active === true) {
      const namecampus = campusesRaw[n].name
      const idcampus = campusesRaw[n].id
      const button = document.createElement('button')
      button.addEventListener(
        'click',
        function() {
          showCohort(idcampus)
        },
        false
      )

      button.className = 'submenuButton'
      button.innerHTML = namecampus + ' ' + '<i class="fas fa-angle-right"></i>'

      panel.appendChild(button)
    }
  }
}

/*-------------------------------------------------------
 CUANDO DAN CLICK AL BOTON AGREGAMOS BOTONES
 CON EL NOMBRE DEL COHORT CORRESPONDIENTE
 GUARDAMOS EL ID PARA FUTUROS PROCESOS
-------------------------------------------------------*/
let showCohort = id => {
  // REMUEVE PARA DESPEJAR DIV CONTENEDOR COHORTS
  while (cohortGrid.firstChild) {
    cohortGrid.removeChild(cohortGrid.firstChild)
  }

  displayShowHide(searcharea[0], 'hide')
  displayShowHide(usersArea, 'hide')

  h1content.innerHTML = '/Cohorts'
  h2content.innerHTML = ''
  textpanel.innerHTML = 'Selecciona un campus del menu para comenzar:'

  // FILTRA LOS COHORTS POR ID QUE COINCIDA CON EL ID DEL CAMPUS
  cohortRaw.filter(x => {
    if (x.id.includes(id)) {
      const firstDiv = document.createElement('div')
      const secondDiv = document.createElement('div')

      firstDiv.className = 'buttoncohort'
      secondDiv.innerHTML = x.id
      secondDiv.innerHTML +=
        "<div class='subtext'> Usuarios: " + x.usersCount + '</div>'
      firstDiv.addEventListener(
        'click',
        function() {
          loadUsersProgress(x.id)
        },
        false
      )
      cohortGrid.appendChild(firstDiv)
      firstDiv.appendChild(secondDiv)
    }
  })

  // REVIERTE LA POSICION
  let grid = Array.prototype.slice.call(cohortGrid.childNodes)
  for (let i = grid.length - 1; i >= 0; i--) {
    cohortGrid.appendChild(grid[i])
  }
}

//CREAMOS FUNCIÓN PARA OBTENER CURSOS
  let computeCourses = idcohort => {
    for (n in cohortRaw) {
      if (cohortRaw[n].id === idcohort) {
        courses = Object.keys(cohortRaw[n].coursesIndex)
      }
    }
    return courses
  }
/*-------------------------------------------------------
 CUANDO DAN CLICK AL BOTON DEL COHORT GUARDAMOS
 LA INFORMACION DEL COHORT DENTRO UN NUEVO ARREGLO
 Y CON EL ID HACEMOS FETCH DE LA DATA DE LOS USUARIOS
 Y EL PROGRESS.
 LLAMAMOS A LA FUNCION QUE PROCESARA TODA ESTA INFORMACION
-------------------------------------------------------*/
let loadUsersProgress = idCohort => {
  h1content.innerHTML = ''
  h2content.innerHTML = `/Cohorts/${idCohort}`
  textpanel.innerHTML = ''

  displayShowHide(contentdata, 'hide')
  displayShowHide(loader[0], 'show')

  // REMUEVE PARA DESPEJAR DIV CONTENEDOR COHORTS
  while (cohortGrid.firstChild) {
    cohortGrid.removeChild(cohortGrid.firstChild)
  }


  // GUARDAMOS EL ID Y LO SEPARAMOS DE TODA LA DATA DE COHORT
  computeCourses(idCohort)

  const dataUsers = fetch(
    `https://api.laboratoria.la/cohorts/${idCohort}/users`
  ).then(response => response.json())

  const dataProgress = fetch(
    `https://api.laboratoria.la/cohorts/${idCohort}/progress`
  ).then(response => response.json())

  Promise.all([dataUsers, dataProgress]).then(data => {
    displayShowHide(contentdata, 'show')
    displayShowHide(loader[0], 'hide')

    progressRaw = data[1]
    usersRaw = data[0]

    cohort = computeCourses(idCohort)

    opt = {
      cohort: cohort,
      cohortData: {
        users: usersRaw,
        progress: progressRaw
      },
      orderBy: 'name',
      orderDirection: 'ASC',
      search: ''
    }

    usersWithStats = processCohortData(opt)
    showUsersProgress(usersWithStats)
  })
}

/*----------------------------------
  CON TODA LA INFORMACION PROCESADA
  LA MOSTRAMOS EN PANTALLA
-----------------------------------*/
let showUsersProgress = array => {
  while (users.firstChild) {
    users.removeChild(users.firstChild)
  }

  displayShowHide(searcharea[0], 'show')
  displayShowHide(usersArea, 'show')
  array.map(user => {
    //CREAMOS UN DIV PARA EL USUARIO DENTRO DEL DIV CORRESPONDIENTE

    
    div = document.createElement('div')
    div.className = 'user'

    divName = document.createElement('div')
    divName.innerHTML = user.name

    divReads = document.createElement('div')
    divReads.innerHTML = user.stats.reads.percent

    divExercises = document.createElement('div')
    divExercises.innerHTML = user.stats.exercises.percent

    divQuizzes = document.createElement('div')
    divQuizzes.innerHTML = user.stats.quizzes.percent

    divTotal = document.createElement('div')
    divTotal.innerHTML = user.stats.percent

    users.appendChild(div)
    div.appendChild(divName)
    div.appendChild(divReads)
    div.appendChild(divExercises)
    div.appendChild(divQuizzes)
    div.appendChild(divTotal)
  })
}

let nOrder = 'DESC'
let rOrder = 'ASC'
let eOrder = 'ASC'
let qOrder = 'ASC'
let tOrder = 'ASC'

let sortBy = orderBy => {
  if (orderBy === 'name') {
    sortUsers(usersWithStats, 'name', nOrder)
    showUsersProgress(usersWithStats)

    nOrder === 'DESC' ? (nOrder = 'ASC') : (nOrder = 'DESC')
    rOrder = eOrder = qOrder = tOrder = 'ASC'
  } else if (orderBy === 'reads') {
    sortUsers(usersWithStats, 'pReads', rOrder)
    showUsersProgress(usersWithStats)

    rOrder === 'ASC' ? (rOrder = 'DESC') : (rOrder = 'ASC')
    nOrder = eOrder = qOrder = tOrder = 'ASC'
  } else if (orderBy === 'excersises') {
    sortUsers(usersWithStats, 'pExercises', eOrder)
    showUsersProgress(usersWithStats)

    eOrder === 'ASC' ? (eOrder = 'DESC') : (eOrder = 'ASC')
    nOrder = rOrder = qOrder = tOrder = 'ASC'
  } else if (orderBy === 'quizz') {
    sortUsers(usersWithStats, 'pquizes', qOrder)
    showUsersProgress(usersWithStats)

    qOrder === 'ASC' ? (qOrder = 'DESC') : (qOrder = 'ASC')
    nOrder = rOrder = eOrder = tOrder = 'ASC'
  } else if (orderBy === 'percent') {
    sortUsers(usersWithStats, 'percent', tOrder)
    showUsersProgress(usersWithStats)

    tOrder === 'ASC' ? (tOrder = 'DESC') : (tOrder = 'ASC')
    nOrder = rOrder = eOrder = qOrder = 'ASC'
  }
}

let search = () => {
  newFilter = filterUsers(usersWithStats, searchbox.value.toUpperCase())
  showUsersProgress(newFilter)
}