// Authentication System - Complete Solution
class AuthSystem {
    constructor() {
        this.currentForm = 'login';
        this.otpSent = false;
        this.init();
    }

    init() {
        this.createAuthSystem();
        this.addDemoButton();
        this.bindGlobalEvents();
    }

    createAuthSystem() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        // Create main container
        this.container = document.createElement('div');
        this.container.style.cssText = `
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            width: 420px;
            max-width: 95vw;
            max-height: 95vh;
            overflow-y: auto;
            position: relative;
        `;

        // Create close button
        this.closeButton = document.createElement('button');
        this.closeButton.innerHTML = '×';
        this.closeButton.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #666;
            z-index: 100;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        `;
        this.closeButton.onmouseenter = () => {
            this.closeButton.style.background = '#f5f5f5';
            this.closeButton.style.color = '#333';
        };
        this.closeButton.onmouseleave = () => {
            this.closeButton.style.background = 'none';
            this.closeButton.style.color = '#666';
        };
        this.closeButton.onclick = () => this.close();

        // Create form wrapper
        this.formWrapper = document.createElement('div');
        this.formWrapper.style.cssText = `
            padding: 40px;
        `;

        // Create all forms
        this.createLoginForm();
        this.createSignupForm();
        this.createForgotPasswordForm();

        // Assemble container
        this.container.appendChild(this.closeButton);
        this.container.appendChild(this.formWrapper);
        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);

        // Show login form by default
        this.showForm('login');
    }

    createLoginForm() {
        const form = document.createElement('form');
        form.id = 'login-form';
        form.className = 'auth-form';
        form.innerHTML = this.getLoginFormHTML();
        form.onsubmit = (e) => this.handleLogin(e);
        
        this.formWrapper.appendChild(form);
        this.bindLoginEvents();
    }

    createSignupForm() {
        const form = document.createElement('form');
        form.id = 'signup-form';
        form.className = 'auth-form';
        form.style.display = 'none';
        form.innerHTML = this.getSignupFormHTML();
        form.onsubmit = (e) => this.handleSignup(e);
        
        this.formWrapper.appendChild(form);
        this.bindSignupEvents();
    }

    createForgotPasswordForm() {
        const form = document.createElement('form');
        form.id = 'forgot-password-form';
        form.className = 'auth-form';
        form.style.display = 'none';
        form.innerHTML = this.getForgotPasswordFormHTML();
        form.onsubmit = (e) => this.handlePasswordReset(e);
        
        this.formWrapper.appendChild(form);
        this.bindForgotPasswordEvents();
    }

    getLoginFormHTML() {
        return `
            <h2 style="text-align: center; color: #333; margin-bottom: 30px; font-weight: 300;">Welcome Back</h2>
            
            <div class="form-group">
                <label for="login-email" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Email Address</label>
                <input type="email" id="login-email" required 
                    style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                    placeholder="Enter your email">
            </div>

            <div class="form-group" style="position: relative;">
                <label for="login-password" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Password</label>
                <input type="password" id="login-password" required 
                    style="width: 100%; padding: 12px 45px 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                    placeholder="Enter your password">
                <button type="button" id="login-password-toggle" 
                    style="position: absolute; right: 12px; top: 38px; background: none; border: none; cursor: pointer; font-size: 16px; color: #666;">👁️</button>
            </div>

            <div style="text-align: right; margin: -5px 0 20px 0;">
                <a href="#" id="forgot-password-link" 
                    style="color: #007bff; text-decoration: none; font-size: 14px;">Forgot Password?</a>
            </div>

            <div id="login-messages" style="min-height: 50px; margin-bottom: 15px;">
                <div id="login-error" class="message error" style="display: none;"></div>
                <div id="login-success" class="message success" style="display: none;"></div>
            </div>

            <button type="submit" class="form-button" 
                style="width: 100%; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                Login
            </button>

            <div style="text-align: center; margin-top: 25px; color: #666; font-size: 14px;">
                Don't have an account? 
                <a href="#" id="show-signup" style="color: #007bff; text-decoration: none; font-weight: 600;">Sign Up</a>
            </div>
        `;
    }

    getSignupFormHTML() {
        return `
            <h2 style="text-align: center; color: #333; margin-bottom: 25px; font-weight: 300;">Create Account</h2>
            
            <div class="form-group">
                <label for="signup-name" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Full Name</label>
                <input type="text" id="signup-name" required 
                    style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                    placeholder="Enter your full name">
            </div>

            <div class="form-group">
                <label for="signup-email" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Email Address</label>
                <input type="email" id="signup-email" required 
                    style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                    placeholder="Enter your email">
            </div>

