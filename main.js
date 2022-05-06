const fightersContainer = document.querySelector('#fighters-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4444/api/fighters`

const fightersCallback = ({ data: fighters }) => displayFighters(fighters)
const errCallback = err => console.log(err)

const getAllFighters = () => axios.get(baseURL).then(fightersCallback).catch(errCallback)
const createFighter = body => axios.post(baseURL, body).then(fightersCallback).catch(errCallback)
const deleteFighter = id => axios.delete(`${baseURL}/${id}`).then(fightersCallback).catch(errCallback)
const updateFighter = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(fightersCallback).catch(errCallback)

const submitHandler = (e) => {
    e.preventDefault()

    let name = document.querySelector('#name')
    let level = document.querySelector('#level')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        level: level.value, 
        imageURL: imageURL.value
    }

    createFighter(bodyObj)

    name.value = ''
    level.value = ''
    imageURL.value = ''
}

const createFighterCard = (fighter) => {
    const fighterCard = document.createElement('div')
    fighterCard.classList.add('fighter-card')

    fighterCard.innerHTML = `<img alt='fighter cover image' src=${fighter.imageURL} class="fighter-cover-image"/>
    <p class="name">${fighter.name}</p>
    <div class="btns-container">
        <button onclick="updateFighter(${fighter.id}, 'minus')">-</button>
        <p class="fighter-level">Level: ${fighter.level}</p>
        <button onclick="updateFighter(${fighter.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteFighter(${fighter.id})">delete</button>
    `


    fightersContainer.appendChild(fighterCard)
}

const displayFighters = (arr) => {
    fightersContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createFighterCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllFighters()