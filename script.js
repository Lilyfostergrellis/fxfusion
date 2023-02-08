

const API_KEY = "a075e9c1831be450387ebe22f1874d9a";
const API_URL = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=eng+&apikey=${API_KEY}`;


const createNews = (article) => {
  const div = document.createElement("div");
  div.className = "news";
  div.innerHTML = `
      <h2>${article.title}</h2>
      <img src="${article.image}" alt="${article.title}" />
    `;

  return div;
};

const receivedNews = (newsData) => {
  const articlesDiv = document.querySelector(".articles");
  const news = newsData.articles.map(createNews);
  news.forEach((news) => articlesDiv.appendChild(news));
};

fetch(API_URL)
  .then((response) => {
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch news: ${response.statusText}`);
    // }
    return response.json();
  })
  .then(newsData => {
    
    console.log(newsData)
    receivedNews(newsData)})
  .catch((error) => {
    console.error(error);
  });


const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const fromCurrency = document.querySelector("#fromCurrency").value;
  const toCurrency = document.querySelector("#toCurrency").value;
  const amount = parseFloat(document.querySelector("#amount").value);

  if (amount < 0) {
    document.querySelector("#convertedAmount").textContent = "Error: Enter a positive number";
    return;
  }

  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=10&from=GBP&to=USD`)
    .then(resp => resp.json())
    .then((data) => {
      console.log(`${data.rates.USD} USD`)
    });
});