            <div class="form-group">
                <label for="signup-phone" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Phone Number</label>
                <input type="tel" id="signup-phone" 
                    style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                    placeholder="Enter your phone number">
            </div>

            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Experience Level</label>
                <div class="radio-group" style="display: flex; flex-direction: column; gap: 8px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="radio" name="experience" value="tech" id="exp-tech">
                        <span>Technical</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="radio" name="experience" value="nontech" id="exp-nontech">
                        <span>Non-technical</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="radio" name="experience" value="student" id="exp-student">
                        <span>Final Year Student</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="radio" name="experience" value="intern" id="exp-intern">
                        <span>Internship</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="radio" name="experience" value="others" id="exp-others">
                        <span>Others</span>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="additional-info" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Additional Information</label>
                <textarea id="additional-info" rows="3" 
                    style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; resize: vertical; box-sizing: border-box; font-family: inherit;"
                    placeholder="Tell us about yourself..."></textarea>
            </div>

            <div class="form-group" style="position: relative;">
                <label for="signup-password" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Password</label>
                <input type="password" id="signup-password" required 
                    style="width: 100%; padding: 12px 45px 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                    placeholder="Create password">
                <button type="button" id="signup-password-toggle" 
                    style="position: absolute; right: 12px; top: 38px; background: none; border: none; cursor: pointer; font-size: 16px; color: #666;">👁️</button>
            </div>

            <div class="form-group" style="position: relative;">
                <label for="signup-confirm-password" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Confirm Password</label>
                <input type="password" id="signup-confirm-password" required 
                    style="width: 100%; padding: 12px 45px 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                    placeholder="Confirm password">
                <button type="button" id="signup-confirm-password-toggle" 
                    style="position: absolute; right: 12px; top: 38px; background: none; border: none; cursor: pointer; font-size: 16px; color: #666;">👁️</button>
            </div>

            <div id="signup-messages" style="min-height: 50px; margin-bottom: 15px;">
                <div id="signup-error" class="message error" style="display: none;"></div>
                <div id="signup-success" class="message success" style="display: none;"></div>
            </div>

            <button type="submit" class="form-button" 
                style="width: 100%; padding: 14px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                Create Account
            </button>

            <div style="text-align: center; margin-top: 25px; color: #666; font-size: 14px;">
                Already have an account? 
                <a href="#" id="show-login" style="color: #007bff; text-decoration: none; font-weight: 600;">Login</a>
            </div>
        `;
    }

    getForgotPasswordFormHTML() {
        return `
            <h2 style="text-align: center; color: #333; margin-bottom: 25px; font-weight: 300;">Reset Password</h2>
            
            <div id="forgot-step-1">
                <div class="form-group">
                    <label for="forgot-email" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Email Address</label>
                    <input type="email" id="forgot-email" required 
                        style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                        placeholder="Enter your email">
                </div>

                <button type="button" id="send-otp-btn" 
                    style="width: 100%; padding: 14px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-bottom: 20px;">
                    Send OTP
                </button>
            </div>

            <div id="forgot-step-2" style="display: none;">
                <div class="form-group">
                    <label for="forgot-otp" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Enter OTP</label>
                    <input type="text" id="forgot-otp" required 
                        style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                        placeholder="Enter 6-digit OTP" maxlength="6">
                </div>

                <div class="form-group" style="position: relative;">
                    <label for="new-password" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">New Password</label>
                    <input type="password" id="new-password" required 
                        style="width: 100%; padding: 12px 45px 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                        placeholder="Enter new password">
                    <button type="button" id="new-password-toggle" 
                        style="position: absolute; right: 12px; top: 38px; background: none; border: none; cursor: pointer; font-size: 16px; color: #666;">👁️</button>
                </div>

                <div class="form-group" style="position: relative;">
                    <label for="confirm-new-password" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Confirm New Password</label>
                    <input type="password" id="confirm-new-password" required 
                        style="width: 100%; padding: 12px 45px 12px 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; box-sizing: border-box;"
                        placeholder="Confirm new password">
                    <button type="button" id="confirm-new-password-toggle" 
                        style="position: absolute; right: 12px; top: 38px; background: none; border: none; cursor: pointer; font-size: 16px; color: #666;">👁️</button>
                </div>

                <div id="forgot-messages" style="min-height: 50px; margin-bottom: 15px;">
                    <div id="forgot-error" class="message error" style="display: none;"></div>
                    <div id="forgot-success" class="message success" style="display: none;"></div>
                </div>

                <button type="submit" class="form-button" 
                    style="width: 100%; padding: 14px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                    Reset Password
                </button>
            </div>

