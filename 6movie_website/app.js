const API_URL = "https:api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = 'https://api.themoviedb.org/4/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const form = document.getElementById("form")
const search = document.getElementById("search")
// bu formun içine submit olunca aratacak o yüzden lazım.
const main = document.getElementById("main")
// main içinde işlev yapsın her şey diye. movieler yerleşecek.

getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results);
    showMovies(data.results)
}

//search işlemi için
search.addEventListener("submit", (e)=>{
    e.preventDefault()

//search yazılı veya boşluk iken arama yapmka için ve filmlerin içinden seçeceğimiz için searchMovies yazdık.
    const searchTerm = search.value
    if(searchTerm && searchTerm !== " "){
        getMovies(SEARCH_API + searchTerm)
        searchTerm = "" //search value da boşluğa işaretlenebilir, aynı mantık.
        window.location.reload()
    }

})

function showMovies(movies){
    main.innerHTML = " "
    movies.forEach((movie)=>{
        const {title, poster_path, overview, vote_average} = movie

        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
        <div class="movie">
      <img src="${IMG_PATH + poster_path}" 
      alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        <!-- <span> etiketi belgede satır içi grup tanımlar. -->
        <!-- <span> etiketi belge yada metnin bir kısmını işlemek için kullanılır.
        İpucu: Bir metin <span> etiketi arasında alındığında,
        CSS ile biçimlendirilebilir veya JavaScript ile işlenebilir. -->
      </div>
      <div class="overview">
        <h3>${title}<small> overview</small></h3>
        <p>${overview}</p>
      </div>
    </div>
   `
   main.appendChild(movieEl) //çalışması için, görüntülerin gelmesi için.
    })
}

function getClassByRate(vote){
    if(vote >= 8){
        return "green"
    }
    else if(vote>=5){
        return "orange"
    }
    else{
        return "red"
    }
}