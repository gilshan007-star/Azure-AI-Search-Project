function search() {
    const query = document.getElementById("searchInput").value;

    fetch("http://127.0.0.1:8000/search?q=" + query)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            data.results.forEach(item => {
                resultsDiv.innerHTML += `
                    <div>
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                        <hr>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
