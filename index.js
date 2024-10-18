const axios = require('axios');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const cheerio = require('cheerio');
const csv = require('csv-parser');
const stream = require('stream');
const xlsx = require('xlsx');

const app = express();


app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to fetch news titles
app.get('/api/news-titles', async (req, res) => {
    try {
      const response = await axios.get('https://app.rwa.xyz/api/trpc/news.paginateArticles?batch=1&input=%7B%220%22%3A%7B%22page%22%3A2%2C%22perPage%22%3A25%2C%22query%22%3A%7B%22published%22%3Atrue%7D%7D%7D', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'keep-alive',
        },
        timeout: 5000
      });
      
      const titles = response.data[0].result.data.results.map(article => article.summary.title);
      res.status(200).json(titles);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      res.status(500).json({ error: error.message });
    }
  });


  app.get('/api/news', async (req, res) => {
    try {
      const response = await axios.get('https://app.rwa.xyz/api/trpc/news.paginateArticles?batch=1&input=%7B%220%22%3A%7B%22page%22%3A2%2C%22perPage%22%3A25%2C%22query%22%3A%7B%22published%22%3Atrue%7D%7D%7D', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'keep-alive',
        },
        timeout: 5000
      });
      
      const newsItems = response.data[0].result.data.results.map(article => ({
        title: article.summary.title,
        url: article.url,
        date: article.summary.published_date
      }));
      res.status(200).json(newsItems);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      res.status(500).json({ error: error.message });
    }
  });




// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
