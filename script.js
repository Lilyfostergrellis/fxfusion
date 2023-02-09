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


  const getLocalStorageData = (localStorage) => {
    if(localStorage["conversion"] && localStorage["conversion"].length > 0){
      const previousConversion = JSON.parse(localStorage.getItem("conversion"));
      document.querySelector("#lastTransaction").textContent =
          `Previous transaction from: ${previousConversion.amountFrom} ${previousConversion.from} to: ${previousConversion.result} ${previousConversion.to}`;
    }
    else return false;
  };

  getLocalStorageData(localStorage);

  const submitBtn = document.querySelector("#submitBtn");

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const fromCurrency = document.querySelector("#fromCurrency").value;
    const toCurrency = document.querySelector("#toCurrency").value;
    const amount = parseFloat(document.querySelector("#amount").value);


    // string interpolation ${variable that has data from your dropdowns}ie  usd euro
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then(resp => resp.json())
      .then((data) => {
        if (amount < 0) {
          document.querySelector("#convertedAmount").textContent = "Error: Enter a positive number";
          return;
        }
        document.querySelector("#convertedAmount").textContent=`${data.rates[toCurrency]} ${toCurrency}`;
        getLocalStorageData(localStorage);
        //console.log(data.rates[toCurrency] + '' + toCurrency);
        localStorage.setItem("conversion", JSON.stringify({
          from: fromCurrency,
          to: toCurrency,
          amountFrom: amount,
          result: data.rates[toCurrency]
        }));
      });
    });

    /* localStorage.setItem("conversion", {from:"eur", to:"usd", amountFrom:500, result:536.75})

    localStorage.getItem("conversion")
    "[object Object]"
    localStorage.setItem("conversion", JSON.stringify({from:"eur", to:"usd", amountFrom:500, result:536.75}))
    undefined
    localStorage.getItem("conversion")
    "{\"from\":\"eur\",\"to\":\"usd\",\"amountFrom\":500,\"result\":536.75}"
    JSON.parse(localStorage.getItem("conversion")
    < SyntaxError: Unexpected end of script
    > JSON.parse(localStorage.getItem("conversion"))
    < {from: "eur", to: "usd", amountFrom: 500, result: 536.75}
    > document.querySelector("#fromCurrency").value
    < "EUR"
    > localStorage.setItem("conversion", JSON.stringify({from:document.querySelector("#fromCurrency").value, to:"usd", amountFrom:500, result:536.75}))
    < undefined
    > JSON.parse(localStorage.getItem("conversion"))
    < {from: "EUR", to: "usd", amountFrom: 500, result: 536.75}
    > localStorage.setItem("conversion", JSON.stringify({from:document.querySelector("#fromCurrency").value, to:"usd", amountFrom:500, result:536.75}))
    < undefined
    > JSON.parse(localStorage.getItem("conversion"))
    < {from: "GBP", to: "usd", amountFrom: 500, result: 536.75} */
