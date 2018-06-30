let coursesRaw
let campusesRaw

//Variables globales
let percent = {}
let filterNameArray = []

//************************************/

window.computeCourses = idcohort => {
  for (n in coursesRaw) {
    if (coursesRaw[n].id === idcohort) {
      courses = coursesRaw[n]
    }
  }

  return courses
}

let getPercentFromTwoValues = (quantity, total) => {
  return Math.round((quantity / total) * 100)
}

let getAverage = (score, total) => {
  return Math.round(score / total)
}

let computeUsersStats = (users, progress, courses) => {
  // LIMPIAMOS EL USERSWITHSTATS ANTES DE EMPEZAR
  usersWithStats = []

  users.map(user => {
    if (user.role === "student") {
    let percentUser = 0

    let numberQuiz = 0
    let completedQuiz = 0
    let percentQuiz = 0
    let scoreSum = 0
    let scoreAvg = 0

    let numberRead = 0
    let completedRead = 0
    let percentRead = 0

    let numberPractice = 0
    let completedPractice = 0
    let percentPractice = 0

    let getPercent = []

    //if (courses.id === cohorUser) {
    Object.keys(courses.coursesIndex).map(cohortName => {
      if (progress[user.id].hasOwnProperty(cohortName)) {
        //percentArray.push(progress[idUser][cohortName].percent)
        //console.log(percentArray)
        unitsArray = Object.entries(progress[user.id][cohortName].units)

        unitsArray.map(units => {
          Object.entries(units[1].parts).map(unit => {
            if (unit[1].type === 'read') {
              numberRead++
              completedRead += unit[1].completed
            } else if (unit[1].type === 'quiz') {
              numberQuiz++
              completedQuiz += unit[1].completed
              if (unit[1].completed === 0) {
                scoreSum += 0
              } else {
                scoreSum += unit[1].score
              }
            } else if (unit[1].type === 'practice') {
              numberPractice++
              completedPractice += unit[1].completed
            }
          })
        })
      }
    })
    //}

    /********************************************
    NO TODOS TIENEN READS, QUIZ, O EXERCISES
    ALGUNOS SOLO PUEDEN TENER UNO DE CADA TIPO
    DEBEMOS ASEGURARNOS DE DIFERENCIARLOS PARA NO
    MAL CALULAR SUS ESTADISTICAS 
    *********************************************/
    if (numberRead === 0) {
      numberRead = 0
      completedRead = 0
      percentRead = 0
    } else {
      percentRead = getPercentFromTwoValues(completedRead, numberRead)
      getPercent.push(percentRead)
    }

    if (numberPractice === 0) {
      numberPractice = 0
      completedPractice = 0
      percentPractice = 0
    } else {
      percentPractice = getPercentFromTwoValues(
        completedPractice,
        numberPractice
      )
      getPercent.push(percentPractice)
    }

    if (numberQuiz === 0) {
      numberQuiz = 0
      completedQuiz = 0
      percentQuiz = 0
      scoreSum = 0
      scoreAvg = 0
    } else {
      percentQuiz = getPercentFromTwoValues(completedQuiz, numberQuiz)
      getPercent.push(percentQuiz)
      scoreAvg = getAverage(scoreSum, numberQuiz)
    }

    /***********************************************************************
    EN ALGUNOS CASOS LAS ALUMNAS PODRIAN NO TENER DE DONDE SACAR UN PORCENTAJE
    EN ESOS CASOS LO OBVIAMOS Y LO COMPLETAMOS CON UN SIGNO -
    ***********************************************************************/

    if (getPercent.length > 0) {
      percentUser = Math.round(
        getPercent.reduce((a, b) => {
          return a + b
        }) / getPercent.length
      )
    } else {
      percentUser = 0
    }

    userStats = user
    userStats.stats = {
      percent: percentUser,
      exercises: {
        total: numberPractice,
        completed: completedPractice,
        percent: percentPractice
      },
      reads: {
        total: numberRead,
        completed: completedRead,
        percent: percentRead
      },
      quizes: {
        total: numberQuiz,
        completed: completedQuiz,
        percent: percentQuiz,
        scoreSum: scoreSum,
        scoreAvg: scoreAvg
      }
    }

    usersWithStats.push(userStats)
  }
  })

  return usersWithStats
}

window.sortUsers = (users, orderBy, orderDirection) => {
  if (orderBy === 'name') {
    users.sort((a, b) => {
      x = a.name
      y = b.name

      return x < y ? -1 : x > y ? 1 : 0
    })

    if (orderDirection === 'DESC') {
      users.reverse()
    }
  }

  if (orderBy === 'percent') {
    users.sort((a, b) => a.stats.percent - b.stats.percent)
    if (orderDirection === 'DESC') {
      users.reverse()
    }
  }

  if (orderBy === 'pExercises') {
    users.sort((a, b) => a.stats.exercises.percent - b.stats.exercises.percent)
    if (orderDirection === 'DESC') {
      users.reverse()
    }
  }

  if (orderBy === 'pquizes') {
    users.sort((a, b) => a.stats.quizes.percent - b.stats.quizes.percent)
    if (orderDirection === 'DESC') {
      users.reverse()
    }
  }

  if (orderBy === 'pquizesavg') {
    users.sort((a, b) => a.stats.quizes.scoreAvg - b.stats.quizes.scoreAvg)
    if (orderDirection === 'DESC') {
      users.reverse()
    }
  }

  if (orderBy === 'pReads') {
    users.sort((a, b) => a.stats.reads.percent - b.stats.reads.percent)
    if (orderDirection === 'DESC') {
      users.reverse()
    }
  }
}

window.filterUsers = (users, search) => {
  filterNameArray = []

  users.filter(
    x =>
      x.name.toUpperCase().includes(search) ? filterNameArray.push(x) : 0
  )
  return filterNameArray
}

window. processCohortData = options => {
  usersWithStats = computeUsersStats(
    options.cohortData.users,
    options.cohortData.progress,
    options.cohort
  )
  sortUsers(usersWithStats, options.orderBy, options.orderDirection)

  options.search != ''
    ? (usersWithStats = filterUsers(usersWithStats, options.search))
    : 0

  return usersWithStats
}
