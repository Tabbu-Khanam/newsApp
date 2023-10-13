const API_KEY = "1e507e3fd8534557b1e95a4c7f3f8cf3";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews('india'));
async function fetchNews(query) {
const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  console.log(data);
  bindData(data.articles);
}


function bindData(articles) {
  const cardsContainer = document.getElementById('cards-container');
  const templateCard = document.getElementById('template-news-card');
  cardsContainer.innerHTML = "";
  articles.forEach(article => {
    if(!article.urlToImage) return;
      const cardClone = templateCard.content.cloneNode(true);
      fillDataCard(cardClone, article);
      cardsContainer.appendChild(cardClone);
  
  })
  }

function fillDataCard(cardClone, article) {
 let newsImg =  cardClone.querySelector("#news-img");
  let newsTitle =  cardClone.querySelector('#news-title');

   let newsSource =  cardClone.querySelector('#news-source');

   let newsDesc =  cardClone.querySelector('#news-desc');
   let newsLink =  cardClone.querySelector('#news-link');
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML =  article.description;
  newsSource.innerHTML = `${article.source.name} .`;
  cardClone.firstElementChild.addEventListener('click', () => {
     window.open(article.url, "_blank")
  })
}
 let curSelectedNav = null;
function onNavItemClick(id) {
   fetchNews(id)
   const navItem = document.getElementById(id);
   curSelectedNav?.classList.remove('active');
   curSelectedNav = navItem;
  curSelectedNav.classList.add('active');
}

const searchbtn = document.getElementById("search-button");
const input = document.getElementById("news-input");

searchbtn.addEventListener('click', () => {
  const inputValue = input.value;
  if(!inputValue) return;
  fetchNews(inputValue);
  curSelectedNav?.classList.remove('active');
   curSelectedNav = null;
})

function reload() {
  window.location.reload();
}