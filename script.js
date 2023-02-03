// Latest news API from gnews.io. Note limit of maximum 100 requests per day.

const key = "d6a5e9d948e4965654dfa70f78b94ca0"
const url = `https://gnews.io/api/v4/search?q=example&token=${key}`

// Generate required HTML usint createElement

const recievedNews = (newsdata) => {
    const articlesDiv = document.querySelector(".articles")
    newsdata.articles.forEach((article) => {
      const div = document.createElement("div")
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