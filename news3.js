// scripts.js

const apiKey = '926c0a97379d40848316969d2b2812ea';
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch and display news
function fetchNews(business = 'general') {
     
    const url = `https://newsapi.org/v2/top-headlines?category=${business}&country=us&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => {
            console.error('Error fetching the news:', error);
        });
}

// Function to display news articles
function displayNews(articles) {
    newsContainer.innerHTML = '';

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const newsArticle = document.createElement('article');

        newsArticle.innerHTML = `
            <img src="${article.urlToImage || 'placeholder.jpg'}" alt="${article.title}">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(newsArticle);
    });
}

// Function to search for news
function searchNews(query) {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => {
            console.error('Error fetching the news:', error);
        });
}

// Event listeners for navigation links
//document.getElementById('general').addEventListener('click', () => fetchNews('general'));
//document.getElementById('technology').addEventListener('click', () => fetchNews('technology'));
//document.getElementById('business').addEventListener('click', () => fetchNews('business'));
//document.getElementById('sports').addEventListener('click', () => fetchNews('sports'));
//document.getElementById('entertainment').addEventListener('click', () => fetchNews('entertainment'));

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchNews(query);
    }
});

// Fetch and display general news on page load
fetchNews();
