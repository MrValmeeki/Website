// Terminal functionality
const terminalBody = document.getElementById('terminal-body');
let terminalInput = document.getElementById('terminal-input');
let customCursor = document.getElementById('custom-blinking-cursor');
let inputContainer = document.getElementById('input-container');

// Command history
let commandHistory = [];
let historyIndex = -1;

// Function to position the custom cursor
function positionCustomCursor() {
    const measuringSpan = document.createElement('span');
    measuringSpan.style.visibility = 'hidden';
    measuringSpan.style.position = 'absolute';
    measuringSpan.style.whiteSpace = 'pre'; // Respect spaces

    const computedStyle = getComputedStyle(terminalInput);
    measuringSpan.style.font = computedStyle.font;
    measuringSpan.style.letterSpacing = computedStyle.letterSpacing;

    measuringSpan.textContent = terminalInput.value;
    inputContainer.appendChild(measuringSpan);
    const textWidth = measuringSpan.offsetWidth;
    inputContainer.removeChild(measuringSpan);

    customCursor.style.left = `${textWidth}px`;

    if (document.activeElement === terminalInput) {
        customCursor.style.display = 'inline';
    } else {
        customCursor.style.display = 'none';
    }
}

// Focus input when clicking anywhere in the terminal
terminalBody.addEventListener('click', () => {
    terminalInput.focus();
    positionCustomCursor();
});

// Handle commands + history navigation
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length; // reset index to end
        }

        terminalInput.value = '';
        positionCustomCursor();

        if (command) {
            const promptDiv = document.createElement('div');
            promptDiv.className = 'prompt';
            promptDiv.innerHTML = `
                <span class="prompt-dollar-input">$</span>
                <span class="prompt-user">atharv@portfolio</span>
                <span>:</span>
                <span class="prompt-location">~</span>
                <span>$</span>
                <span class="prompt-input"> ${command}</span>
            `;

            terminalBody.insertBefore(promptDiv, document.querySelector('.terminal-input-area'));
            processCommand(command);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }

    // 🔼 ArrowUp = previous command
    else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
            positionCustomCursor();
        }
        e.preventDefault();
    }

    // 🔽 ArrowDown = next command
    else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
        positionCustomCursor();
        e.preventDefault();
    }
});

// Event listeners for custom cursor positioning
terminalInput.addEventListener('input', positionCustomCursor);
terminalInput.addEventListener('focus', positionCustomCursor);
terminalInput.addEventListener('blur', () => {
    customCursor.style.display = 'none';
});

// Initial positioning and focus
terminalInput.focus();
positionCustomCursor();

