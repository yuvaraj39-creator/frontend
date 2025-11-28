// Lobby Login System with API Integration - Updated UI like Apply.js (Registration Only)
class LobbyLoginSystem {
    constructor() {
        this.API_BASE_URL = window.AppConfig?.API_BASE_URL || "http://localhost:3000";
        this.init();
    }

    init() {
        // Add styles to head
        this.addStyles();
        
        // Check if user is already logged in
        this.checkExistingLogin();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .lobby-overlay {
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
            }
            
            .lobby-popup {
                background: white;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                width: 95%;
                max-width: 420px;
                max-height: 95vh;
                overflow: hidden;
                margin: 20px;
                animation: fadeIn 0.3s ease-in;
            }
            
            .lobby-header {
                background: #800020;
                color: white;
                padding: 12px 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .lobby-logo {
                width: 20px;
                height: 20px;
            }
            
            .lobby-title {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 600;
            }
            
            .lobby-content {
                padding: 15px;
                max-height: calc(95vh - 120px);
                overflow-y: auto;
            }
            
            .lobby-form-group {
                margin-bottom: 12px;
            }
            
            .lobby-label {
                display: block;
                margin-bottom: 4px;
                font-weight: 500;
                color: #333;
                font-size: 0.85rem;
            }
            
            .lobby-input {
                width: 100%;
                padding: 8px 10px;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                font-size: 0.85rem;
                transition: border-color 0.3s;
                box-sizing: border-box;
            }
            
            .lobby-input:focus {
                outline: none;
                border-color: #800020 !important;
            }
            
            .lobby-input.error {
                border-color: #dc2626 !important;
            }
            
            .lobby-error-message {
                color: #dc2626;
                font-size: 0.75rem;
                margin-top: 4px;
                display: none;
            }
            
            .lobby-submit-btn {
                padding: 8px 16px;
                background: #800020;
                color: white;
                border: none;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: background 0.3s;
                font-size: 0.85rem;
                width: 100%;
            }
            
            .lobby-submit-btn:hover:not(:disabled) {
                background: #600018 !important;
            }
            
            .lobby-submit-btn:disabled {
                background: #9ca3af !important;
                cursor: not-allowed !important;
            }
            
            .lobby-cancel-btn {
                padding: 8px 16px;
                border: 1px solid #d1d5db;
                background: white;
                color: #374151;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 0.85rem;
            }
            
            .lobby-cancel-btn:hover {
                background: #f3f4f6 !important;
            }
            
            .lobby-loading {
                display: none;
                text-align: center;
                margin: 10px 0;
            }
            
            .lobby-spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid #f3f3f3;
                border-top: 2px solid #800020;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-right: 8px;
            }
            
            .lobby-loading-text {
                font-size: 0.85rem;
                color: #666;
            }
            
            .lobby-success-message {
                display: none;
                text-align: center;
                margin: 10px 0;
                padding: 10px;
                background: #d1fae5;
                color: #065f46;
                border-radius: 6px;
                font-size: 0.85rem;
            }
            
            .lobby-error-message-global {
                display: none;
                text-align: center;
                margin: 10px 0;
                padding: 10px;
                background: #fee2e2;
                color: #dc2626;
                border-radius: 6px;
                font-size: 0.85rem;
            }
            
            .lobby-buttons {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-top: 15px;
            }
            
            .lobby-form-content {
                max-height: calc(95vh - 120px);
                overflow-y: auto;
            }
            
            /* Custom scrollbar */
            .lobby-form-content::-webkit-scrollbar {
                width: 6px;
            }
            
            .lobby-form-content::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
            }
            
