const dataCohorts = fetch('../data/cohorts.json'
.then(response => response.json())
.then( data => {x(data)})

const dataProgress = fetch ('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
.then(response => response.json())

const dataUsers = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
.then(response => response.json())

console.log(dataCohorts[1])

console.log(dataUsers[1])

const exampleArray = ['a', 'b', 'c', 'd']
console.log(exampleArray[1])