// Process commands
function processCommand(command) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'response';

    // ✅ Handle dynamic GitHub fetch
    if (command.toLowerCase().startsWith("fetch-github --user")) {
        const parts = command.split(" ");
        const username = parts[2] || "MrValmeeki"; // fallback to your GitHub username

        responseDiv.innerHTML = `
            <p class="section-title">GITHUB ACTIVITY</p>
            <p class="loading">Fetching data from GitHub API</p>
            <div id="github-data-new"></div>
        `;

        fetchGitHubData(username, 'github-data-new');
    } else {
        switch(command.toLowerCase()) {
            case 'whoami':
                responseDiv.innerHTML = `
                    <p class="section-title">ABOUT ME</p>
                    <p>I'm Atharv, a passionate Robotics and AI Engineering student with a strong foundation in programming and system design. My journey in technology is driven by a curiosity to build intelligent systems that can solve real-world problems.</p>
                    <br>
                    <p>With expertise in C++, C, Python, and web development, I enjoy creating projects that bridge hardware and software, particularly in robotics applications and game development.</p>
                    <br>
                    <p>I'm constantly exploring new technologies and methodologies in the field of AI and robotics, with a particular interest in computer vision, machine learning, and autonomous systems.</p>
                `;
                break;

            case 'ls -la skills/':
            case 'ls skills':
            case 'skills':
                responseDiv.innerHTML = `
                    <p class="section-title">SKILLS</p>
                    
                    <div class="skill-category">
                      <p class="highlight">Programming Languages:</p>
                        <div>
                            <span class="skill-name" title="C++"><i class="fab fa-cuttlefish"></i>++</span>
                            <span class="skill-name" title="C"><i class="fab fa-cuttlefish"></i></span>
                            <span class="skill-name" title="Python"><i class="fab fa-python"></i></span>
                            <span class="skill-name" title="HTML5"><i class="fab fa-html5"></i></span>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <p class="highlight">Technologies:</p>
                        <div>
                            <span class="skill-name">Robotics</span>
                            <span class="skill-name">AI/ML</span>
                            <span class="skill-name">Game Development</span>
                            <span class="skill-name">Embedded Systems</span>
                            <span class="skill-name">Version Control (Git)</span>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <p class="highlight">Soft Skills:</p>
                        <div>
                            <span class="skill-name">Problem Solving</span>
                            <span class="skill-name">System Design</span>
                            <span class="skill-name">Technical Documentation</span>
                            <span class="skill-name">Project Management</span>
                        </div>
                    </div>
                `;
                break;

            case 'cat projects/ashvale.md':
            case 'projects':
            case 'project ashvale':
            case 'ashvale':
                responseDiv.innerHTML = `
                    <div class="project-card">
                        <h3 class="project-title">AshVale</h3>
                        <p class="project-description">AshVale is a 2D game developed using C++. The game features immersive gameplay with engaging mechanics and a captivating storyline. It demonstrates my skills in game development, graphics programming, and creating interactive experiences.</p>
                        <p><span class="highlight">Technologies:</span> C++, Game Development, 2D Graphics, Game Design</p>
                        <p><span class="highlight">Repository:</span> <a href="https://github.com/MrValmeeki/AshVale" target="_blank" class="project-link">https://github.com/MrValmeeki/AshVale</a></p>
                    </div>
                `;
                break;

            case 'github':
                responseDiv.innerHTML = `
                    <p class="section-title">GITHUB ACTIVITY</p>
                    <p class="loading">Fetching data from GitHub API</p>
                    <div id="github-data-new"></div>
                `;
                fetchGitHubData('MrValmeeki', 'github-data-new'); // ✅ default GitHub user
                break;

            case 'contact --list':
            case 'contact':
                responseDiv.innerHTML = `
                    <p class="section-title">CONTACT INFORMATION</p>
                    
                    <div class="contact-item">
                        <span class="contact-label">Email:</span>
                        <a href="mailto:its.atrv@gmail.com" class="project-link">its.atrv@gmail.com</a>
                    </div>
                    
                    <div class="contact-item">
                        <span class="contact-label">GitHub:</span>
                        <a href="https://github.com/MrValmeeki" target="_blank" class="project-link">github.com/MrValmeeki</a>
                    </div>
                `;
                break;

            case 'clear':
                const asciiArt = document.getElementById('ascii-art').cloneNode(true);
                terminalBody.innerHTML = '';
                terminalBody.appendChild(asciiArt);

                const inputArea = document.createElement('div');
                inputArea.className = 'terminal-input-area';
                inputArea.innerHTML = `
                    <span class="prompt-dollar-input">$</span>
                    <span class="prompt-user">atharv@portfolio</span>
                    <span>:</span>
                    <span class="prompt-location">~</span>
                    <span>$</span>
                    <div id="input-container">
                        <input type="text" id="terminal-input" autofocus>
                        <span class="blink" id="custom-blinking-cursor">█</span>
                    </div>
                `;
                terminalBody.appendChild(inputArea);

                terminalInput = document.getElementById('terminal-input');
                customCursor = document.getElementById('custom-blinking-cursor');
                inputContainer = document.getElementById('input-container');

                terminalInput.focus();
                positionCustomCursor();

                // Re-attach listeners for history + cursor after clear
                terminalInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const command = terminalInput.value.trim();
                        if (command) {
                            commandHistory.push(command);
                            historyIndex = commandHistory.length;
                        }
                        terminalInput.value = '';
                        positionCustomCursor();
                        if (command) {
                            const promptDiv = document.createElement('div');
                            promptDiv.className = 'prompt';
                            promptDiv.innerHTML = `
                                <span class="prompt-dollar-input">$</span>
                                <span class="prompt-user">atharv@portfolio</span>
                                <span>:</span>
                                <span class="prompt-location">~</span>
                                <span>$</span>
                                <span class="prompt-input"> ${command}</span>
                            `;
                            terminalBody.insertBefore(promptDiv, document.querySelector('.terminal-input-area'));
                            processCommand(command);
                            terminalBody.scrollTop = terminalBody.scrollHeight;
                        }
                    } else if (e.key === 'ArrowUp') {
                        if (historyIndex > 0) {
                            historyIndex--;
                            terminalInput.value = commandHistory[historyIndex];
                            positionCustomCursor();
                        }
                        e.preventDefault();
                    } else if (e.key === 'ArrowDown') {
                        if (historyIndex < commandHistory.length - 1) {
                            historyIndex++;
                            terminalInput.value = commandHistory[historyIndex];
                        } else {
                            historyIndex = commandHistory.length;
                            terminalInput.value = '';
                        }
                        positionCustomCursor();
                        e.preventDefault();
                    }
                });

                terminalInput.addEventListener('input', positionCustomCursor);
                terminalInput.addEventListener('focus', positionCustomCursor);
                terminalInput.addEventListener('blur', () => {
                    customCursor.style.display = 'none';
                });

                return;

            case 'help':
                responseDiv.innerHTML = `
                    <p class="section-title">AVAILABLE COMMANDS</p>
                    
                    <div class="help-grid">
                        <div class="help-item">
                            <p class="help-command">whoami</p>
                            <p class="help-description">Display information about me</p>
                        </div>
                        
                        <div class="help-item">
                            <p class="help-command">ls -la skills/</p>
                            <p class="help-description">List all my skills</p>
                        </div>
                        
                        <div class="help-item">
                            <p class="help-command">cat projects/[name].md</p>
                            <p class="help-description">View details of a project</p>
                        </div>
                        
                        <div class="help-item">
                            <p class="help-command">fetch-github --user [username]</p>
                            <p class="help-description">Fetch GitHub activity</p>
                        </div>
                        
                        <div class="help-item">
                            <p class="help-command">contact --list</p>
                            <p class="help-description">Display contact information</p>
                        </div>
                        
                        <div class="help-item">
                            <p class="help-command">clear</p>
                            <p class="help-description">Clear the terminal</p>
                        </div>
                        
                        <div class="help-item">
                            <p class="help-command">help</p>
                            <p class="help-description">Display this help message</p>
                        </div>
                    </div>
                `;
                break;

            default:
                responseDiv.innerHTML = `<p class="error">Command not found: ${command}. Type 'help' for available commands.</p>`;
        }
    }

    terminalBody.insertBefore(responseDiv, document.querySelector('.terminal-input-area'));
}

