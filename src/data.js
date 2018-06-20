//************************************/
//Creamos variables para el guardar la data en bruto
//que viene el Json
//Declaramos los array como tales - []
//y los objetos - new Object
//************************************/
let userRaw = []
let progressRaw
let coursesRaw

//Variables globales
let percent = new Object;
let courses = []
let usersWithStats = [];
//************************************/
let computeCourses = () => {
  for (var i = 0; i < coursesRaw.length; i++) {
    courses.push(coursesRaw[i].id)
  }
}

let getPercent = (quantity, total) => {

  if (quantity === 0){
    return 0
  } else {
    return Math.round((quantity/total)*100)
  }
}

let getAverage = (score, total) => {
  return Math.round(score/total)
}

let computeUsersStats = (users, progress, courses) => {

  users.map((user) => {
    idUser = user.id

    numberQuiz = 0
    completedQuiz = 0
    percentQuiz = 0
    scoreSum = 0
    scoreAvg = 0

    numberRead = 0
    completedRead = 0
    percentRead = 0

    numberPractice = 0
    completedPractice = 0
    percentPractice = 0

    if(progress[idUser].hasOwnProperty("intro")){
      percentUser = progress[idUser].intro.percent

      unitsArray = Object.entries(progress[idUser].intro.units)
      unitsArray.map((units) => {
        Object.entries(units[1].parts)
          .map((unit)=> {
            if(unit[1].type === "read"){
              numberRead++
              completedRead+= unit[1].completed
            } else if (unit[1].type === "quiz"){
              numberQuiz++
              completedQuiz+= unit[1].completed
              if(unit[1].completed === 0){
                scoreSum+= 0
              }else{
                scoreSum += unit[1].score
              }
            } else if (unit[1].type === "practice"){
              numberPractice++
              completedPractice += unit[1].completed
            }
          })
      })

    }else{
      percentUser = -1
    }

    percentRead = getPercent(completedRead, numberRead)
    percentQuiz = getPercent(completedQuiz, numberQuiz)
    percentPractice = getPercent(completedPractice, numberPractice)
    scoreAvg = getAverage(scoreSum, numberQuiz)


    stats = {}
    stats[idUser] = {
      stats : {
        percent : percentUser,
        exercises: {
          total: numberPractice,
          completed : completedPractice,
          percent: percentPractice
        },
        reads :{
          total : numberRead,
          completed : completedRead,
          percent : percentRead
        },
        quizes:{
          total: numberQuiz,
          completed: completedQuiz,
          percent: percentQuiz,
          scoreSum : scoreSum,
          scoreAvg : scoreAvg
        }
      }
    }

    usersWithStats.push(stats)
  })
}

//************************************/
// COMENZAMOS A HACER LAS PROMESAS Y A EJECUTAR LAS FUNCIONES NESECARIAS
// SOLO CUANDO TODAS LAS PROMESAS SE HAYAN CUMPLIDO
//************************************/
const dataUsers = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then(response => response.json())
const dataProgress = fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  .then(response => response.json())
const dataCohorts = fetch('../data/cohorts.json')
  .then(response => response.json())

Promise.all([dataUsers, dataProgress, dataCohorts])
  .then(
    (data) => {
      //Copiamos la data de usuario en bruto
      userRaw = data[0]
      //Copiamos todo el progress en bruto
      progressRaw = data[1]
      //Copiamos todo los cursos en bruto
      coursesRaw = data[2]

      //Procesamos la informacion recaudada en funciones
      computeCourses()

      //test
      computeUsersStats(userRaw, progressRaw, courses)
    }
  )
