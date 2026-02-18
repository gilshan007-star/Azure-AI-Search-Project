function search() {
    const query = document.getElementById("searchInput").value;

    if (!query) {
        alert("Please enter a search query");
        return;
    }

    fetch("http://127.0.0.1:8000/search?q=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            if (!data.results || data.results.length === 0) {
                resultsDiv.innerHTML = "<p>No results found.</p>";
                return;
            }

            data.results.forEach(item => {
                const resultItem = `
                    <div>
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                        <hr>
                    </div>
                `;
                resultsDiv.innerHTML += resultItem;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error connecting to backend.");
        });
}
