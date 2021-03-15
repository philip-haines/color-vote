const cardContainer = document.getElementById('card-container')
let voteCount = 0

const baseURL = `http://localhost:3000/colors`;

fetch(baseURL)
    .then(parseJson)
    .then(iterateOverColors)

function parseJson(response) {
	return response.json();
}

function iterateOverColors(colors){
    colors.forEach(renderColors)
}

function renderColors(color) {
        const colorCard = document.createElement('div')
        colorCard.className = "color-card"
        colorCard.style.backgroundColor = ` ${color.hex}`


        const colorName = document.createElement('h2')
        colorName.innerText = color.name


        const voteCounter = document.createElement('p')
        voteCounter.textContent = `${voteCount} Votes`

        const voteButton = document.createElement('button')
        voteButton.id = 'vote-button'
        voteButton.innerText = '+1 Vote'
        voteButton.addEventListener('click', (e) => {
            console.log(voteCount++)
        })
        // function addOneToVoteCount(voteCount) {
			
		// }

        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete-button'
        deleteButton.innerHTML = '&times;'

        colorCard.append(colorName, voteCounter, voteButton, deleteButton)
        cardContainer.append(colorCard)
}



