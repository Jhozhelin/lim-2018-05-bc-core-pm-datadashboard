//Primera función
window.computeUsersStats = (users, progress, courses) => {
    usersWithStats= users.map(user =>{
        
        //Inicializamos variables en 0
        let percentUser = 0

        let numberPractice = 0
        let completedPractice = 0
        let percentPractice = 0

        let numberRead = 0
        let completedRead = 0
        let percentRead = 0

        let numberQuiz = 0
        let completedQuiz = 0
        let percentQuiz = 0
        let scoreSum = 0
        let scoreAvg = 0 

        //No usar user.signupCohort porque hay users que no lo tienen como propiedad
/*          courses.find (course =>{
            if (course.id == user.signupCohort){
                 console.log(user)
                console.log(Object.keys(course.coursesIndex)) 
                courses = Object.keys(course.coursesIndex)
            }
        })  */
         courses.map( x => {
            y = Object.keys(x.coursesIndex)    
            if (progress[user.id].hasOwnProperty(courses)){
                console.log(progress[user.id].intro.percent)
            }
        }) 


         if (progress[user.id].hasOwnProperty(courses)){
            console.log(progress[user.id].intro.percent)
        }
        else {
            console.log("Sin datos")
        } 

        //Creamos funciones para realizar operaciones
         let getPercent = (quantity, total) => {
            if (quantity === 0) {
              return 0
            } else {
              return Math.round((quantity / total) * 100)
            }
          }

          let getAverage = (score, total) => {
            return Math.round(score / total)
          } 

        //Damos nuevos valores a variables usando funciones
        percentRead = getPercent(completedRead, numberRead)
        percentQuiz = getPercent(completedQuiz, numberQuiz)
        percentPractice = getPercent(completedPractice, numberPractice)

        user.stats = {
            percent: percentUser,
            excercises: {
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
            return user
        })
        
    return usersWithStats 

}

    


//Segunda función
window.sortUsers =  (users, orderBy, orderDirection) => {
    //users: Arreglo de objetos creado con computeUsersStats().
//orderBy: String que indica el criterio de ordenado. Debe permitir ordenar por nombre, porcentaje de completitud total, porcentaje de ejercicios autocorregidos completados, porcentaje de quizzes completados, puntuación promedio en quizzes completados, y porcentaje de lecturas completadas.
//orderDirection: La dirección en la que queremos ordenar. Posibles valores: ASC y DESC (ascendiente y descendiente).
    return //Arreglo de usuarios ordenado.
}

//Tercerca función
window.filterUsers = (users, search) => {
    //users: Arreglo de objetos creado con computeUsersStats()
    //search: String de búsqueda

    return //Nuevo arreglo de usuarios incluyendo solo aquellos que cumplan la condición de filtrado, es decir, aquellos que contengan el string search en el nombre (name) del usuario.
}

//Cuarta función
window.processCohortData = (options) => {
/*     let computedData = computeUsersStats (options.cohortData.users, options.cohortData.progress) //courses
    let sortedData = sortUsers (computedData) //orderBy, orderDirection
    let filteredData = filterUsers (sortedData) //search
    
    return filteredData//Nuevo arreglo de usuarios ordenado y filtrado con la propiedad stats añadida */
}
