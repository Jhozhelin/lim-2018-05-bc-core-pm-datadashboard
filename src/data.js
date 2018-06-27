//***APRENDIENDO A USAR PROCESOS ASÍNCRONOS */
let cohortsRaw = []
let progressRaw = {}
let usersRaw = []

//Paso uno, traemos la data de los json con fetch y los guardamos en variables
const dataCohorts = fetch('../data/cohorts.json')
.then(response => response.json())
.then( data => { //Era necesario tener un segundo then para ejecutar otro función, lugar de 'data', puede ir cualquier otro nombre
    cohortsRaw = data //Arriba creamos un arreglo para guardar nuestro resultado y lo igualamos a data
    console.log(cohortsRaw) //Probamos en consola
} )

const dataProgress = fetch ('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
.then(response => response.json())
.then(data => {
    progressRaw = data
    console.log(progressRaw)
})

const dataUsers = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
.then(response => response.json())
.then(data => {
    usersRaw = data
    console.log(usersRaw)
}) 
//Al final, nos daremos cuenta que todos los fetch no se ejecutan de arriba hacia abajo 
/* Promise.all([dataCohorts]).then(array => {
    console.log(array[0])
})
 */