            .lobby-form-content::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 3px;
            }
            
            .lobby-form-content::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
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
    }

    checkExistingLogin() {
        const token = localStorage.getItem('lobbyToken');
        if (token) {
            this.validateToken(token);
        }
    }

    async validateToken(token) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/lobby/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                console.log('User already logged in');
            } else {
                localStorage.removeItem('lobbyToken');
                localStorage.removeItem('lobbyUser');
            }
        } catch (error) {
            console.error('Token validation error:', error);
            localStorage.removeItem('lobbyToken');
            localStorage.removeItem('lobbyUser');
        }
    }

    // Toast Notification System
    createToast(message, type = 'info') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'ℹ️';
        switch (type) {
            case 'success':
                icon = '✓';
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

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            this.removeToast(toast);
        }, 5000);

        return toast;
    }

    removeToast(toast) {
        toast.classList.remove('show');
        toast.classList.add('hide');

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    showSuccessToast(message) {
        return this.createToast(message, 'success');
    }

    showErrorToast(message) {
        return this.createToast(message, 'error');
    }

    openLobbyRegister() {
        const existingOverlay = document.querySelector('.lobby-overlay');
        if (existingOverlay) {
            document.body.removeChild(existingOverlay);
        }

        const overlay = document.createElement('div');
        overlay.className = 'lobby-overlay';
        overlay.innerHTML = this.getPopupHTML();

        document.body.appendChild(overlay);
        this.attachEventListeners();
    }

    getPopupHTML() {
        const logoUrl = document.querySelector('header img[src*="favicon"]')?.src || 'img/favicon-32x32.png';

        return `
            <div class="lobby-popup">
                <div class="lobby-header">
                    <img src="${logoUrl}" alt="Logo" class="lobby-logo">
                    <h2 class="lobby-title">Create Account</h2>
                </div>
                
                <div class="lobby-content">
                    <div class="lobby-form-content">
                        <form id="lobbyForm">
                            <div class="lobby-form-group">
                                <label class="lobby-label" for="lb_name">Full Name *</label>
                                <input type="text" id="lb_name" class="lobby-input" placeholder="Enter your full name" required>
                                <div class="lobby-error-message" data-field="name"></div>
                            </div>
                            
                            <div class="lobby-form-group">
                                <label class="lobby-label" for="lb_email">Email Address *</label>
                                <input type="email" id="lb_email" class="lobby-input" placeholder="Enter your email" required>
                                <div class="lobby-error-message" data-field="email"></div>
                            </div>
                            
                            <div class="lobby-form-group">
                                <label class="lobby-label" for="lb_phone">Phone Number *</label>
                                <input type="text" id="lb_phone" class="lobby-input" maxlength="10" 
                                       placeholder="Enter 10-digit phone number" 
                                       oninput="this.value=this.value.replace(/[^0-9]/g,'')" required>
                                <div class="lobby-error-message" data-field="phone"></div>
                            </div>
                            
                            <div class="lobby-form-group">
                                <label class="lobby-label" for="lb_pass">Password *</label>
                                <input type="password" id="lb_pass" class="lobby-input" placeholder="Create a password (min. 6 characters)" required>
                                <div class="lobby-error-message" data-field="password"></div>
                            </div>
                            
                            <div class="lobby-form-group">
                                <label class="lobby-label" for="lb_cpass">Confirm Password *</label>
                                <input type="password" id="lb_cpass" class="lobby-input" placeholder="Confirm your password" required>
                                <div class="lobby-error-message" data-field="confirmPassword"></div>
                            </div>
                            
                            <div id="lobbyLoading" class="lobby-loading">
                                <div class="lobby-spinner"></div>
                                <span class="lobby-loading-text">Creating Account...</span>
                            </div>

                            <div id="lobbySuccess" class="lobby-success-message">
                                <div style="font-weight: 600; margin-bottom: 5px;">Registration Successful!</div>
                                <div style="font-size: 0.8rem;">Welcome to our community!</div>
                            </div>

                            <div id="lobbyError" class="lobby-error-message-global"></div>
                            
                            <div class="lobby-buttons">
                                <button type="button" id="lobbyCancelBtn" class="lobby-cancel-btn">Cancel</button>
                                <button type="submit" id="lobbySubmitBtn" class="lobby-submit-btn">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const form = document.getElementById('lobbyForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleRegister(e));
        }

        const cancelBtn = document.getElementById('lobbyCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closePopup());
        }

        // Close on overlay click
        const overlay = document.querySelector('.lobby-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closePopup();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePopup();
            }
        });

        // Real-time validation
        this.attachRealTimeValidation();
    }

    attachRealTimeValidation() {
        const inputs = document.querySelectorAll('.lobby-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.hideFieldError(input);
            });
        });
    }

    validateField(input) {
        const fieldName = input.id.replace('lb_', '');
        const value = input.value.trim();

        switch (fieldName) {
            case 'name':
                if (value && value.length < 2) {
                    this.showFieldError('name', 'Name must be at least 2 characters long');
                } else if (value && value.length > 100) {
                    this.showFieldError('name', 'Name cannot exceed 100 characters');
                } else {
                    this.hideFieldError('name');
                }
                break;
            case 'email':
                if (value && !this.validateEmail(value)) {
                    this.showFieldError('email', 'Please enter a valid email address');
                } else {
                    this.hideFieldError('email');
                }
                break;
            case 'phone':
                if (value && value.length !== 10) {
                    this.showFieldError('phone', 'Phone number must be exactly 10 digits');
                } else {
                    this.hideFieldError('phone');
                }
                break;
            case 'pass':
                if (value && value.length < 6) {
                    this.showFieldError('password', 'Password must be at least 6 characters long');
                } else {
                    this.hideFieldError('password');
                }
                break;
            case 'cpass':
                const password = document.getElementById('lb_pass').value.trim();
                if (value && value !== password) {
                    this.showFieldError('confirmPassword', 'Passwords do not match');
                } else {
                    this.hideFieldError('confirmPassword');
                }
                break;
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(fieldName, message) {
        const errorElement = document.querySelector(`.lobby-error-message[data-field="${fieldName}"]`);
        const inputElement = document.getElementById(`lb_${fieldName}`);

        if (errorElement && inputElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.classList.add('error');
        }
    }

    hideFieldError(fieldName) {
        const errorElement = document.querySelector(`.lobby-error-message[data-field="${fieldName}"]`);
        const inputElement = document.getElementById(`lb_${fieldName}`);

        if (errorElement && inputElement) {
            errorElement.style.display = 'none';
            inputElement.classList.remove('error');
        }
    }

    clearAllErrors() {
        const errorElements = document.querySelectorAll('.lobby-error-message');
        const inputElements = document.querySelectorAll('.lobby-input');

        errorElements.forEach(element => {
            element.style.display = 'none';
        });

        inputElements.forEach(element => {
            element.classList.remove('error');
        });

        const globalError = document.getElementById('lobbyError');
        if (globalError) {
            globalError.style.display = 'none';
        }
    }

    showLoading() {
        const loadingElement = document.getElementById('lobbyLoading');
        const submitBtn = document.getElementById('lobbySubmitBtn');
        const successElement = document.getElementById('lobbySuccess');
        const errorElement = document.getElementById('lobbyError');

        if (loadingElement) loadingElement.style.display = 'block';
        if (submitBtn) submitBtn.disabled = true;
        if (successElement) successElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
    }

    hideLoading() {
        const loadingElement = document.getElementById('lobbyLoading');
        const submitBtn = document.getElementById('lobbySubmitBtn');

        if (loadingElement) loadingElement.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;
    }

    showSuccess(message = '') {
        const successElement = document.getElementById('lobbySuccess');
        const errorElement = document.getElementById('lobbyError');

        if (successElement) {
            if (message) {
                successElement.innerHTML = message;
            }
            successElement.style.display = 'block';
        }
        if (errorElement) errorElement.style.display = 'none';
    }

    showError(message) {
        const errorElement = document.getElementById('lobbyError');
        const successElement = document.getElementById('lobbySuccess');

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        if (successElement) successElement.style.display = 'none';
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('lb_name').value.trim();
        const email = document.getElementById('lb_email').value.trim();
        const phone = document.getElementById('lb_phone').value.trim();
        const pass = document.getElementById('lb_pass').value.trim();
        const cpass = document.getElementById('lb_cpass').value.trim();

        // Clear previous errors
        this.clearAllErrors();

        // Validation
        if (!name || !email || !phone || !pass || !cpass) {
            this.showError('All fields are required');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            return;
        }

        if (phone.length !== 10) {
            this.showFieldError('phone', 'Phone number must be exactly 10 digits');
            return;
        }

        if (pass.length < 6) {
            this.showFieldError('password', 'Password must be at least 6 characters long');
            return;
        }

        if (pass !== cpass) {
            this.showFieldError('confirmPassword', 'Passwords do not match');
            return;
        }

        // Show loading
        this.showLoading();

        try {
            const response = await fetch(`${this.API_BASE_URL}/api/lobby/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password: pass })
            });

            const data = await response.json();

            if (data.success) {
                this.showSuccess(`
                    <div style="font-weight: 600; margin-bottom: 5px;">Registration Successful!</div>
                    <div style="font-size: 0.8rem;">${data.message}</div>
                `);
                
                // Store token and user data
                localStorage.setItem('lobbyToken', data.data.token);
                localStorage.setItem('lobbyUser', JSON.stringify(data.data.user));
                
                this.showSuccessToast('Account created successfully! Welcome to our community.');
                
                // Close after success
                setTimeout(() => {
                    this.closePopup();
                }, 2000);
            } else {
                if (data.errors && Array.isArray(data.errors)) {
                    data.errors.forEach(error => {
                        this.showFieldError(error.field, error.message);
                    });
                    this.showError('Please fix the form errors and try again.');
                } else {
                    this.showError(data.message || 'Registration failed');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showError('Network error. Please try again.');
            this.showErrorToast('Network error. Please check your connection.');
        } finally {
            this.hideLoading();
        }
    }

    closePopup() {
        const overlay = document.querySelector('.lobby-overlay');
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }

    // Method to check if user is logged in
    isLoggedIn() {
        return !!localStorage.getItem('lobbyToken');
    }

    // Method to get current user
    getCurrentUser() {
        const user = localStorage.getItem('lobbyUser');
        return user ? JSON.parse(user) : null;
    }

    // Method to logout
    logout() {
        localStorage.removeItem('lobbyToken');
        localStorage.removeItem('lobbyUser');
        window.location.reload();
    }
}

// Initialize the lobby system
const lobbySystem = new LobbyLoginSystem();

// Global function to open lobby register
function openLobbyRegister() {
    lobbySystem.openLobbyRegister();
}