//PRIMERA FUNCIÓN
window.computeUsersStats = (users, progress, courses) => {
  usersWithStats = []

  //Variable que re retornará al final

  users.map(user => {
    let percentUser = 0,
      numberPractice = 0,
      completedPractice = 0,
      percentPractice = 0,
      numberRead = 0,
      completedRead = 0,
      percentRead = 0,
      numberQuiz = 0,
      completedQuiz = 0,
      percentQuiz = 0,
      scoreSum = 0,
      scoreAvg = 0,
      getPercent = []

    courses.map(cohort => {
      if (progress[user.id].hasOwnProperty(cohort)) {
        unitsArray = Object.entries(progress[user.id][cohort].units)
        getPercent.push(progress[user.id][cohort].percent)

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
            } else if (
              unit[1].hasOwnProperty('exercises') &&
              unit[1].type === 'practice'
            ) {
              for (n in unit[1].exercises) {
                numberPractice++
                if (unit[1].exercises[n].hasOwnProperty('completed')) {
                  completedPractice += unit[1].exercises[n].completed
                }
              }
            }
          })
        })
      }
    })

    //PORCENTAJE TOTAL
    if (getPercent.length > 0) {
      percentUser = Math.round(
        getPercent.reduce((a, b) => {
          return a + b
        }) / getPercent.length
      )
    } else {
      percentUser = 0
    }

    // PORCENTAJES DE LECTURA, QUIZZES Y  PRACTICAS
    if (numberRead === 0) {
      numberRead = 0
      completedRead = 0
      percentRead = 0
    } else {
      percentRead = Math.round((completedRead / numberRead) * 100)
    }

    if (numberPractice === 0) {
      numberPractice = 0
      completedPractice = 0
      percentPractice = 0
    } else {
      percentPractice = Math.round((completedPractice / numberPractice) * 100)
    }

    if (numberQuiz === 0) {
      numberQuiz = 0
      completedQuiz = 0
      percentQuiz = 0
      scoreSum = 0
      scoreAvg = 0
    } else {
      percentQuiz = Math.round((completedQuiz / numberQuiz) * 100)
      scoreAvg = Math.round(scoreSum / completedQuiz)
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

      quizzes: {
        total: numberQuiz,
        completed: completedQuiz,
        percent: percentQuiz,
        scoreSum: scoreSum,
        scoreAvg: scoreAvg
      }
    }
    usersWithStats.push(userStats)
  })

  return usersWithStats
}

//SEGUNDA FUNCIÓN
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
    users.sort((a, b) => a.stats.quizzes.percent - b.stats.quizzes.percent)
    if (orderDirection === 'DESC') {
      users.reverse()
    }
  }

  if (orderBy === 'pquizesavg') {
    users.sort((a, b) => a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg)
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

//TERCERA FUNCIÓN
window.filterUsers = (users, search) => {
  filterNameArray = []

  users.filter(
    x => (x.name.toUpperCase().includes(search) ? filterNameArray.push(x) : 0)
  )
  return filterNameArray
}

//CUARTA FUNCIÓN
window.processCohortData = options => {
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
