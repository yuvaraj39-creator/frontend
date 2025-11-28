// Enhanced Course Application Form - Popup Window with Robust Backend Integration
function createCoursePopupForm() {
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
        max-width: 420px;
        max-height: 95vh;
        overflow: hidden;
        margin: 20px;
    `;

    // Get colors and logo from existing HTML
    const primaryColor = '#800020';
    const primaryDark = '#600018';
    const logoUrl = document.querySelector('header img[src*="favicon"]')?.src || 'img/favicon-32x32.png';

    // Popup content - Compact version
    popup.innerHTML = `
        <div style="padding: 0;">
            <!-- Header -->
            <div style="background: ${primaryColor}; color: white; padding: 12px 15px; display: flex; align-items: center; gap: 10px;">
                <img src="${logoUrl}" alt="Logo" style="width: 20px; height: 20px;">
                <h2 style="margin: 0; font-size: 1.1rem; font-weight: 600;">Course Application</h2>
            </div>

            <!-- Form -->
            <div style="padding: 15px; max-height: calc(95vh - 120px); overflow-y: auto;">
                <form id="applicationForm">
                    <!-- Name -->
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Full Name *</label>
                        <input type="text" id="applicantName" required 
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                            placeholder="Enter your full name">
                        <div class="error-message" data-field="name" style="color: #dc2626; font-size: 0.75rem; margin-top: 4px; display: none;"></div>
                    </div>

                    <!-- Phone & Email in one row -->
                    <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Phone *</label>
                            <input type="tel" id="applicantPhone" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                                placeholder="Phone number">
                            <div class="error-message" data-field="phone" style="color: #dc2626; font-size: 0.75rem; margin-top: 4px; display: none;"></div>
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Email *</label>
                            <input type="email" id="applicantEmail" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                                placeholder="Email address">
                            <div class="error-message" data-field="email" style="color: #dc2626; font-size: 0.75rem; margin-top: 4px; display: none;"></div>
                        </div>
                    </div>

                    <!-- Course & Study Mode in one row -->
                    <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Course *</label>
                            <select id="selectedCourse" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; background: white; cursor: pointer;">
                                <option value="">Select course</option>
                                <option value="testing">Testing</option>
                                <option value="fullstack">Full Stack</option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="datascience">Data Science</option>
                                <option value="ai-ml">AI & ML</option>
                                <option value="cybersecurity">Cyber Security</option>
                                <option value="cloud">Cloud Computing</option>
                                <option value="devops">DevOps</option>
                                <option value="mobile">Mobile Dev</option>
                            </select>
                            <div class="error-message" data-field="course" style="color: #dc2626; font-size: 0.75rem; margin-top: 4px; display: none;"></div>
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Study Mode *</label>
                            <select id="studyMode" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; background: white; cursor: pointer;">
                                <option value="">Select mode</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                            <div class="error-message" data-field="studyMode" style="color: #dc2626; font-size: 0.75rem; margin-top: 4px; display: none;"></div>
                        </div>
                    </div>

                    <!-- Message -->
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Message (Optional)</label>
                        <textarea id="applicantMessage" rows="2"
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; resize: vertical; min-height: 60px;"
                            placeholder="Any additional information"></textarea>
                    </div>

                    <!-- Loading Spinner -->
                    <div id="loadingSpinner" style="display: none; text-align: center; margin: 10px 0;">
                        <div style="display: inline-block; width: 20px; height: 20px; border: 2px solid #f3f3f3; border-top: 2px solid ${primaryColor}; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <span style="margin-left: 8px; font-size: 0.85rem; color: #666;">Submitting...</span>
                    </div>

                    <!-- Success Message -->
                    <div id="successMessage" style="display: none; text-align: center; margin: 10px 0; padding: 10px; background: #d1fae5; color: #065f46; border-radius: 6px; font-size: 0.85rem;">
                        <div style="font-weight: 600; margin-bottom: 5px;">  Application Submitted Successfully!</div>
                        <div style="font-size: 0.8rem;">We have received your application and will contact you shortly.</div>
                    </div>

                    <!-- Error Message -->
                    <div id="errorMessage" style="display: none; text-align: center; margin: 10px 0; padding: 10px; background: #fee2e2; color: #dc2626; border-radius: 6px; font-size: 0.85rem;"></div>

                    <!-- Buttons -->
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" id="cancelBtn" 
                            style="padding: 8px 16px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.85rem;">
                            Cancel
                        </button>
                        <button type="submit" id="submitBtn"
                            style="padding: 8px 16px; background: ${primaryColor}; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer; transition: background 0.3s; font-size: 0.85rem;">
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add hover effects and animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        #applicationForm input:focus, #applicationForm select:focus, #applicationForm textarea:focus {
            outline: none;
            border-color: ${primaryColor} !important;
        }
        
        #applicationForm input.error, #applicationForm select.error, #applicationForm textarea.error {
            border-color: #dc2626 !important;
        }
        
        #submitBtn:hover:not(:disabled) {
            background: ${primaryDark} !important;
        }
        
        #submitBtn:disabled {
            background: #9ca3af !important;
            cursor: not-allowed !important;
        }
        
        #cancelBtn:hover {
            background: #f3f4f6 !important;
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
        
        .fade-in {
            animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .success-checkmark {
            width: 40px;
            height: 40px;
            margin: 0 auto 10px;
            border-radius: 50%;
            background: #10b981;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
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

    // Add scrollbar class to form content
    const formContent = popup.querySelector('div > div');
    formContent.classList.add('popup-form-content');

    // Append to overlay
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Add fade-in animation
    popup.classList.add('fade-in');

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
            switch (type) {
                case 'success':
                    icon = ' ';
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

    // Utility Functions
    const utils = {
        // Show error for specific field
        showFieldError(fieldName, message) {
            const errorElement = popup.querySelector(`.error-message[data-field="${fieldName}"]`);
            const inputElement = popup.querySelector(`#applicant${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`) ||
                popup.querySelector(`#${fieldName.charAt(0).toLowerCase() + fieldName.slice(1)}`) ||
                popup.querySelector(`#selected${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`);

            if (errorElement && inputElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                inputElement.classList.add('error');
            }
        },

        // Hide error for specific field
        hideFieldError(fieldName) {
            const errorElement = popup.querySelector(`.error-message[data-field="${fieldName}"]`);
            const inputElement = popup.querySelector(`#applicant${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`) ||
                popup.querySelector(`#${fieldName.charAt(0).toLowerCase() + fieldName.slice(1)}`) ||
                popup.querySelector(`#selected${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`);

            if (errorElement && inputElement) {
                errorElement.style.display = 'none';
                inputElement.classList.remove('error');
            }
        },

        // Clear all errors
        clearAllErrors() {
            const errorElements = popup.querySelectorAll('.error-message');
            const inputElements = popup.querySelectorAll('input, select, textarea');

            errorElements.forEach(element => {
                element.style.display = 'none';
            });

            inputElements.forEach(element => {
                element.classList.remove('error');
            });
        },

        // Show loading state
        showLoading() {
            const submitBtn = popup.querySelector('#submitBtn');
            const loadingSpinner = popup.querySelector('#loadingSpinner');
            const errorMessage = popup.querySelector('#errorMessage');
            const successMessage = popup.querySelector('#successMessage');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            loadingSpinner.style.display = 'block';
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';
        },

        // Hide loading state
        hideLoading() {
            const submitBtn = popup.querySelector('#submitBtn');
            const loadingSpinner = popup.querySelector('#loadingSpinner');

            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Application';
            loadingSpinner.style.display = 'none';
        },

        // Show success message
        showSuccess(applicationId = '') {
            const successMessage = popup.querySelector('#successMessage');
            const errorMessage = popup.querySelector('#errorMessage');

            if (applicationId) {
                successMessage.innerHTML = `
                    <div class="success-checkmark">✓</div>
                    <div style="font-weight: 600; margin-bottom: 5px;">  Application Submitted Successfully!</div>
                    <div style="font-size: 0.8rem; margin-bottom: 5px;">Reference ID: <strong>${applicationId}</strong></div>
                    <div style="font-size: 0.8rem;">We will contact you shortly.</div>
                `;
            }

            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
        },

        // Show error message
        showError(message) {
            const errorMessage = popup.querySelector('#errorMessage');
            const successMessage = popup.querySelector('#successMessage');

            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        },

        // Validate email format
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // Validate phone format
        validatePhone(phone) {
            const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
            return phoneRegex.test(phone);
        },

        // Get API base URL
        getApiBaseUrl() {
            return `${window.AppConfig.API_BASE_URL}/api`;
        },


        // Sanitize input
        sanitizeInput(input) {
            return input.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    };

    // Form validation
    function validateForm(data) {
        let isValid = true;
        utils.clearAllErrors();

        // Validate name
        if (!data.name.trim()) {
            utils.showFieldError('name', 'Full name is required');
            isValid = false;
        } else if (data.name.trim().length < 2) {
            utils.showFieldError('name', 'Name must be at least 2 characters long');
            isValid = false;
        } else if (data.name.trim().length > 100) {
            utils.showFieldError('name', 'Name cannot exceed 100 characters');
            isValid = false;
        }

        // Validate phone
        if (!data.phone.trim()) {
            utils.showFieldError('phone', 'Phone number is required');
            isValid = false;
        } else if (!utils.validatePhone(data.phone)) {
            utils.showFieldError('phone', 'Please enter a valid phone number (10-15 digits)');
            isValid = false;
        }

        // Validate email
        if (!data.email.trim()) {
            utils.showFieldError('email', 'Email address is required');
            isValid = false;
        } else if (!utils.validateEmail(data.email)) {
            utils.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate course
        if (!data.course) {
            utils.showFieldError('course', 'Please select a course');
            isValid = false;
        }

        // Validate study mode
        if (!data.studyMode) {
            utils.showFieldError('studyMode', 'Please select a study mode');
            isValid = false;
        }

        // Validate message length
        if (data.message && data.message.length > 1000) {
            utils.showFieldError('message', 'Message cannot exceed 1000 characters');
            isValid = false;
        }

        return isValid;
    }

    // Form submission handler
    const form = popup.querySelector('#applicationForm');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const applicationData = {
            name: document.getElementById('applicantName').value,
            phone: document.getElementById('applicantPhone').value,
            email: document.getElementById('applicantEmail').value,
            course: document.getElementById('selectedCourse').value,
            studyMode: document.getElementById('studyMode').value,
            message: document.getElementById('applicantMessage').value
        };

        // Sanitize inputs
        applicationData.name = utils.sanitizeInput(applicationData.name);
        applicationData.phone = utils.sanitizeInput(applicationData.phone);
        applicationData.email = utils.sanitizeInput(applicationData.email).toLowerCase();
        applicationData.message = applicationData.message ? utils.sanitizeInput(applicationData.message) : '';

        // Validate form
        if (!validateForm(applicationData)) {
            toastUtils.showError('Please fix the form errors before submitting.');
            return;
        }

        // Show loading state
        utils.showLoading();

        try {
            console.log('Submitting application:', applicationData);

            // Send data to backend
            const response = await fetch(`${utils.getApiBaseUrl()}/applications/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData)
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (result.success) {
                // Show success message with application ID
                utils.showSuccess(result.data?.applicationId);

                // Show success toast
                toastUtils.showSuccess('Application submitted successfully! We will contact you soon.');

                // Reset form
                form.reset();

                // Close popup after 3 seconds
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                        document.head.removeChild(style);
                    }
                }, 3000);

            } else {
                // Handle backend validation errors
                if (result.errors && Array.isArray(result.errors)) {
                    result.errors.forEach(error => {
                        utils.showFieldError(error.field, error.message);
                    });
                    toastUtils.showError('Please fix the form errors and try again.');
                } else {
                    toastUtils.showError(result.message || 'Failed to submit application. Please try again.');
                }
                utils.hideLoading();
            }

        } catch (error) {
            console.error('Submission error:', error);
            toastUtils.showError('Network error. Please check your connection and try again.');
            utils.hideLoading();
        }
    });

    // Real-time validation
    const inputs = popup.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            const fieldName = this.id.replace('applicant', '')
                .replace('selected', '')
                .toLowerCase();
            const value = this.value;

            // Basic validation on blur
            switch (fieldName) {
                case 'name':
                    if (value && value.trim().length < 2) {
                        utils.showFieldError(fieldName, 'Name must be at least 2 characters long');
                    } else if (value && value.trim().length > 100) {
                        utils.showFieldError(fieldName, 'Name cannot exceed 100 characters');
                    } else {
                        utils.hideFieldError(fieldName);
                    }
                    break;
                case 'email':
                    if (value && !utils.validateEmail(value)) {
                        utils.showFieldError(fieldName, 'Please enter a valid email address');
                    } else {
                        utils.hideFieldError(fieldName);
                    }
                    break;
                case 'phone':
                    if (value && !utils.validatePhone(value)) {
                        utils.showFieldError(fieldName, 'Please enter a valid phone number');
                    } else {
                        utils.hideFieldError(fieldName);
                    }
                    break;
                case 'course':
                case 'studymode':
                    if (!value) {
                        utils.showFieldError(fieldName, 'This field is required');
                    } else {
                        utils.hideFieldError(fieldName);
                    }
                    break;
                case 'message':
                    if (value && value.length > 1000) {
                        utils.showFieldError(fieldName, 'Message cannot exceed 1000 characters');
                    } else {
                        utils.hideFieldError(fieldName);
                    }
                    break;
            }
        });

        // Clear error when user starts typing
        input.addEventListener('input', function () {
            const fieldName = this.id.replace('applicant', '')
                .replace('selected', '')
                .toLowerCase();
            utils.hideFieldError(fieldName);
        });
    });

    // Cancel button handler
    const cancelBtn = popup.querySelector('#cancelBtn');
    cancelBtn.addEventListener('click', function () {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
        }
    });

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
                document.head.removeChild(style);
            }
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
                document.head.removeChild(style);
            }
        }
    });

    // Focus on first input
    setTimeout(() => {
        const firstInput = popup.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

// Enhanced function to open application form with additional options
function openCourseApplication(courseName = '', studyMode = '') {
    createCoursePopupForm();

    // Pre-select course if provided
    setTimeout(() => {
        if (courseName) {
            const courseSelect = document.getElementById('selectedCourse');
            if (courseSelect) {
                const courseValue = courseName.toLowerCase().replace(/\s+/g, '');
                for (let option of courseSelect.options) {
                    if (option.value === courseValue) {
                        courseSelect.value = courseValue;
                        break;
                    }
                }
            }
        }

        // Pre-select study mode if provided
        if (studyMode) {
            const studyModeSelect = document.getElementById('studyMode');
            if (studyModeSelect) {
                studyModeSelect.value = studyMode.toLowerCase();
            }
        }
    }, 200);
}

// Auto-initialize if there are apply buttons on the page
document.addEventListener('DOMContentLoaded', function () {
    // Find all apply buttons and attach event listeners
    const applyButtons = document.querySelectorAll('[data-action="apply"], .apply-btn, .course-apply, button[onclick*="apply"], a[href*="apply"]');

    applyButtons.forEach(button => {
        // Remove any existing click listeners to prevent duplicates
        button.replaceWith(button.cloneNode(true));

        const newButton = document.querySelector(`[data-action="apply"], .apply-btn, .course-apply, button[onclick*="apply"], a[href*="apply"]`);

        newButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const courseName = this.getAttribute('data-course') ||
                this.closest('[data-course]')?.getAttribute('data-course') ||
                '';
            const studyMode = this.getAttribute('data-study-mode') || '';

            openCourseApplication(courseName, studyMode);
        });
    });

    // Also handle buttons with onclick attributes
    const buttonsWithOnclick = document.querySelectorAll('button[onclick], a[onclick]');
    buttonsWithOnclick.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('apply') || onclickAttr.includes('Application')) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                openCourseApplication();
            });
        }
    });
});

// Make functions globally available
window.createCoursePopupForm = createCoursePopupForm;
window.openCourseApplication = openCourseApplication;

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createCoursePopupForm, openCourseApplication };
}