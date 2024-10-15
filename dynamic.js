let projectsData; // Global variable to store project data

function loadProjectData() {
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            projectsData = data; // Store projects data globally
            displayProjectDetails(data[0]); // Display initial project (index 0)
            displayProjectImages(data[0].images);
        })
        .catch(error => console.error('Error fetching projects:', error));
}

function loadProject(index) {
    const project = projectsData[index];
    displayProjectDetails(project);
    displayProjectImages(project.images);
}

function displayProjectDetails(project) {
    const projectDetails = document.querySelector('.detailsof.project');
    projectDetails.innerHTML = `
        <p>TYPE OF PROJECT – <span>${project.project_type}</span></p>
        <p>LOCATION – <span>${project.location}</span></p>
        <p>AREA – <span>${project.area}</span> SFT</p>
        <p>BUILTUP AREA – <span>${project.builtup_area}</span> SFT</p>
        <p>YEAR – <span>${project.year}</span></p>
        <p>SCOPE OF WORK – <span>${project.scope_of_work}</span></p>
    `;
    
    const projectName = document.querySelector('.job-h[data-dynamic="project_name"]');
    projectName.textContent = project.project_name;
}

function displayProjectImages(images) {
    const imageElements = document.querySelectorAll('[data-dynamic^="images."]');
    imageElements.forEach(element => {
        const imageUrl = element.getAttribute('data-dynamic');
        element.src = images[imageUrl.split('.')[1]]; // Extract image key from data-dynamic attribute
    });
}
