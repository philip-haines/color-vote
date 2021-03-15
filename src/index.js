const cardContainer = document.getElementById('card-container')
const addColorForm = document.getElementById('add-color-form')


const baseURL = `http://localhost:3000/colors`;

fetch(baseURL)
    .then(parseJson)
    .then(iterateOverColors)

function parseJson(response) {
	return response.json();
}

function iterateOverColors(colors){
    colors.forEach(renderColors)
    addColor(colors);
}

function renderColors(color) {
        const colorCard = document.createElement('div')
        colorCard.className = "color-card"
        colorCard.style.backgroundColor = ` ${color.hex}`


        const colorName = document.createElement('h2')
        colorName.innerText = color.name


        const voteCounter = document.createElement('p')
        voteCounter.textContent = `${color.votes} Votes`;
        const voteButton = document.createElement('button')
        voteButton.innerText = '+1 Vote'
        voteButton.addEventListener('click', (e) => {
            color.votes++
            fetch(`${baseURL}/${color.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify({
                    votes: color.votes
                }),
            })
            voteCounter.textContent = `${color.votes} Votes`;
        })

        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete-button'
        deleteButton.innerHTML = '&times;'

        deleteButton.addEventListener('click', () => {
            colorCard.remove()
            fetch(`${baseURL}/${color.id}`, {
                method: 'DELETE',
            });
        })

        colorCard.append(colorName, voteCounter, voteButton, deleteButton)
        cardContainer.append(colorCard)
}


        function addColor(color) {
			addColorForm.addEventListener("submit", (e) => {
				e.preventDefault();
				const addColorFormData = new FormData(e.target);
				const colorName = addColorFormData.get('name');
                console.log(colorName)
				const colorHex = addColorFormData.get("hex");
                console.log(colorHex)
				fetch(`${baseURL}`, {
					method: "POST",
					header: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: colorName,
						hex: colorHex,
						votes: 0
					}),
				});
                
			});
		}


