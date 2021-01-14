let addToy = false;

const BASE_URL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
  handleForm()
});

const getToys = () => {
  document.querySelector('#toy-collection').innerHTML = ""
  fetch(BASE_URL)
    .then(res => res.json())
    .then(toyData => toyData.forEach(renderToy))
};

const renderToy = (toy) => {
  let toyBox = document.querySelector('#toy-collection')

  let card = document.createElement("div")
    card.className = "card"

  let header = document.createElement("h2")
    header.innerText = toy.name

  let image = document.createElement("img")
    image.src = toy.image
    image.className = "toy-avatar"

  let para = document.createElement("p")
    para.id = `toyLikes-${toy.id}`
    para.innerText = toy.likes + " Likes"

  let button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "Like <3"
    button.addEventListener("click", () => {
    updatelikes(toy)
    })

  card.append(header, image, para, button)

  toyBox.appendChild(card)

};

const handleForm = () => {
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (event) => {
      event.preventDefault()

      let newToy = {
          name: event.target.name.value,
          image: event.target.image.value,
          likes: 0
      }

      let reqPackage = {
          headers: {"Content-Type": "application/json"},
          method: "POST",
          body: JSON.stringify(newToy),
      }
      fetch(BASE_URL, reqPackage)
      .then(res => res.json())
      .then(data => renderToy(data))
      toyForm.reset()
  })
};

const updatelikes = (toy) => {

  let likes = parseInt(document.getElementById(`toyLikes-${toy.id}`).innerText.split(" ")[0])

  let newLikes = {
      likes: likes + 1
  }

  let reqPackage = {
      headers: {"Content-Type": "application/json"},
      method: "PATCH",
      body: JSON.stringify(newLikes),
  }


  fetch(BASE_URL+`/${toy.id}`, reqPackage)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.getElementById(`toyLikes-${data.id}`).innerText = data.likes + " Likes"
  })
};

