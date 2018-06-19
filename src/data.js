//Guardamos las etiquetas en constantes porsiacaso cambian

//Creamos variables como arrays vacíos
let userRaw = []
let progressRaw
let cohortsRaw

let progress = new Object;
let courses = []
//Creamos constantes para traer objetos Json
let computeProgress = () => {
  for (key in progressRaw){
    if(progressRaw[key].hasOwnProperty('intro')){
      getPercent = progressRaw[key].intro.percent
      progress[key] = getPercent
    }else{
      progress[key] = 'No posee datos'
    }
  }
}

let computeCourses = () => {
  for (i=0; i < cohortsRaw.length; i++){
    courses.push(cohortsRaw[i].id)
  }
}

let computeUsersStats = (users, progress, courses) => {
  usersWithStats.stats;
}

//Cargamos los Json
const dataUsers = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then(response => response.json())
const dataProgess = fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  .then(response => response.json())
const dataCohorts   = fetch('../data/cohorts.json')
  .then(response => response.json())

Promise.all([dataUsers,dataProgess,dataCohorts]).then((data) => {
  userRaw = data[0] //Guardado el Json users en bruto
  progressRaw = data[1]
  cohortsRaw = data[2]

  computeProgress()
  computeCourses()
  }
)