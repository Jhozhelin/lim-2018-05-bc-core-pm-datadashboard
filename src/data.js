//Primera función
const computeUsersStats = (users, progress, courses) => {
    let userWithStats = []
    let userStats = {}
    
    userStats.stats = {
        percent: a,
        excercises: {
            total: b,
            completed: c,
            percent: d
        },
        reads: {
            total: e,
            completed: f,
            percent: g
        },
        quizzes: {
            total: h,
            completed: i,
            percent: j,
            scoreSum: k,
            scoreAvg: l
        }
        }
        
    userWithStats.push(userStats)
        
    
    
    return usersWithStats 
    

}

    


//Segunda función
const sortUsers =  (users, orderBy, orderDirection) => {
    //users: Arreglo de objetos creado con computeUsersStats().
//orderBy: String que indica el criterio de ordenado. Debe permitir ordenar por nombre, porcentaje de completitud total, porcentaje de ejercicios autocorregidos completados, porcentaje de quizzes completados, puntuación promedio en quizzes completados, y porcentaje de lecturas completadas.
//orderDirection: La dirección en la que queremos ordenar. Posibles valores: ASC y DESC (ascendiente y descendiente).
    return //Arreglo de usuarios ordenado.
}

//Tercerca función
const filterUsers = (users, search) => {
    //users: Arreglo de objetos creado con computeUsersStats()
    //search: String de búsqueda

    return //Nuevo arreglo de usuarios incluyendo solo aquellos que cumplan la condición de filtrado, es decir, aquellos que contengan el string search en el nombre (name) del usuario.
}

//Cuarta función
const processCohortData = (options) => {
    let computedData = computeUsersStats (options.chortData.users, options.cohortData.progress) //courses
    let sortedData = sortUsers (computedData) //orderBy, orderDirection
    let filteredData = filterUsers (sortedData) //search
    
    return filteredData//Nuevo arreglo de usuarios ordenado y filtrado con la propiedad stats añadida
}