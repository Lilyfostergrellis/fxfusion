// Latest news API from gnews.io. Note limit of maximum 100 requests per day.

let key = "d6a5e9d948e4965654dfa70f78b94ca0"
let url = `https://gnews.io/api/v4/search?q=example&token=${key}`

// Generate required HTML usint createElement

let recievedNews = (newsdata) => {
    let articlesDiv = document.querySelector(".articles")
    newsdata.articles.forEach((article) => {
      let div = document.createElement("div")
      div.className = "news"
      div.innerHTML = `
			<h2>${article.title}</h2>
			<img src="${article.image}"/>`
      articlesDiv.appendChild(div)
    })
}

// Fetch

fetch(url)
  .then(response => response.json())
  .then(recievedNews);