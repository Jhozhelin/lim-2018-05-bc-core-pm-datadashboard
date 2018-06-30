//***APRENDIENDO A USAR PROCESOS ASÍNCRONOS 
let cohortsDataRaw = []
let progressDataRaw = {}
let usersDataRaw = []
let options = {}
let gatos
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

    
    gatos = computeUsersStats(usersDataRaw, progressDataRaw,cohortsDataRaw)

   
})
//***CREANDO ARGUMENTO OPTIONS */
/* options = {
    cohort: cohortsDataRaw[31], //Objeto cohort (de la lista de cohorts)
    cohortData: {
        users: usersDataRaw, //Arreglo de usuarios miembros del cohort
        progress: progressDataRaw, //Objeto con data de progreso de cada usuario en el contexto de un cohort en particular
    },
    orderBy: "d", //String con criterio de ordenado (ver sortUsers).
    orderDirections: "e", //String con dirección de ordenado (ver sortUsers)
    Search: "g" //String de búsqueda (ver filterUsers)
}
//***AGREGANDO EVENTOS */ 

