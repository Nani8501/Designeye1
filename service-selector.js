function openService(service) {
    fetch('Architecture Projects copy.json')
        .then(response => response.json())
        .then(data => {
            if (data[service]) {
                const url = `Architecture Projects copy.html?service=${service}`;
                // Open the URL in a new tab
                window.open(url, '_blank');
            } else {
                console.error('Service not found in JSON.');
            }
        })
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}
