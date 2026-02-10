// DATA MẪU
const movies=[
{
title:"The Avengers",
year:2012,
genre:["Hành động","Siêu anh hùng"],
poster:"145396-ml-914024.jpg",
desc:"Biệt đội siêu anh hùng cứu thế giới",
director:"Joss Whedon",
actors:"Robert Downey Jr."
},
{
title:"Titanic",
year:1997,
genre:["Tình cảm","Drama"],
poster:"MV5BMTk5MjI3OTcwOF5BMl5BanBnXkFtZTYwNDY5MTI5._V1_.jpg",
desc:"Chuyện tình trên tàu Titanic",
director:"James Cameron",
actors:"Leonardo DiCaprio"
}
];

const movieList=document.getElementById("movieList");
const genreFilters=document.getElementById("genreFilters");
const searchInput=document.getElementById("searchInput");
const modal=document.getElementById("modal");
const modalBody=document.getElementById("modalBody");
const closeModal=document.getElementById("closeModal");
const themeToggle=document.getElementById("themeToggle");

let selectedGenres=[];
let searchText="";

// RENDER MOVIE
function renderMovies(list){
movieList.innerHTML="";
list.forEach(movie=>{
const card=document.createElement("div");
card.className="movie-card";
card.innerHTML=`
<img src="${movie.poster}">
<h4>${movie.title}</h4>
<p>${movie.year}</p>
`;

card.onclick=()=>openModal(movie);
movieList.appendChild(card);
});
}

// MODAL
function openModal(movie){
modal.classList.remove("hidden");
modalBody.innerHTML=`
<h2>${movie.title}</h2>
<img src="${movie.poster}" width="100%">
<p>${movie.desc}</p>
<p>Đạo diễn: ${movie.director}</p>
<p>Diễn viên: ${movie.actors}</p>
`;
}

closeModal.onclick=()=>modal.classList.add("hidden");

// GENRE AUTO CREATE
const genres=[...new Set(movies.flatMap(m=>m.genre))];

genres.forEach(g=>{
const label=document.createElement("label");
label.innerHTML=`<input type="checkbox" value="${g}"> ${g}`;
genreFilters.appendChild(label);
});

genreFilters.addEventListener("change",()=>{
selectedGenres=[...document.querySelectorAll("#genreFilters input:checked")]
.map(i=>i.value);
applyFilters();
});

// SEARCH + DEBOUNCE
function debounce(fn,delay){
let timeout;
return(...args)=>{
clearTimeout(timeout);
timeout=setTimeout(()=>fn(...args),delay);
};
}

searchInput.addEventListener("input",
debounce(e=>{
searchText=e.target.value.toLowerCase();
applyFilters();
},400)
);

// FILTER LOGIC
function applyFilters(){
let result=movies.filter(m=>{

const matchGenre=
selectedGenres.length===0 ||
selectedGenres.some(g=>m.genre.includes(g));

const matchSearch=
m.title.toLowerCase().includes(searchText);

return matchGenre && matchSearch;
});

renderMovies(result);
}

// DARK MODE
if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark-mode");
themeToggle.checked=true;
}

themeToggle.onchange=()=>{
document.body.classList.toggle("dark-mode");
localStorage.setItem("theme",
document.body.classList.contains("dark-mode")?"dark":"light"
);
};

renderMovies(movies);