// Fetch GitHub data
async function fetchGitHubData(username, elementId) {
    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        if (userData.message === 'Not Found') {
            throw new Error('GitHub user not found');
        }

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        const reposData = await reposResponse.json();

        let totalStars = 0;
        let totalForks = 0;

        if (Array.isArray(reposData)) {
            reposData.forEach(repo => {
                totalStars += repo.stargazers_count;
                totalForks += repo.forks_count;
            });
        }

        let html = `
            <div class="github-stats">
                <p><span class="highlight">Username:</span> ${userData.login}</p>
                <p><span class="highlight">Repositories:</span> ${userData.public_repos || 0}</p>
                <p><span class="highlight">Followers:</span> ${userData.followers || 0}</p>
                <p><span class="highlight">Stars:</span> ${totalStars}</p>
                <p><span class="highlight">Forks:</span> ${totalForks}</p>
            </div>
            
            <p class="highlight" style="margin-top: 15px;">Recent Repositories:</p>
        `;

        if (Array.isArray(reposData) && reposData.length > 0) {
            reposData.forEach(repo => {
                html += `
                    <div class="github-repo">
                        <p class="github-repo-name">${repo.name}</p>
                        <p class="github-repo-description">${repo.description || 'No description available'}</p>
                        <div class="github-repo-stats">
                            ${repo.language ? `<span class="github-repo-stat"><i class="fas fa-code"></i> ${repo.language}</span>` : ''}
                            <span class="github-repo-stat"><i class="far fa-star"></i> ${repo.stargazers_count}</span>
                            <span class="github-repo-stat"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        </div>
                        <p style="margin-top: 5px;"><a href="${repo.html_url}" target="_blank" class="project-link">View Repository</a></p>
                    </div>
                `;
            });
        } else {
            html += '<p>No repositories found</p>';
        }

        document.getElementById(elementId).innerHTML = html;

    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        document.getElementById(elementId).innerHTML = `
            <p class="error">Error fetching GitHub data. This could be due to API rate limits or network issues.</p>
            <p>You can still visit the <a href="https://github.com/${username}" target="_blank" class="project-link">GitHub profile</a> directly.</p>
        `;
    }
}

// Initial GitHub data fetch (default user → MrValmeeki)
fetchGitHubData('MrValmeeki', 'github-data');

// Simulate typing effect for the first command
setTimeout(() => {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
        el.classList.remove('loading');
        if (el.textContent.includes('Fetching')) {
            el.textContent = 'GitHub data fetched successfully!';
        } else {
            el.textContent = 'Loaded successfully!';
        }
    });
}, 3000);
