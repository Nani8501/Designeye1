document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
    loadProjectByIdFromUrl();

    // Function to adjust footer margin based on number of visible grid containers
    function adjustFooterMargin() {
        const gridContainers = document.querySelectorAll('.grid-container > div');
        const footer = document.getElementById('footer'); // Replace with your footer ID

        // Check number of visible grid containers
        let visibleContainers = 0;
        gridContainers.forEach(container => {
            if (container.style.display !== 'none') {
                visibleContainers++;
            }
        });

        // Adjust margin based on the number of visible containers
        if (visibleContainers <= 4) {
            footer.style.marginTop = '105rem'; // Margin value when less than or equal to 4 photos
        } else {
            footer.style.marginTop = '100px'; // Margin value when more than 4 photos
        }
    }

    // Call adjustFooterMargin initially
    adjustFooterMargin();

    // Call adjustFooterMargin whenever the window is resized (if needed)
    window.addEventListener('resize', adjustFooterMargin);

    function loadProject(projectId) {
        fetch('Architecture Projects.json')
            .then(response => response.json())
            .then(data => {
                const project = data.find(proj => proj.id === projectId);
                if (project) {
                    // Set project details if available
                    document.querySelector('.job-h').textContent = project.project_name || 'Project Name Not Available';

                    // Project Type
                    const projectType = document.querySelector('.project_type');
                    if (project.project_type) {
                        document.querySelector('[data-dynamic="project_type"]').textContent = project.project_type;
                        projectType.style.display = 'block';
                    } else {
                        projectType.style.display = 'none';
                    }

                    // Location
                    const location = document.querySelector('.location');
                    if (project.location) {
                        document.querySelector('[data-dynamic="location"]').textContent = project.location;
                        location.style.display = 'block';
                    } else {
                        location.style.display = 'none';
                    }

                    // Area
                    const area = document.querySelector('.area');
                    if (project.area) {
                        document.querySelector('[data-dynamic="area"]').textContent = `${project.area} SFT`;
                        area.style.display = 'block';
                    } else {
                        area.style.display = 'none';
                    }

                    // Builtup Area
                    const builtupArea = document.querySelector('.builtup_area');
                    if (project.builtup_area) {
                        document.querySelector('[data-dynamic="builtup_area"]').textContent = `${project.builtup_area} SFT`;
                        builtupArea.style.display = 'block';
                    } else {
                        builtupArea.style.display = 'none';
                    }

                    // Year
                    const year = document.querySelector('.year');
                    if (project.year) {
                        document.querySelector('[data-dynamic="year"]').textContent = project.year;
                        year.style.display = 'block';
                    } else {
                        year.style.display = 'none';
                    }

                    // Scope of Work
                    const scopeOfWork = document.querySelector('.scope_of_work');
                    if (project.scope_of_work) {
                        document.querySelector('[data-dynamic="scope_of_work"]').textContent = project.scope_of_work;
                        scopeOfWork.style.display = 'block';
                    } else {
                        scopeOfWork.style.display = 'none';
                    }

                    // Update images only if they are available
                    const images = project.images;
                    if (images.img1) document.querySelector('.pro1i').src = images.img1;
                    if (images.img2) document.querySelector('.pro2i').src = images.img2;
                    if (images.img3) document.querySelector('.pro3i').src = images.img3;
                    if (images.img4) document.querySelector('.pro4i').src = images.img4;
                    if (images.img5) document.querySelector('.pro5i').src = images.img5;
                    if (images.img6) document.querySelector('.pro6i').src = images.img6;

                    // Show/hide grid containers based on image availability
                    const gridContainers = document.querySelectorAll('.grid-container > div');
                    gridContainers.forEach((container, index) => {
                        const imageKey = `img${index + 1}`;
                        if (!images[imageKey]) {
                            container.style.display = 'none';
                        } else {
                            container.style.display = 'block';
                        }
                    });
                } else {
                    console.error('Project not found');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function loadProjectByIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = parseInt(urlParams.get('project'));
        if (!isNaN(projectId)) {
            loadProject(projectId);
        } else {
            console.error('Invalid project ID in URL');
        }
    }

    loadProjectByIdFromUrl();

    // Get the modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const modalProjectType = document.getElementById('modalProjectType');
    const modalLocation = document.getElementById('modalLocation');
    const modalArea = document.getElementById('modalArea');
    const modalBuiltupArea = document.getElementById('modalBuiltupArea');
    const modalYear = document.getElementById('modalYear');
    const modalScopeOfWork = document.getElementById('modalScopeOfWork');

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];

    // Function to open modal with image details
    function openModal(img, project) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
        modalProjectType.innerHTML = project.project_type;
        modalLocation.innerHTML = project.location;
        modalArea.innerHTML = project.area;
        modalBuiltupArea.innerHTML = project.builtup_area;
        modalYear.innerHTML = project.year;
        modalScopeOfWork.innerHTML = project.scope_of_work;
    }

    // Close the modal
    span.onclick = function() { 
        modal.style.display = 'none';
    }

    // Event listeners for images
    document.querySelectorAll('.grid-container img').forEach((img, index) => {
        img.addEventListener('click', () => {
            fetch('Architecture Projects.json')
                .then(response => response.json())
                .then(data => {
                    const project = data.find(proj => proj.id === parseInt(new URLSearchParams(window.location.search).get('project')));
                    if (project) {
                        openModal(img, project);
                    } else {
                        console.error('Project not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });
    });
});
