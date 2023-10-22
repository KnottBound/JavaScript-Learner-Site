// Get references to HTML elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const dataContainer = document.getElementById('dataContainer');

// Define a function to fetch and display data
function fetchData() {
    const query = searchInput.value;
    const apiUrl = `http://127.0.0.1:5000/position/?q=${query}`; // Replace with your API endpoint

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract and display organic results
            const organicResults = data.organic_results;
            dataContainer.innerHTML = ''; // Clear previous results
            organicResults.forEach(result => {
                const { title, snippet, link } = result;
                const resultElement = document.createElement('div');
                resultElement.innerHTML = `<h3>${title}</h3><p>${snippet}</p><a href="${link}" target="_blank">Read more</a>`;
                dataContainer.appendChild(resultElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Add click event listener to the Search button
searchButton.addEventListener('click', fetchData);