/******CURRENCY CONVERSION *******/



/********* DAILY NEWS BULLETINS **********/

apikey = 'd6a5e9d948e4965654dfa70f78b94ca0';
category = 'business';
//The catagory can be changed to one of five, see API documentation for other options
url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&apikey=' + apikey + '&lang=en&country=us&max=10';

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    articles = data.articles;

    for (i = 0; i < articles.length; i++) {
      // articles[i].title
      console.log("Title: " + articles[i]['title']);
      // articles[i].description
      console.log("Description: " + articles[i]['description']);
      // You can replace {property} below with any of the article properties returned by the API.
      // articles[i].{property}
      // console.log(articles[i]['{property}']);

      // Delete this line to display all the articles returned by the request. Currently only the first article is displayed.
    }
  });