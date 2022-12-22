import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

function findMovie(){
  const randomId = Math.floor(Math.random() * 20)
  const randomPage = Math.floor(Math.random() * 500)
  const url = `${BASE_URL}popular?${API_KEY}&page=${randomPage}&${language}`

  fetch(url)
  .then(response => response.json())
  .then(data => {
  const selectedMovieId = data.results[randomId].id
  whereToWatch(selectedMovieId)
    movieTitle.textContent = data.results[randomId].title
    movieImage.src = `${IMG_URL}${data.results[randomId].poster_path}`
    movieDescription.textContent = data.results[randomId].overview
  })
  .catch(error => console.error(error))

   const movie = document.querySelector(".movie")
   movie.classList.remove('hide-section')
}

const btn = document.querySelector('#btn')

btn.addEventListener('click', findMovie)

// pegar onde assitir o filme (beta)
  function whereToWatch(id) {
   const listProvider = document.querySelector('#list-provider')
   const titleWtw = document.querySelector('#title-wtw')
    fetch(`${BASE_URL}${id}/watch/providers?${API_KEY}`)
    .then(response => response.json())
    .then(data => {
     const providersBR = data.results.BR
     function getListProvider() {
        listProvider.innerHTML = ""
        providersBR.flatrate.forEach((provedor) => listProvider.innerHTML += `<li><img src="${IMG_URL}${provedor.logo_path}"></li>`)
        titleWtw.textContent = "Onde assistir"
     }
     if (providersBR && providersBR.flatrate) {
         getListProvider()
     } else {
      listProvider.textContent = ""
      titleWtw.textContent = ""
     }
    })
    .catch(error => console.log(error))
  }


