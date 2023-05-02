const API_KEY = "a075e9c1831be450387ebe22f1874d9a";
const API_URL = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=eng+&apikey=${API_KEY}`;

const createNews = (article) => {
  const div = document.createElement("div");
  div.className = "news";
  div.innerHTML = `
    <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
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
  .then((response) => response.json())
  .then((newsData) => receivedNews(newsData))
  .catch((error) => console.error(error));


const getLocalStorageData = (localStorage) => {
  if(
    localStorage.getItem("conversion") &&
    JSON.parse(localStorage.getItem("conversion")).length > 0
  ) {
    const previousConversion = JSON.parse(localStorage.getItem("conversion"));
    document.querySelector("#lastTransaction").textContent =
      `Previous conversion from: ${previousConversion.amountFrom} ${previousConversion.from} to: ${previousConversion.result} ${previousConversion.to}`;
  } else {
    return false;
  }
};
getLocalStorageData(localStorage);

const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  const fromCurrency = document.querySelector("#fromCurrency").value;
  const toCurrency = document.querySelector("#toCurrency").value;
  const amount = parseFloat(document.querySelector("#amount").value);

  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (amount < 0) {
        document.querySelector("#convertedAmount").textContent = "Error: Enter a positive number";
        return;
      }

      document.querySelector("#convertedAmount").textContent=`${data.rates[toCurrency]} ${toCurrency}`;
      getLocalStorageData(localStorage);
      
      localStorage.setItem("conversion", JSON.stringify({
        from: fromCurrency,
        to: toCurrency,
        amountFrom: amount,
        result: data.rates[toCurrency],
      }));
    });
});
