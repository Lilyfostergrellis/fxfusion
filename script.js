const API_KEY = "d6a5e9d948e4965654dfa70f78b94ca0";
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
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
    return response.json();
  })
  .then(receivedNews)
  .catch((error) => {
    console.error(error);
  });

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const fromCurrency = document.querySelector("#fromCurrency").value;
    const toCurrency = document.querySelector("#toCurrency").value;
    const amount = parseFloat(document.querySelector("#amount").value);
  
    if (amount < 0) {
      document.querySelector("#convertedAmount").textContent = "Error: Enter a positive number";
      return;
    }
  
    const API__KEY = "zgJIkCpsbnYinVJY5Vq9zKarluUGSjm3dZ9RLdAW";
    const API__URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API__KEY}`;
  
    fetch(API__URL)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[toCurrency] / data.rates[fromCurrency];
        const convertedAmount = amount * rate;
        document.querySelector("#convertedAmount").textContent = convertedAmount;
      });
  });
  