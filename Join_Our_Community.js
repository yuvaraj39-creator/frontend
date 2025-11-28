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
                        <div id="skillsError" style="color: #dc2626; font-size: 0.75rem; margin-top: 4px; display: none;">Please add at least one skill</div>
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
                            <div id="yearsError" style="color: #dc2626; font-size: 0.75rem; margin-top: 4px; display: none;">Please enter valid years of experience</div>
                        </div>
                    </div>

                    <!-- Portfolio & LinkedIn URLs -->
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Portfolio URL (Optional)</label>
                        <input type="url" id="portfolioUrl" 
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s; margin-bottom: 10px;"
                            placeholder="https://yourportfolio.com">

                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">LinkedIn Profile (Optional)</label>
                        <input type="url" id="linkedinUrl" 
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                            placeholder="https://linkedin.com/in/yourprofile">
                        <div style="font-size: 0.75rem; color: #666; margin-top: 4px;">Add links to your portfolio or LinkedIn profile to showcase your work</div>
                    </div>

                    <!-- Buttons -->
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" id="cancelBtn" 
                            style="padding: 8px 16px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.85rem;">
                            Cancel
                        </button>
                        <button type="submit" id="submitBtn"
                            style="padding: 8px 16px; background: ${primaryColor}; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer; transition: background 0.3s; font-size: 0.85rem;">
                            Join Community
                        </button>
                    </div>

                    <!-- Loading Spinner -->
                    <div id="loadingSpinner" style="display: none; text-align: center; padding: 10px;">
                        <div style="display: inline-block; width: 20px; height: 20px; border: 2px solid #f3f3f3; border-top: 2px solid ${primaryColor}; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <div style="font-size: 0.85rem; color: #666; margin-top: 8px;">Submitting...</div>
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

        /* Loading spinner animation */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error-border {
            border-color: #dc2626 !important;
        }

        .success-message {
            background: #d1fae5;
            color: #065f46;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 15px;
            font-size: 0.85rem;
            text-align: center;
            border: 1px solid #a7f3d0;
        }

        /* Toast Notification Styles */
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .toast {
            padding: 12px 16px;
            border-radius: 6px;
            color: white;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 300px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }

        .toast.hide {
            transform: translateX(100%);
            opacity: 0;
        }

        .toast.success {
            background: #10b981;
        }

        .toast.error {
            background: #ef4444;
        }

        .toast.warning {
            background: #f59e0b;
        }

        .toast.info {
            background: #3b82f6;
        }

        .toast-icon {
            font-size: 1.1rem;
        }
    `;
    document.head.appendChild(style);

    // Append to overlay
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Toast Notification System
    const toastUtils = {
        createToast(message, type = 'info') {
            // Create toast container if it doesn't exist
            let toastContainer = document.querySelector('.toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.className = 'toast-container';
                document.body.appendChild(toastContainer);
            }

            // Create toast element
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            // Set icon based on type
            let icon = 'ℹ️';
            switch(type) {
                case 'success':
                    icon = '✅';
                    break;
                case 'error':
                    icon = '❌';
                    break;
                case 'warning':
                    icon = '⚠️';
                    break;
                case 'info':
                    icon = 'ℹ️';
                    break;
            }

            toast.innerHTML = `
                <span class="toast-icon">${icon}</span>
                <span>${message}</span>
            `;

            // Add toast to container
            toastContainer.appendChild(toast);

            // Animate in
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);

            // Auto remove after 5 seconds
            setTimeout(() => {
                this.removeToast(toast);
            }, 5000);

            return toast;
        },

        removeToast(toast) {
            toast.classList.remove('show');
            toast.classList.add('hide');
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        },

        showSuccess(message) {
            return this.createToast(message, 'success');
        },

        showError(message) {
            return this.createToast(message, 'error');
        },

        showWarning(message) {
            return this.createToast(message, 'warning');
        },

        showInfo(message) {
            return this.createToast(message, 'info');
        }
    };

    // Skills functionality
    let selectedSkills = [];
    const skillInput = popup.querySelector('#skillInput');
    const addSkillBtn = popup.querySelector('#addSkillBtn');
    const selectedSkillsContainer = popup.querySelector('#selectedSkills');
    const suggestionsContainer = popup.querySelector('#suggestionsContainer');
    const skillsError = popup.querySelector('#skillsError');

    // Function to add skill
    function addSkill(skill) {
        const trimmedSkill = skill.trim();
        if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
            selectedSkills.push(trimmedSkill);
            updateSkillsDisplay();
            skillInput.value = '';
            suggestionsContainer.style.display = 'none';
            hideSkillsError();
        }
    }

    // Function to remove skill
    function removeSkill(skill) {
        selectedSkills = selectedSkills.filter(s => s !== skill);
        updateSkillsDisplay();
        if (selectedSkills.length === 0) {
            showSkillsError();
        }
    }

    // Function to update skills display
    function updateSkillsDisplay() {
        selectedSkillsContainer.innerHTML = '';
        selectedSkills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.innerHTML = `
                ${skill}
                <button type="button" onclick="removeSkill('${skill.replace(/'/g, "\\'")}')">&times;</button>
            `;
            selectedSkillsContainer.appendChild(skillTag);
        });
    }

    // Function to show skills error
    function showSkillsError() {
        skillsError.style.display = 'block';
        skillInput.classList.add('error-border');
    }

    // Function to hide skills error
    function hideSkillsError() {
        skillsError.style.display = 'none';
        skillInput.classList.remove('error-border');
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
    const yearsError = popup.querySelector('#yearsError');

    experienceLevel.addEventListener('change', function () {
        if (this.value === 'experienced') {
            yearsExperienceContainer.style.display = 'block';
            yearsExperience.required = true;
        } else {
            yearsExperienceContainer.style.display = 'none';
            yearsExperience.required = false;
            yearsExperience.value = '';
            hideYearsError();
        }
    });

    // Function to show years error
    function showYearsError() {
        yearsError.style.display = 'block';
        yearsExperience.classList.add('error-border');
    }

    // Function to hide years error
    function hideYearsError() {
        yearsError.style.display = 'none';
        yearsExperience.classList.remove('error-border');
    }

    // URL validation functions
    function isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    function validateUrls() {
        const portfolioUrl = popup.querySelector('#portfolioUrl').value.trim();
        const linkedinUrl = popup.querySelector('#linkedinUrl').value.trim();
        
        let isValid = true;
        
        if (portfolioUrl && !isValidUrl(portfolioUrl)) {
            popup.querySelector('#portfolioUrl').classList.add('error-border');
            isValid = false;
        } else {
            popup.querySelector('#portfolioUrl').classList.remove('error-border');
        }
        
        if (linkedinUrl && !isValidUrl(linkedinUrl)) {
            popup.querySelector('#linkedinUrl').classList.add('error-border');
            isValid = false;
        } else {
            popup.querySelector('#linkedinUrl').classList.remove('error-border');
        }
        
        return isValid;
    }

    // Form validation
    function validateForm() {
        let isValid = true;

        // Validate required fields
        const fullName = popup.querySelector('#fullName').value.trim();
        const phone = popup.querySelector('#phoneNumber').value.trim();
        const email = popup.querySelector('#email').value.trim();

        if (!fullName) {
            popup.querySelector('#fullName').classList.add('error-border');
            isValid = false;
        } else {
            popup.querySelector('#fullName').classList.remove('error-border');
        }

        if (!phone) {
            popup.querySelector('#phoneNumber').classList.add('error-border');
            isValid = false;
        } else {
            popup.querySelector('#phoneNumber').classList.remove('error-border');
        }

        if (!email) {
            popup.querySelector('#email').classList.add('error-border');
            isValid = false;
        } else {
            popup.querySelector('#email').classList.remove('error-border');
        }

        // Validate skills
        if (selectedSkills.length === 0) {
            showSkillsError();
            isValid = false;
        } else {
            hideSkillsError();
        }

        // Validate experience level
        if (!experienceLevel.value) {
            experienceLevel.classList.add('error-border');
            isValid = false;
        } else {
            experienceLevel.classList.remove('error-border');
        }

        // Validate experience years if experienced
        if (experienceLevel.value === 'experienced' && (!yearsExperience.value || yearsExperience.value < 1)) {
            showYearsError();
            isValid = false;
        } else {
            hideYearsError();
        }

        // Validate URLs
        if (!validateUrls()) {
            isValid = false;
        }

        return isValid;
    }

    // Form submission handler
    const form = popup.querySelector('#communityForm');
    const submitBtn = popup.querySelector('#submitBtn');
    const loadingSpinner = popup.querySelector('#loadingSpinner');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            toastUtils.showError('Please fill all required fields correctly.');
            return;
        }

        // Prepare form data
        const formData = {
            name: popup.querySelector('#fullName').value.trim(),
            phone: popup.querySelector('#phoneNumber').value.trim(),
            email: popup.querySelector('#email').value.trim().toLowerCase(),
            skills: selectedSkills,
            experienceLevel: experienceLevel.value,
            yearsExperience: experienceLevel.value === 'experienced' ? parseInt(yearsExperience.value) : undefined,
            portfolioUrl: popup.querySelector('#portfolioUrl').value.trim() || undefined,
            linkedinUrl: popup.querySelector('#linkedinUrl').value.trim() || undefined
        };

        // Log the data being sent for debugging
        console.log('Submitting form data:', formData);

        try {
            // Show loading state
            submitBtn.style.display = 'none';
            loadingSpinner.style.display = 'block';

            // Get API base URL from config or use default
            const apiBaseUrl = window.AppConfig.API_BASE_URL;

            
            // Send data to backend
            const response = await fetch(`${apiBaseUrl}/api/community/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Get response text first to handle both success and error cases
            const responseText = await response.text();
            console.log('Server response:', responseText);

            let result;
            if (responseText) {
                try {
                    result = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('Failed to parse response:', parseError);
                    throw new Error('Invalid response from server');
                }
            } else {
                throw new Error('Empty response from server');
            }

            // Check if response is OK
            if (!response.ok) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            if (result.success) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <strong>Thank you for joining our community!</strong><br>
                    We will contact you soon.
                `;
                form.insertBefore(successMessage, form.firstChild);

                // Show success toast
                toastUtils.showSuccess('Successfully joined our community! We will contact you soon.');

                // Clear form
                form.reset();
                selectedSkills = [];
                updateSkillsDisplay();
                yearsExperienceContainer.style.display = 'none';

                // Close popup after 2 seconds
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                    if (document.head.contains(style)) {
                        document.head.removeChild(style);
                    }
                }, 2000);

            } else {
                // Show error message from server
                toastUtils.showError(result.message || 'Failed to submit form. Please try again.');
                
                // Restore button
                submitBtn.style.display = 'block';
                loadingSpinner.style.display = 'none';
            }

        } catch (error) {
            console.error('Submission error:', error);
            
            let errorMessage = 'Network error. Please check your connection and try again.';

            if (error.name === 'SyntaxError') {
                errorMessage = 'Invalid response from server. Please try again.';
            } else if (error.message.includes('HTTP error')) {
                if (error.message.includes('405')) {
                    errorMessage = 'Server method not allowed. Please contact administrator.';
                } else if (error.message.includes('404')) {
                    errorMessage = 'API endpoint not found. Please contact administrator.';
                } else if (error.message.includes('500')) {
                    errorMessage = 'Server error. Please try again later.';
                } else {
                    errorMessage = `Server error (${error.message}). Please try again later.`;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            toastUtils.showError(errorMessage);
            
            // Restore button
            submitBtn.style.display = 'block';
            loadingSpinner.style.display = 'none';
        }
    });

    // URL validation on blur
    const portfolioUrlInput = popup.querySelector('#portfolioUrl');
    const linkedinUrlInput = popup.querySelector('#linkedinUrl');

    portfolioUrlInput.addEventListener('blur', function() {
        const url = this.value.trim();
        if (url && !isValidUrl(url)) {
            this.classList.add('error-border');
            toastUtils.showWarning('Please enter a valid portfolio URL (e.g., https://yourportfolio.com)');
        } else {
            this.classList.remove('error-border');
        }
    });

    linkedinUrlInput.addEventListener('blur', function() {
        const url = this.value.trim();
        if (url && !isValidUrl(url)) {
            this.classList.add('error-border');
            toastUtils.showWarning('Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourprofile)');
        } else {
            this.classList.remove('error-border');
        }
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

    // Prevent form from closing when clicking inside
    popup.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

// Function to initialize community popup on button click
function initCommunityPopup(buttonSelector = '.community-btn') {
    const buttons = document.querySelectorAll(buttonSelector);
    
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            createCommunityPopupForm();
        });
    });
}

// Auto-initialize if there are community buttons on page load
document.addEventListener('DOMContentLoaded', function () {
    initCommunityPopup();
    
    // Also initialize any dynamically added buttons
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) { // Element node
                    const communityButtons = node.querySelectorAll ? node.querySelectorAll('.community-btn') : [];
                    communityButtons.forEach(button => {
                        button.addEventListener('click', function (e) {
                            e.preventDefault();
                            createCommunityPopupForm();
                        });
                    });
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createCommunityPopupForm, initCommunityPopup };
}