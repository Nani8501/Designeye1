document.addEventListener("DOMContentLoaded", function() {
    fetch('Architecture Projects.json')
        .then(response => response.json())
        .then(data => {
            window.projectData = data; // Store the data globally to access later
            generateButtons(data);
        })
        .catch(error => console.error('Error fetching projects:', error));
});

function generateButtons(data) {
    const buttonContainer = document.getElementById('button-container');
    data.forEach((project, index) => {
        const button = document.createElement('button');
        button.innerText = project.project_name;
        button.onclick = () => showProjectDetails(index);
        buttonContainer.appendChild(button);
    });
}

function showProjectDetails(index) {
    const project = window.projectData[index];
    displayProjectDetails(project);
    displayProjectImages(project.images);
}

function displayProjectDetails(project) {
    const projectDetails = document.getElementById('project-details');
    projectDetails.innerHTML = `
        <h2>${project.project_name}</h2>
        <p><strong>Type:</strong> ${project.project_type}</p>
        <p><strong>Location:</strong> ${project.location}</p>
        <p><strong>Area:</strong> ${project.area}</p>
        <p><strong>Built-up Area:</strong> ${project.builtup_area}</p>
        <p><strong>Year:</strong> ${project.year}</p>
        <p><strong>Scope of Work:</strong> ${project.scope_of_work}</p>
    `;
}

function displayProjectImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear current images
    for (const [key, imageUrl] of Object.entries(images)) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = key;
        gallery.appendChild(img);
    }
}
