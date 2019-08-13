document.addEventListener("DOMContentLoaded", () => {

  const burgersUrl = "http://localhost:3000/burgers"
  const burgerMenu = document.getElementById("burger-menu")
  const yourOrder = document.getElementById("order-list")
  const form = document.getElementById("custom-burger")
  const allBtns = document.getElementsByClassName("button")


  //////////FETCHING BURGERS///////////////
  fetch(`${burgersUrl}`)
  .then(response => response.json())
  .then(data => {
    renderAllBurgers(data)
    allButtons(data)
  })

  //////////// RENDER ALL BURGERS //////////////////
  function renderAllBurgers(data) {
    data.forEach(burger => {
      burgerMenu.insertAdjacentHTML("beforeend", `
          <div class="burger">
          <h3 class="burger_title">${burger.name}</h3>
            <img src="${burger.image}">
            <p class="burger_description">
              ${burger.description}
            </p>
            <button class="button" id="${burger.id}">Add to Order</button>
        </div>
      `)
    })
  }

  /////////// RENDER ONE BURGER ////////////////////

  function renderOneBurger(burger){
    burgerMenu.insertAdjacentHTML("beforeend", `
    <div class="burger">
    <h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">
        ${burger.description}
      </p>
      <button class="button" id="${burger.id}">Add to Order</button>
  </div>
    `)
  }

  ////////// Custom Burgers///////////////////////
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    createBurger(e.target)
  })

  function createBurger(form) {
    // debugger
    return fetch(`${burgersUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ name: form.name.value, description: form.description.value, image: form.url.value})
    })
    .then(response => response.json())
    .then(burger => {
      yourOrder.insertAdjacentHTML("beforeend", `
          <div class="burger">
          <h3 class="burger_title">${burger.name}</h3>
            <img src="${burger.image}">
            <p class="burger_description">
              ${burger.description}
            </p>
        </div>
      `)
      renderOneBurger(burger)
      form.reset()
    })
  }

  //////////// Add Button to Order ////////////////////////

  function allButtons(data){
    Array.from(data).forEach(burger => {
        // console.log(burger)
        let burgButton = document.getElementById(`${burger.id}`)
        burgButton.addEventListener("click", (e)=> {
          console.log(`${burger.name}`)
          yourOrder.insertAdjacentHTML("beforeend", `
          <div class="burger">
          <h3 class="burger_title">${burger.name}</h3>
            <img src="${burger.image}">
            <p class="burger_description">
              ${burger.description}
            </p>
        </div>
      `)
        })
    })
  }





  ////////////////END OF DOMContentLoaded ////////////////////////////
})
