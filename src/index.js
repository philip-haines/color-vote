const baseUrl = "http://localhost:3000/colors/";
const cardContainer = document.getElementById("card-container");
const addColorForm = document.getElementById("add-color-form");

fetch(baseUrl).then(parseJson).then(iterateOverColors);
addNewColorFormListener();

function iterateOverColors(colors) {
  colors.forEach(renderColor);
}

function renderColor(color) {
  const colorCard = crEl('div');
  colorCard.className = "color-card";
  colorCard.style.background = `${color.hex}`;

  const colorName = document.createElement("h2");
  colorName.innerText = color.name;

  const voteCounter = document.createElement("p");
  voteCounter.innerText = ` Votes ${color.votes}`;

  const voteButton = document.createElement("button");
  voteButton.textContent = "+1 Vote";
  voteButton.addEventListener("click", () => {
    voteForColor(color, voteCounter);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&times;";

  deleteButton.addEventListener("click", () => {
    colorCard.remove();
   deleteColor(color.id);
  });

  colorCard.append(colorName, voteCounter, voteButton, deleteButton);
  cardContainer.append(colorCard);
}

function deleteColor(id){
	fetch(baseUrl + id, {
		method: "DELETE",
	  })
}

function voteForColor(color, voteCounter) {
  color.votes++;

  let updatedColor = {
    votes: color.votes,
  };

  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(updatedColor),
  };

  fetch(baseUrl + color.id, options)
    .then(parseJson)
    .then(
      (returnedUpdatedColor) =>
        (voteCounter.innerText = ` Votes ${returnedUpdatedColor.votes}`)
    );
}

function parseJson(response) {
  return response.json();
}

function addNewColorFormListener() {
  addColorForm.addEventListener("submit", (e) => {
    let colorForm = e.target;
    e.preventDefault();

    let color = {
      name: colorForm.name.value,
      hex: colorForm.hex.value,
      votes: 0,
    };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(color),
    };

    console.log(options);
    fetch(baseUrl, options)
      .then(parseJson)
      .then((newColor) => renderColor(newColor));
    // .then(renderColor);
  });
}

function crEl(el){
	return document.createElemenet(el)
}

function elAndClass(el, className){
let obj = document.createElemenet(el)
obj.className = className
return obj
}

function getId(id){
	return document.getElementById(id)
}
