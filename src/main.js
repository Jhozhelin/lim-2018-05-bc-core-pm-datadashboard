//Constantes
const boxbody = document.getElementById('boxbody')
const buttonStudents = document.querySelector('.buttonStudents')

//Botón students
buttonStudents.addEventListener('click', () => {
  for (let i = 0; i < usersWithStats.length; i++) {
    let divBody = document.createElement('div')
    divBody.className = 'divBody'
    boxbody.appendChild(divBody)

    let boxname = document.createElement('div')
    boxname.textContent = usersWithStats[i].name
    boxname.innerHTML = 'nombre: ' + boxname.textContent
    boxname.className = 'boxname'
    divBody.appendChild(boxname) //pinto los users

    
    let boxid = document.createElement('div')
    boxid.textContent = usersWithStats[i].id
    boxid.innerHTML = 'id: ' + boxid.textContent
    boxid.className= 'boxid'
    divBody.appendChild(boxid) //pinto los IDs

    let boxprogress = document.createElement('div')
    boxprogress.textContent = usersWithStats[i].stats.percent
    boxprogress.innerHTML = 'Progreso: ' + boxprogress.textContent + '%'
    boxprogress.className = 'boxprogress'
    divBody.appendChild(boxprogress) //pinto progress en pantalla
//PRACTICE
    let boxExercisesTotal = document.createElement('div')
    boxExercisesTotal.textContent = usersWithStats[i].stats.exercises.total
    boxExercisesTotal.innerHTML = 'Total de ejercicios: ' + boxExercisesTotal.textContent
    boxExercisesTotal.className ='boxExercisesTotal'
    divBody.appendChild(boxExercisesTotal) //pinto ejercicios totales en la pantalla

    let boxExercisesCompleted = document.createElement('div')
    boxExercisesCompleted.textContent = usersWithStats[i].stats.exercises.completed
    boxExercisesCompleted.innerHTML = 'Ejercicios completados: ' + boxExercisesCompleted.textContent
    boxExercisesCompleted.className ='boxExercisesCompleted'
    divBody.appendChild(boxExercisesCompleted) //pinto ejercicios completados en la pantalla

    let boxExercisesPercent = document.createElement('div')
    boxExercisesPercent.textContent = usersWithStats[i].stats.exercises.percent
    boxExercisesPercent.innerHTML = boxExercisesPercent.textContent + '%'
    boxExercisesPercent.className ='boxExercisesPercent'
    divBody.appendChild(boxExercisesPercent) //pinto % de ejercicios completados en la pantalla
  //READ
  let boxReadsTotal = document.createElement('div')
  boxReadsTotal.textContent = usersWithStats[i].stats.reads.total
  boxReadsTotal.innerHTML = 'Total de lecturas: ' + boxReadsTotal.textContent
  boxReadsTotal.className ='boxReadsTotal'
  divBody.appendChild(boxReadsTotal) //pinto reads totales en la pantalla

  let boxReadsCompleted = document.createElement('div')
  boxReadsCompleted.textContent = usersWithStats[i].stats.reads.completed
  boxReadsCompleted.innerHTML = 'Lecturas completadas: ' + boxReadsCompleted.textContent
  boxReadsCompleted.className ='boxReadsCompleted'
  divBody.appendChild(boxReadsCompleted) //pinto reads completados en la pantalla

  let boxReadsPercent = document.createElement('div')
  boxReadsPercent.textContent = usersWithStats[i].stats.reads.percent
  boxReadsPercent.innerHTML = boxReadsPercent.textContent + '%'
  boxReadsPercent.className ='boxReadsPercent'
  divBody.appendChild(boxReadsPercent) //pinto % de reads completados en la pantalla
  //QUIZZ
  let boxQuizesTotal = document.createElement('div')
  boxQuizesTotal.textContent = usersWithStats[i].stats.quizes.total
  boxQuizesTotal.innerHTML = 'Total de quizes: ' + boxQuizesTotal.textContent
  boxQuizesTotal.className ='boxQuizesTotal'
  divBody.appendChild(boxQuizesTotal) //pinto quizes totales en la pantalla

  let boxQuizesCompleted = document.createElement('div')
  boxQuizesCompleted.textContent = usersWithStats[i].stats.quizes.completed
  boxQuizesCompleted.innerHTML = 'quizes completados: ' + boxQuizesCompleted.textContent
  boxQuizesCompleted.className ='boxQuizesCompleted'
  divBody.appendChild(boxQuizesCompleted) //pinto quizes completados en la pantalla

  let boxQuizesPercent = document.createElement('div')
  boxQuizesPercent.textContent = usersWithStats[i].stats.quizes.percent
  boxQuizesPercent.innerHTML = boxQuizesPercent.textContent + '%'
  boxQuizesPercent.className ='boxQuizesPercent'
  divBody.appendChild(boxQuizesPercent) //pinto % de quizes completados en la pantalla  

  let boxQuizesScoreSum = document.createElement('div')
  boxQuizesScoreSum.textContent = usersWithStats[i].stats.quizes.scoreSum
  boxQuizesScoreSum.innerHTML = 'Puntaje: ' + boxQuizesScoreSum.textContent + ' pts'
  boxQuizesScoreSum.className ='boxQuizesScoreSum'
  divBody.appendChild(boxQuizesScoreSum) //pinto scoreSum quizes completados en la pantalla

  let boxQuizesScoreAvg = document.createElement('div')
  boxQuizesScoreAvg.textContent = usersWithStats[i].stats.quizes.scoreAvg
  boxQuizesScoreAvg.innerHTML = 'Promedio: ' + boxQuizesScoreAvg.textContent + ' pts'
  boxQuizesScoreAvg.className = 'boxQuizesScoreAvg'
  divBody.appendChild(boxQuizesScoreAvg) //pinto % de quizes completados en la pantalla  
  }
})


