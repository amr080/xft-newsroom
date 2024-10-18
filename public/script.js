fetch('/api/news-titles')
    .then(response => response.json())
    .then(titles => {
        const newsList = document.getElementById('newsList1');
        titles.forEach(title => {
            const li = document.createElement('li');
            li.textContent = title;
            newsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));


    fetch('/api/news')
    .then(response => response.json())
    .then(newsItems => {
        const newsList = document.getElementById('newsList');
        newsItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.title;
            li.appendChild(a);
            
            const date = new Date(item.date).toLocaleDateString();
            li.appendChild(document.createTextNode(` - ${date}`));
            
            newsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error)); 

    fetch('/api/news')
    .then(response => response.json())
    .then(newsItems => {
        const newsList = document.getElementById('newsTable');
        newsItems.forEach((item, index) => {
            const row = document.createElement('tr');
            
            const numberCell = document.createElement('td');
            numberCell.className = 'number';
            numberCell.textContent = index + 1;
            
            const headlineCell = document.createElement('td');
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.title;
            headlineCell.appendChild(a);
            
            const dateCell = document.createElement('td');
            dateCell.className = 'date';
            dateCell.textContent = item.date; // Assuming item.date is already in the format 2024-10-10T07:00:00.000Z
            
            row.appendChild(numberCell);
            row.appendChild(headlineCell);
            row.appendChild(dateCell);
            newsList.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));