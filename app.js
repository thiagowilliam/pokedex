const getPokemonUrl = id => `http://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHtml = pokemons => pokemons.reduce((acc, {name, id, types}) => {
  const elementTypes = types.map((typeInfo) => typeInfo.type.name)
  acc += `
    <li class="card ${elementTypes[0]}">
      <img class="card-image  alt="${name}" src="http://pokeres.bastionbot.org/images/pokemon/${id}.png" />
      <h2 class="card-title">${id} . ${name} </h2>
      <p class="card-title">${elementTypes.join(' | ')}</p>
    </li>
  `
  return acc
}, '')
  


const insertPokemonIntoPage = (pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
})

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHtml)
  .then(insertPokemonIntoPage)




const fetchPeople = () => {
  const getPeopleUrl = id => `https://swapi.dev/api/people/${id}/`


  const peoplePromisses =[]

  for (let i = 1; i <= 16; i++) {
    peoplePromisses.push(fetch(getPeopleUrl(i)).then(response => response.json()))
  }

  Promise.all(peoplePromisses)
    .then(peoples => {
      const listPeoples = peoples.reduce((acc, people) => {
        const id = people.url.replace(/\D+/g, '')
      
        acc += `
          <h2>${id} - ${people.name}</h2>
          <p>${people.gender}</p>
        `

        return acc
      }, '')
      // console.log(listPeoples)
    })
}

fetchPeople()

