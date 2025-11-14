// Create Join Our Community Form - Popup Window
function createCommunityPopupForm() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
    `;

    // Create popup container
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        width: 95%;
        max-width: 450px;
        max-height: 95vh;
        overflow: hidden;
        margin: 20px;
    `;

    // Get colors and logo from existing HTML
    const primaryColor = '#800020';
    const primaryDark = '#600018';
    const logoUrl = document.querySelector('header img[src*="favicon"]')?.src || 'img/favicon-32x32.png';

    // Skills suggestions data
    const skillsSuggestions = [
        // Programming Languages
        'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#',
        'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'R', 'Scala',
        'Perl', 'Shell Scripting', 'PowerShell',

        // Web Frontend
        'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind CSS',
        'React', 'Next.js', 'Angular', 'Vue.js', 'Svelte', 'jQuery',

        // Backend Frameworks
        'Node.js', 'Express.js', 'NestJS',
        'Spring Boot', 'Django', 'Flask', 'FastAPI',
        'Laravel', 'Ruby on Rails', 'ASP.NET Core',

        // Databases
        'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL Server',
        'Redis', 'Cassandra', 'Elasticsearch', 'Firebase', 'DynamoDB',

        // Cloud Computing
        'AWS', 'Azure', 'Google Cloud (GCP)', 'DigitalOcean',
        'Cloud Computing', 'Serverless Computing', 'Cloud Security',

        // DevOps & Tools
        'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'GitLab',
        'CI/CD', 'Terraform', 'Ansible', 'Prometheus', 'Grafana',
        'Linux Administration', 'Nginx', 'Apache', 'Agile', 'Scrum',

        // Testing / QA
        'Manual Testing', 'Automation Testing', 'Selenium WebDriver',
        'TestNG', 'JUnit', 'Cucumber', 'Cypress', 'Playwright',
        'Postman', 'Rest Assured', 'API Testing', 'Performance Testing',
        'JMeter', 'Quality Assurance',

        // Mobile Development
        'Android Development', 'iOS Development', 'SwiftUI',
        'Flutter', 'React Native',

        // Data / AI / ML
        'Data Structures', 'Algorithms', 'Data Analysis', 'Data Engineering',
        'Machine Learning', 'Deep Learning', 'NLP',
        'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Power BI', 'Tableau',

        // Cybersecurity
        'Cybersecurity', 'Network Security', 'Ethical Hacking',
        'Penetration Testing', 'Vulnerability Assessment',

        // UI/UX & Design
        'UI/UX Design', 'Figma', 'Adobe XD', 'Wireframing', 'Prototyping',

        // Soft Skills (IT Important)
        'Problem Solving', 'Communication', 'Teamwork', 'Leadership',
        'Time Management', 'Critical Thinking', 'Project Management'
    ];


    // Popup content
    popup.innerHTML = `
        <div style="padding: 0;">
            <!-- Header -->
            <div style="background: ${primaryColor}; color: white; padding: 12px 15px; display: flex; align-items: center; gap: 10px;">
                <img src="${logoUrl}" alt="Logo" style="width: 20px; height: 20px;">
                <h2 style="margin: 0; font-size: 1.1rem; font-weight: 600;">Join Our Community</h2>
            </div>

            <!-- Form -->
            <div style="padding: 15px; max-height: calc(95vh - 120px); overflow-y: auto;" class="popup-form-content">
                <form id="communityForm">
                    <!-- Name -->
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Full Name *</label>
                        <input type="text" id="fullName" required 
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                            placeholder="Enter your full name">
                    </div>

                    <!-- Phone & Email in one row -->
                    <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Phone Number *</label>
                            <input type="tel" id="phoneNumber" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                                placeholder="Phone number">
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Email *</label>
                            <input type="email" id="email" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                                placeholder="Email address">
                        </div>
                    </div>

                    <!-- Skills Section -->
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Skills *</label>
                        <div style="position: relative;">
                            <input type="text" id="skillInput" 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                                placeholder="Type a skill and press Enter or click Add">
                            <div id="suggestionsContainer" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #e5e7eb; border-radius: 6px; max-height: 150px; overflow-y: auto; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
                        </div>
                        <button type="button" id="addSkillBtn" style="margin-top: 8px; padding: 6px 12px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">Add Skill</button>
                        
                        <!-- Selected Skills Display -->
                        <div id="selectedSkills" style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; min-height: 30px;"></div>
                    </div>

                    <!-- Experience Section -->
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Experience Level *</label>
                        <select id="experienceLevel" required 
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; background: white; cursor: pointer; margin-bottom: 8px;">
                            <option value="">Select experience level</option>
                            <option value="fresher">Fresher</option>
                            <option value="experienced">Experienced</option>
                        </select>
                        
                        <!-- Years of Experience (hidden by default) -->
                        <div id="yearsExperienceContainer" style="display: none;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Years of Experience *</label>
                            <input type="number" id="yearsExperience" min="1" max="50" 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem;"
                                placeholder="Enter years of experience">
                        </div>
                    </div>

                    <!-- Resume Upload -->
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Upload Resume</label>
                        <input type="file" id="resume" accept=".pdf,.doc,.docx"
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; background: white;">
                        <div style="font-size: 0.75rem; color: #666; margin-top: 4px;">Accepted formats: PDF, DOC, DOCX (Max: 5MB)</div>
                    </div>

                    <!-- Buttons -->
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" id="cancelBtn" 
                            style="padding: 8px 16px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.85rem;">
                            Cancel
                        </button>
                        <button type="submit" 
                            style="padding: 8px 16px; background: ${primaryColor}; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer; transition: background 0.3s; font-size: 0.85rem;">
                            Join Community
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add hover effects and styles
    const style = document.createElement('style');
    style.textContent = `
        #communityForm input:focus, #communityForm select:focus, #communityForm textarea:focus {
            outline: none;
            border-color: ${primaryColor} !important;
        }
        
        #communityForm button[type="submit"]:hover {
            background: ${primaryDark} !important;
        }
        
        #cancelBtn:hover {
            background: #f3f4f6 !important;
        }
        
        .skill-tag {
            display: inline-flex;
            align-items: center;
            background: ${primaryColor};
            color: white;
            padding: 4px 8px;
            border-radius: 16px;
            font-size: 0.75rem;
            gap: 6px;
        }
        
        .skill-tag button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 0.7rem;
            padding: 0;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        
        .skill-tag button:hover {
            background: rgba(255,255,255,0.3);
        }
        
        .suggestion-item {
            padding: 8px 12px;
            cursor: pointer;
            font-size: 0.85rem;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .suggestion-item:hover {
            background: #f3f4f6;
        }
        
        .suggestion-item:last-child {
            border-bottom: none;
        }
        
        /* Custom scrollbar for form area */
        .popup-form-content::-webkit-scrollbar {
            width: 6px;
        }
        
        .popup-form-content::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        
        .popup-form-content::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }
        
        .popup-form-content::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
    `;
    document.head.appendChild(style);

    // Append to overlay
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Skills functionality
    let selectedSkills = [];
    const skillInput = popup.querySelector('#skillInput');
    const addSkillBtn = popup.querySelector('#addSkillBtn');
    const selectedSkillsContainer = popup.querySelector('#selectedSkills');
    const suggestionsContainer = popup.querySelector('#suggestionsContainer');

    // Function to add skill
    function addSkill(skill) {
        if (skill && !selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
            updateSkillsDisplay();
            skillInput.value = '';
            suggestionsContainer.style.display = 'none';
        }
    }

    // Function to remove skill
    function removeSkill(skill) {
        selectedSkills = selectedSkills.filter(s => s !== skill);
        updateSkillsDisplay();
    }

    // Function to update skills display
    function updateSkillsDisplay() {
        selectedSkillsContainer.innerHTML = '';
        selectedSkills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.innerHTML = `
                ${skill}
                <button type="button" onclick="removeSkill('${skill}')">&times;</button>
            `;
            selectedSkillsContainer.appendChild(skillTag);
        });
    }

    // Function to show suggestions
    function showSuggestions() {
        const input = skillInput.value.toLowerCase();
        if (input.length < 1) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const filtered = skillsSuggestions.filter(skill =>
            skill.toLowerCase().includes(input)
        );

        suggestionsContainer.innerHTML = '';
        filtered.forEach(skill => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = skill;
            div.onclick = () => {
                addSkill(skill);
            };
            suggestionsContainer.appendChild(div);
        });

        suggestionsContainer.style.display = filtered.length ? 'block' : 'none';
    }

    // Skills event listeners
    skillInput.addEventListener('input', showSuggestions);
    skillInput.addEventListener('focus', showSuggestions);

    skillInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(skillInput.value.trim());
        }
    });

    addSkillBtn.addEventListener('click', function () {
        addSkill(skillInput.value.trim());
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (e) {
        if (!skillInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Experience level functionality
    const experienceLevel = popup.querySelector('#experienceLevel');
    const yearsExperienceContainer = popup.querySelector('#yearsExperienceContainer');
    const yearsExperience = popup.querySelector('#yearsExperience');

    experienceLevel.addEventListener('change', function () {
        if (this.value === 'experienced') {
            yearsExperienceContainer.style.display = 'block';
            yearsExperience.required = true;
        } else {
            yearsExperienceContainer.style.display = 'none';
            yearsExperience.required = false;
            yearsExperience.value = '';
        }
    });

    // Form submission handler
    const form = popup.querySelector('#communityForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate skills
        if (selectedSkills.length === 0) {
            alert('Please add at least one skill');
            return;
        }

        // Validate experience years if experienced
        if (experienceLevel.value === 'experienced' && (!yearsExperience.value || yearsExperience.value < 1)) {
            alert('Please enter valid years of experience');
            return;
        }

        const formData = {
            name: document.getElementById('fullName').value,
            phone: document.getElementById('phoneNumber').value,
            email: document.getElementById('email').value,
            skills: selectedSkills,
            experienceLevel: experienceLevel.value,
            yearsExperience: experienceLevel.value === 'experienced' ? yearsExperience.value : null,
            resume: document.getElementById('resume').files[0]?.name || 'Not uploaded',
            timestamp: new Date().toISOString()
        };

        // Here you would typically send data to your backend
        console.log('Community Join Data:', formData);

        // Show success message
        alert('Thank you for joining our community! We will contact you soon.');

        // Close popup
        document.body.removeChild(overlay);
        document.head.removeChild(style);
    });

    // Cancel button handler
    const cancelBtn = popup.querySelector('#cancelBtn');
    cancelBtn.addEventListener('click', function () {
        document.body.removeChild(overlay);
        document.head.removeChild(style);
    });

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
        }
    });

    // Make removeSkill function available globally for the onclick handler
    window.removeSkill = removeSkill;
}
