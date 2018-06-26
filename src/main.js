//***APRENDIENDO A USAR PROCESOS ASÍNCRONOS 
let cohortsDataRaw = []
let progressDataRaw = {}
let usersDataRaw = []

const dataCohorts = fetch('../data/cohorts.json')
.then(response => response.json())

const dataProgress = fetch ('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
.then(response => response.json())

const dataUsers = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
.then(response => response.json())

Promise.all([dataCohorts, dataProgress, dataUsers]).then (data =>{
    //Data del cohort en bruto
    cohortsDataRaw = data[0]
    //Data del progreso en bruto
    progressDataRaw = data[1]
    //Data de los usuarios en bruto
    usersDataRaw = data [2]

})

//***AGREGANDO EVENTOS */ 