            <div style="text-align: center; margin-top: 25px; color: #666; font-size: 14px;">
                Remember your password? 
                <a href="#" id="show-login-from-forgot" style="color: #007bff; text-decoration: none; font-weight: 600;">Back to Login</a>
            </div>
        `;
    }

    bindLoginEvents() {
        // Password toggle
        const toggleBtn = document.getElementById('login-password-toggle');
        const passwordInput = document.getElementById('login-password');
        toggleBtn.onclick = () => this.togglePasswordVisibility(passwordInput, toggleBtn);

        // Forgot password link
        document.getElementById('forgot-password-link').onclick = (e) => {
            e.preventDefault();
            this.showForm('forgot');
        };

        // Show signup link
        document.getElementById('show-signup').onclick = (e) => {
            e.preventDefault();
            this.showForm('signup');
        };

        // Input focus effects
        this.addInputFocusEffects('login-email', 'login-password');
    }

    bindSignupEvents() {
        // Password toggles
        const passwordToggle = document.getElementById('signup-password-toggle');
        const confirmToggle = document.getElementById('signup-confirm-password-toggle');
        const passwordInput = document.getElementById('signup-password');
        const confirmInput = document.getElementById('signup-confirm-password');

        passwordToggle.onclick = () => this.togglePasswordVisibility(passwordInput, passwordToggle);
        confirmToggle.onclick = () => this.togglePasswordVisibility(confirmInput, confirmToggle);

        // Show login link
        document.getElementById('show-login').onclick = (e) => {
            e.preventDefault();
            this.showForm('login');
        };

        // Input focus effects
        this.addInputFocusEffects('signup-name', 'signup-email', 'signup-phone', 'signup-password', 'signup-confirm-password', 'additional-info');
        
        // Radio button styling
        this.styleRadioButtons();
    }

    bindForgotPasswordEvents() {
        // Send OTP button
        document.getElementById('send-otp-btn').onclick = () => this.sendOTP();

        // Password toggles
        const newPasswordToggle = document.getElementById('new-password-toggle');
        const confirmNewToggle = document.getElementById('confirm-new-password-toggle');
        const newPasswordInput = document.getElementById('new-password');
        const confirmNewInput = document.getElementById('confirm-new-password');

        newPasswordToggle.onclick = () => this.togglePasswordVisibility(newPasswordInput, newPasswordToggle);
        confirmNewToggle.onclick = () => this.togglePasswordVisibility(confirmNewInput, confirmNewToggle);

        // Show login link
        document.getElementById('show-login-from-forgot').onclick = (e) => {
            e.preventDefault();
            this.showForm('login');
        };

        // Input focus effects
        this.addInputFocusEffects('forgot-email', 'forgot-otp', 'new-password', 'confirm-new-password');
    }

    addInputFocusEffects(...inputIds) {
        inputIds.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('focus', () => {
                    input.style.borderColor = '#007bff';
                    input.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
                });
                input.addEventListener('blur', () => {
                    input.style.borderColor = '#e1e5e9';
                    input.style.boxShadow = 'none';
                });
            }
        });
    }

    styleRadioButtons() {
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.style.margin = '0';
        });
    }

    togglePasswordVisibility(input, toggleBtn) {
        if (input.type === 'password') {
            input.type = 'text';
            toggleBtn.textContent = '🔒';
        } else {
            input.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    }

    showForm(formName) {
        // Hide all forms
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('forgot-password-form').style.display = 'none';

        // Clear messages
        this.clearAllMessages();

        // Show selected form
        document.getElementById(`${formName}-form`).style.display = 'block';
        this.currentForm = formName;

        // Reset forgot password flow if showing
        if (formName === 'forgot') {
            this.resetForgotPasswordFlow();
        }

        // Focus on first input
        this.focusFirstInput(formName);
    }

    focusFirstInput(formName) {
        const firstInputMap = {
            'login': 'login-email',
            'signup': 'signup-name',
            'forgot': 'forgot-email'
        };
        
        const firstInput = document.getElementById(firstInputMap[formName]);
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    resetForgotPasswordFlow() {
        this.otpSent = false;
        document.getElementById('forgot-step-1').style.display = 'block';
        document.getElementById('forgot-step-2').style.display = 'none';
    }

    // Form Handlers
    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        this.clearMessages('login');

        // Validation
        if (!email || !password) {
            this.showMessage('login', 'Please fill in all fields', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('login', 'Please enter a valid email address', 'error');
            return;
        }

        // Simulate API call
        this.showMessage('login', 'Logging in...', 'success');
        
        setTimeout(() => {
            // Demo credentials
            if (email === 'demo@example.com' && password === 'password') {
                this.showMessage('login', 'Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    this.close();
                    alert('Welcome! Login successful.');
                }, 1500);
            } else {
                this.showMessage('login', 'Invalid email or password', 'error');
            }
        }, 1000);
    }

    handleSignup(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('signup-name').value,
            email: document.getElementById('signup-email').value,
            phone: document.getElementById('signup-phone').value,
            experience: document.querySelector('input[name="experience"]:checked')?.value,
            additionalInfo: document.getElementById('additional-info').value,
            password: document.getElementById('signup-password').value,
            confirmPassword: document.getElementById('signup-confirm-password').value
        };

        this.clearMessages('signup');

        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            this.showMessage('signup', 'Please fill in all required fields', 'error');
            return;
        }

        if (!this.isValidEmail(formData.email)) {
            this.showMessage('signup', 'Please enter a valid email address', 'error');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            this.showMessage('signup', 'Passwords do not match', 'error');
            return;
        }

        if (formData.password.length < 6) {
            this.showMessage('signup', 'Password must be at least 6 characters long', 'error');
            return;
        }

        // Simulate API call
        this.showMessage('signup', 'Creating your account...', 'success');
        
        setTimeout(() => {
            this.showMessage('signup', 'Account created successfully! Welcome aboard!', 'success');
            setTimeout(() => {
                this.showForm('login');
            }, 2000);
        }, 1500);
    }

    sendOTP() {
        const email = document.getElementById('forgot-email').value;
        this.clearMessages('forgot');

        if (!email || !this.isValidEmail(email)) {
            this.showMessage('forgot', 'Please enter a valid email address', 'error');
            return;
        }

        // Simulate OTP sending
        this.showMessage('forgot', 'Sending OTP to your email...', 'success');
        
        setTimeout(() => {
            this.otpSent = true;
            document.getElementById('forgot-step-1').style.display = 'none';
            document.getElementById('forgot-step-2').style.display = 'block';
            this.showMessage('forgot', 'OTP sent successfully! Check your email.', 'success');
            setTimeout(() => this.clearMessages('forgot'), 3000);
        }, 1000);
    }

    handlePasswordReset(e) {
        e.preventDefault();
        
        if (!this.otpSent) {
            this.showMessage('forgot', 'Please request an OTP first', 'error');
            return;
        }

        const otp = document.getElementById('forgot-otp').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-new-password').value;

        this.clearMessages('forgot');

        // Validation
        if (!otp || !newPassword || !confirmPassword) {
            this.showMessage('forgot', 'Please fill in all fields', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showMessage('forgot', 'Passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 6) {
            this.showMessage('forgot', 'Password must be at least 6 characters long', 'error');
            return;
        }

        if (otp !== '123456') { // Demo OTP
            this.showMessage('forgot', 'Invalid OTP. Please try again.', 'error');
            return;
        }

        // Simulate password reset
        this.showMessage('forgot', 'Resetting your password...', 'success');
        
        setTimeout(() => {
            this.showMessage('forgot', 'Password reset successfully! You can now login with your new password.', 'success');
            setTimeout(() => {
                this.showForm('login');
            }, 2000);
        }, 1500);
    }

    // Utility Methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(form, message, type) {
        const element = document.getElementById(`${form}-${type}`);
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
            element.style.animation = 'fadeIn 0.3s ease-in';
        }
    }

    clearMessages(form) {
        const errorElement = document.getElementById(`${form}-error`);
        const successElement = document.getElementById(`${form}-success`);
        
        if (errorElement) errorElement.style.display = 'none';
        if (successElement) successElement.style.display = 'none';
    }

    clearAllMessages() {
        this.clearMessages('login');
        this.clearMessages('signup');
        this.clearMessages('forgot');
    }

    // Public Methods
    open(form = 'login') {
        this.overlay.style.display = 'flex';
        this.showForm(form);
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.clearAllMessages();
        this.resetForgotPasswordFlow();
    }

    bindGlobalEvents() {
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.style.display === 'flex') {
                this.close();
            }
        });

        // Click outside to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    addDemoButton() {
        const demoButton = document.createElement('button');
        demoButton.textContent = '🔐 Open Auth System';
        demoButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            z-index: 9999;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
        `;
        demoButton.onmouseenter = () => {
            demoButton.style.transform = 'translateY(-2px)';
            demoButton.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        };
        demoButton.onmouseleave = () => {
            demoButton.style.transform = 'translateY(0)';
            demoButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        };
        demoButton.onclick = () => this.open('login');
        
        document.body.appendChild(demoButton);
    }
}

// Initialize the auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.authSystem = new AuthSystem();
});

// Add some basic animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .message {
        padding: 12px;
        border-radius: 6px;
        margin: 10px 0;
        font-size: 14px;
        animation: fadeIn 0.3s ease-in;
    }
    
    .error {
        background: #fee;
        border: 1px solid #f5c6cb;
        color: #721c24;
    }
    
    .success {
        background: #efe;
        border: 1px solid #c3e6cb;
        color: #155724;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    
    .form-button:active {
        transform: translateY(0);
    }
    
    input:focus, textarea:focus {
        outline: none;
    }
`;
document.head.appendChild(style);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}