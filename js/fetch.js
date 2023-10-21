document.getElementById('getDataButton').addEventListener('click', fetchData);

        function fetchData() {
            const searchQuery = document.getElementById('searchQueryInput').value;
            const apiUrl = `http://127.0.0.1:5000/position/${searchQuery}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // API response data
                    const dataContainer = document.getElementById('dataContainer');
                    dataContainer.innerHTML = JSON.stringify(data, null, 2);
                    const resultHTML = organicResults.map(result => `
                    <div>
                        <h2>${result.title}</h2>
                        <p>${result.snippet}</p>
                        <a href="${result.link}" target="_blank">${result.link}</a>
                    </div>
                `).join('');
                dataContainer.innerHTML = resultHTML;
                })
                .catch(error => {
                    // Errors
                    console.error('API Error:', error);
                });
            }