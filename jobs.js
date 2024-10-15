document.addEventListener("DOMContentLoaded", function() {
    fetch('job_openings.json')
        .then(response => response.json())
        .then(data => {
            const jobList = document.getElementById('job-list');
            const noJobsMsg = document.getElementById('no-jobs-msg');

            if (data.length === 0) {
                noJobsMsg.style.display = 'block';
            } else {
                data.forEach(job => {
                    const jobItem = document.createElement('div');
                    jobItem.classList.add('job-opening');
                    jobItem.innerHTML = `
                    <div class="jobs1"
                        <div class="ti1" ><h5>${job.title}</h5><div>
                        <div class="lin1"></div>
                            <p class="loc"><b>Location:</b> ${job.location}</p>
                            <p class="dep"><b>Department: </b>${job.department}</p>
                            <p class="Req"><b>Requirements: </b>${job.requirements}</p>
                            <p class="dis"><b>Description: </b>${job.description}</p>
                            <a href="jobform.html"<button class="apply-btn">Apply Now</button></a>
                    </div>
                    `;
                    jobList.appendChild(jobItem);
                });
            }
        })
        .catch(error => console.error('Error fetching jobs:', error));
});
