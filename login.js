function createAuthSystem() {
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
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    // Create popup container
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        width: 95%;
        max-width: 450px;
        max-height: 90vh;
        overflow: hidden;
        margin: 20px;
        position: relative;
    `;

    // Color variables
    const primary = '#800020';
    const primaryDark = '#600018';
    const primaryLight = '#a0334d';
    const white = '#ffffff';
    const gray50 = '#f9fafb';
    const gray100 = '#f3f4f6';
    const gray200 = '#e5e7eb';
    const gray300 = '#d1d5db';
    const gray400 = '#9ca3af';
    const gray500 = '#6b7280';
    const gray600 = '#4b5563';
    const gray700 = '#374151';
    const gray800 = '#1f2937';
    const gray900 = '#111827';

    // Get logo from existing HTML
    const logoUrl = document.querySelector('header img[src*="favicon"]')?.src || 'img/favicon-32x32.png';

    // API Base URL - Use config from config.js
    const API_BASE_URL = window.AppConfig.API_BASE_URL;


    // Current form state
    let currentForm = 'login';
    let forgotPasswordEmail = '';
    let verifiedOtp = '';

    // Form templates
    const formTemplates = {
        login: `
            <div style="padding: 0;">
                <!-- Header with Logo -->
                <div style="background: ${primary}; color: ${white}; padding: 20px; text-align: center; border-bottom: 1px solid ${primaryDark};">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
                        <img src="${logoUrl}" alt="Logo" style="width: 32px; height: 32px; border-radius: 6px;">
                        <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700;">Sign In</h2>
                    </div>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Access your account to continue</p>
                </div>

                <!-- Form -->
                <div style="padding: 25px; max-height: calc(90vh - 140px); overflow-y: auto;">
                    <form id="loginForm">
                        <div style="margin-bottom: 18px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Email Address *</label>
                            <input type="email" id="loginEmail" required 
                                style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box;"
                                placeholder="Enter your email address">
                            <div class="error-message" data-field="loginEmail" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Password *</label>
                            <div style="position: relative;">
                                <input type="password" id="loginPassword" required 
                                    style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box; padding-right: 45px;"
                                    placeholder="Enter your password">
                                <button type="button" class="toggle-password" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: ${gray500}; padding: 4px; border-radius: 4px;">
                                    👁️
                                </button>
                            </div>
                            <div class="error-message" data-field="loginPassword" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                <input type="checkbox" id="rememberMe" style="width: 16px; height: 16px;">
                                <span style="font-size: 0.85rem; color: ${gray600};">Remember me</span>
                            </label>
                            <button type="button" id="forgotPasswordBtn" 
                                style="background: none; border: none; color: ${primary}; cursor: pointer; font-size: 0.85rem; font-weight: 600; padding: 0; text-decoration: none;">
                                Forgot Password?
                            </button>
                        </div>

                        <!-- Loading Spinner -->
                        <div id="loginLoadingSpinner" style="display: none; text-align: center; margin: 15px 0;">
                            <div style="display: inline-block; width: 20px; height: 20px; border: 3px solid ${gray200}; border-top: 3px solid ${primary}; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                            <span style="margin-left: 10px; font-size: 0.9rem; color: ${gray600}; font-weight: 500;">Signing in...</span>
                        </div>

                        <!-- Messages -->
                        <div id="loginErrorMessage" style="display: none; text-align: center; margin: 15px 0; padding: 12px; background: #fee2e2; color: #dc2626; border-radius: 8px; font-size: 0.85rem; border: 1px solid #fecaca;"></div>

                        <button type="submit" id="loginSubmitBtn"
                            style="width: 100%; padding: 14px; background: ${primary}; color: ${white}; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-bottom: 20px; letter-spacing: 0.5px;">
                            Sign In
                        </button>

                        <div style="text-align: center; padding-top: 20px; border-top: 1px solid ${gray200};">
                            <span style="color: ${gray600}; font-size: 0.9rem;">Don't have an account? </span>
                            <button type="button" id="switchToRegister" 
                                style="background: none; border: none; color: ${primary}; cursor: pointer; font-size: 0.9rem; font-weight: 700; padding: 0; margin-left: 5px;">
                                Sign Up Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,

        register: `
            <div style="padding: 0;">
                <!-- Header with Logo -->
                <div style="background: ${primary}; color: ${white}; padding: 20px; text-align: center; border-bottom: 1px solid ${primaryDark};">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
                        <img src="${logoUrl}" alt="Logo" style="width: 32px; height: 32px; border-radius: 6px;">
                        <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700;">Create Account</h2>
                    </div>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Join us and start your learning journey</p>
                </div>

                <!-- Form -->
                <div style="padding: 25px; max-height: calc(90vh - 140px); overflow-y: auto;">
                    <form id="registerForm">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Full Name *</label>
                            <input type="text" id="registerName" required 
                                style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box;"
                                placeholder="Enter your full name">
                            <div class="error-message" data-field="registerName" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Email Address *</label>
                            <input type="email" id="registerEmail" required 
                                style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box;"
                                placeholder="Enter your email address">
                            <div class="error-message" data-field="registerEmail" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Phone Number *</label>
                            <input type="tel" id="registerPhone" required 
                                style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box;"
                                placeholder="Enter 10-digit phone number"
                                maxlength="10"
                                pattern="[0-9]{10}"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10)">
                            <div class="error-message" data-field="registerPhone" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Experience Level *</label>
                            <select id="registerExperience" required 
                                style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; background: ${white}; cursor: pointer; transition: all 0.3s; box-sizing: border-box; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg fill=\"${gray600}\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>'); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px;"
                                onchange="handleExperienceChange(this)">
                                <option value="">Select your experience level</option>
                                <option value="Working professional – Technical roles">Working professional – Technical roles</option>
                                <option value="Working professional – Non-technical">Working professional – Non-technical</option>
                                <option value="College student – Final year">College student – Final year</option>
                                <option value="Internship">Internship</option>
                                <option value="Others">Others</option>
                            </select>
                            <div class="error-message" data-field="registerExperience" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <div id="otherExperienceContainer" style="margin-bottom: 16px; display: none;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Please specify</label>
                            <input type="text" id="otherExperience" 
                                style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box;"
                                placeholder="Enter your specific experience">
                            <div class="error-message" data-field="otherExperience" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Password *</label>
                            <div style="position: relative;">
                                <input type="password" id="registerPassword" required 
                                    style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box; padding-right: 45px;"
                                    placeholder="Create a strong password">
                                <button type="button" class="toggle-password" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: ${gray500}; padding: 4px; border-radius: 4px;">
                                    👁️
                                </button>
                            </div>
                            <div class="error-message" data-field="registerPassword" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Confirm Password *</label>
                            <div style="position: relative;">
                                <input type="password" id="registerConfirmPassword" required 
                                    style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box; padding-right: 45px;"
                                    placeholder="Confirm your password">
                                <button type="button" class="toggle-password" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: ${gray500}; padding: 4px; border-radius: 4px;">
                                    👁️
                                </button>
                            </div>
                            <div class="error-message" data-field="registerConfirmPassword" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <!-- Loading Spinner -->
                        <div id="registerLoadingSpinner" style="display: none; text-align: center; margin: 15px 0;">
                            <div style="display: inline-block; width: 20px; height: 20px; border: 3px solid ${gray200}; border-top: 3px solid ${primary}; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                            <span style="margin-left: 10px; font-size: 0.9rem; color: ${gray600}; font-weight: 500;">Creating account...</span>
                        </div>

                        <!-- Messages -->
                        <div id="registerErrorMessage" style="display: none; text-align: center; margin: 15px 0; padding: 12px; background: #fee2e2; color: #dc2626; border-radius: 8px; font-size: 0.85rem; border: 1px solid #fecaca;"></div>

                        <button type="submit" id="registerSubmitBtn"
                            style="width: 100%; padding: 14px; background: ${primary}; color: ${white}; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-bottom: 20px; letter-spacing: 0.5px;">
                            Create Account
                        </button>

                        <div style="text-align: center; padding-top: 20px; border-top: 1px solid ${gray200};">
                            <span style="color: ${gray600}; font-size: 0.9rem;">Already have an account? </span>
                            <button type="button" id="switchToLogin" 
                                style="background: none; border: none; color: ${primary}; cursor: pointer; font-size: 0.9rem; font-weight: 700; padding: 0; margin-left: 5px;">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,

        forgotPassword: `
            <div style="padding: 0;">
                <!-- Header with Logo -->
                <div style="background: ${primary}; color: ${white}; padding: 20px; text-align: center; border-bottom: 1px solid ${primaryDark};">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
                        <img src="${logoUrl}" alt="Logo" style="width: 32px; height: 32px; border-radius: 6px;">
                        <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700;">Reset Password</h2>
                    </div>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">We'll send you an OTP to reset your password</p>
                </div>

                <!-- Form -->
                <div style="padding: 25px; max-height: calc(90vh - 140px); overflow-y: auto;">
                    <form id="forgotPasswordForm">
                        <div style="margin-bottom: 25px;">
                            <p style="color: ${gray600}; font-size: 0.9rem; margin-bottom: 20px; text-align: center; line-height: 1.5;">
                                Enter your email address and we'll send you a One-Time Password (OTP) to reset your password.
                            </p>
                            
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Email Address *</label>
                            <input type="email" id="forgotPasswordEmail" required 
                                style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box;"
                                placeholder="Enter your registered email">
                            <div class="error-message" data-field="forgotPasswordEmail" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                        </div>

                        <!-- Loading Spinner -->
                        <div id="forgotPasswordLoadingSpinner" style="display: none; text-align: center; margin: 15px 0;">
                            <div style="display: inline-block; width: 20px; height: 20px; border: 3px solid ${gray200}; border-top: 3px solid ${primary}; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                            <span style="margin-left: 10px; font-size: 0.9rem; color: ${gray600}; font-weight: 500;">Sending OTP...</span>
                        </div>

                        <!-- Messages -->
                        <div id="forgotPasswordErrorMessage" style="display: none; text-align: center; margin: 15px 0; padding: 12px; background: #fee2e2; color: #dc2626; border-radius: 8px; font-size: 0.85rem; border: 1px solid #fecaca;"></div>

                        <button type="submit" id="sendOtpBtn"
                            style="width: 100%; padding: 14px; background: ${primary}; color: ${white}; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-bottom: 20px; letter-spacing: 0.5px;">
                            Send OTP
                        </button>

                        <div style="text-align: center;">
                            <button type="button" id="backToLogin" 
                                style="background: none; border: none; color: ${primary}; cursor: pointer; font-size: 0.9rem; font-weight: 700; padding: 0;">
                                ← Back to Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,

        verifyOtp: `
            <div style="padding: 0;">
                <!-- Header with Logo -->
                <div style="background: ${primary}; color: ${white}; padding: 20px; text-align: center; border-bottom: 1px solid ${primaryDark};">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
                        <img src="${logoUrl}" alt="Logo" style="width: 32px; height: 32px; border-radius: 6px;">
                        <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700;">Verify OTP</h2>
                    </div>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Enter the OTP sent to your email</p>
                </div>

                <!-- Form -->
                <div style="padding: 25px; max-height: calc(90vh - 140px); overflow-y: auto;">
                    <form id="verifyOtpForm">
                        <div style="margin-bottom: 25px;">
                            <p style="color: ${gray600}; font-size: 0.9rem; margin-bottom: 20px; text-align: center; line-height: 1.5;">
                                We've sent a 6-digit OTP to <strong>${forgotPasswordEmail}</strong>. Please enter it below to verify your identity.
                            </p>
                            
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">OTP Code *</label>
                            <input type="text" id="otpCode" required maxlength="6"
                                style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box; text-align: center; letter-spacing: 8px;"
                                placeholder="Enter 6-digit OTP"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6)">
                            <div class="error-message" data-field="otpCode" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                <span style="color: ${gray600}; font-size: 0.8rem;">Didn't receive OTP?</span>
                                <button type="button" id="resendOtpBtn" 
                                    style="background: none; border: none; color: ${primary}; cursor: pointer; font-size: 0.8rem; font-weight: 600; padding: 0; text-decoration: none;">
                                    Resend OTP
                                </button>
                            </div>
                        </div>

                        <!-- Loading Spinner -->
                        <div id="verifyOtpLoadingSpinner" style="display: none; text-align: center; margin: 15px 0;">
                            <div style="display: inline-block; width: 20px; height: 20px; border: 3px solid ${gray200}; border-top: 3px solid ${primary}; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                            <span style="margin-left: 10px; font-size: 0.9rem; color: ${gray600}; font-weight: 500;">Verifying OTP...</span>
                        </div>

                        <!-- Messages -->
                        <div id="verifyOtpErrorMessage" style="display: none; text-align: center; margin: 15px 0; padding: 12px; background: #fee2e2; color: #dc2626; border-radius: 8px; font-size: 0.85rem; border: 1px solid #fecaca;"></div>

                        <button type="submit" id="verifyOtpBtn"
                            style="width: 100%; padding: 14px; background: ${primary}; color: ${white}; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-bottom: 20px; letter-spacing: 0.5px;">
                            Verify OTP
                        </button>

                        <div style="text-align: center;">
                            <button type="button" id="backToForgotPassword" 
                                style="background: none; border: none; color: ${primary}; cursor: pointer; font-size: 0.9rem; font-weight: 700; padding: 0;">
                                ← Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,

        resetPassword: `
            <div style="padding: 0;">
                <!-- Header with Logo -->
                <div style="background: ${primary}; color: ${white}; padding: 20px; text-align: center; border-bottom: 1px solid ${primaryDark};">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
                        <img src="${logoUrl}" alt="Logo" style="width: 32px; height: 32px; border-radius: 6px;">
                        <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700;">Reset Password</h2>
                    </div>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Create your new password</p>
                </div>

                <!-- Form -->
                <div style="padding: 25px; max-height: calc(90vh - 140px); overflow-y: auto;">
                    <form id="resetPasswordForm">
                        <div style="margin-bottom: 25px;">
                            <p style="color: ${gray600}; font-size: 0.9rem; margin-bottom: 20px; text-align: center; line-height: 1.5;">
                                Please enter your new password below. Make sure it's strong and secure.
                            </p>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">New Password *</label>
                                <div style="position: relative;">
                                    <input type="password" id="newPassword" required 
                                        style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box; padding-right: 45px;"
                                        placeholder="Enter new password">
                                    <button type="button" class="toggle-password" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: ${gray500}; padding: 4px; border-radius: 4px;">
                                        👁️
                                    </button>
                                </div>
                                <div class="error-message" data-field="newPassword" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                            </div>

                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: ${gray700}; font-size: 0.9rem;">Confirm New Password *</label>
                                <div style="position: relative;">
                                    <input type="password" id="confirmNewPassword" required 
                                        style="width: 100%; padding: 12px 14px; border: 1px solid ${gray300}; border-radius: 8px; font-size: 0.9rem; transition: all 0.3s; box-sizing: border-box; padding-right: 45px;"
                                        placeholder="Confirm new password">
                                    <button type="button" class="toggle-password" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: ${gray500}; padding: 4px; border-radius: 4px;">
                                        👁️
                                    </button>
                                </div>
                                <div class="error-message" data-field="confirmNewPassword" style="color: #dc2626; font-size: 0.8rem; margin-top: 6px; display: none;"></div>
                            </div>
                        </div>

                        <!-- Loading Spinner -->
                        <div id="resetPasswordLoadingSpinner" style="display: none; text-align: center; margin: 15px 0;">
                            <div style="display: inline-block; width: 20px; height: 20px; border: 3px solid ${gray200}; border-top: 3px solid ${primary}; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                            <span style="margin-left: 10px; font-size: 0.9rem; color: ${gray600}; font-weight: 500;">Resetting password...</span>
                        </div>

                        <!-- Messages -->
                        <div id="resetPasswordErrorMessage" style="display: none; text-align: center; margin: 15px 0; padding: 12px; background: #fee2e2; color: #dc2626; border-radius: 8px; font-size: 0.85rem; border: 1px solid #fecaca;"></div>

                        <button type="submit" id="resetPasswordBtn"
                            style="width: 100%; padding: 14px; background: ${primary}; color: ${white}; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-bottom: 20px; letter-spacing: 0.5px;">
                            Reset Password
                        </button>

                        <div style="text-align: center;">
                            <button type="button" id="backToVerifyOtp" 
                                style="background: none; border: none; color: ${primary}; cursor: pointer; font-size: 0.9rem; font-weight: 700; padding: 0;">
                                ← Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `
    };

    // Add enhanced styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        input:focus, select:focus {
            outline: none;
            border-color: ${primary} !important;
            box-shadow: 0 0 0 3px ${primary}20 !important;
        }
        
        input.error, select.error {
            border-color: #dc2626 !important;
            box-shadow: 0 0 0 3px #dc262620 !important;
        }
        
        button[type="submit"]:hover:not(:disabled) {
            background: ${primaryDark} !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(128, 0, 32, 0.3) !important;
        }
        
        button[type="submit"]:disabled {
            background: ${gray400} !important;
            cursor: not-allowed !important;
            transform: none !important;
            box-shadow: none !important;
        }
        
        .fade-in {
            animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        /* Custom scrollbar for form area */
        .popup-form-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .popup-form-content::-webkit-scrollbar-track {
            background: ${gray100};
            border-radius: 4px;
        }
        
        .popup-form-content::-webkit-scrollbar-thumb {
            background: ${gray300};
            border-radius: 4px;
        }
        
        .popup-form-content::-webkit-scrollbar-thumb:hover {
            background: ${gray400};
        }
        
        /* Enhanced button styles */
        .auth-button {
            transition: all 0.3s ease !important;
        }
        
        .auth-button:hover {
            transform: translateY(-1px) !important;
        }
        
        /* Input animations */
        .form-input {
            transition: all 0.3s ease !important;
        }
        
        /* Close button */
        .close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s ease;
            z-index: 10;
        }
        
        .close-button:hover {
            background: rgba(255,255,255,0.3);
            transform: rotate(90deg);
        }

        /* Toast styles */
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            max-width: 400px;
        }

        .toast {
            background: white;
            border-radius: 8px;
            padding: 16px 20px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-left: 4px solid #3b82f6;
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s ease;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }

        .toast.hide {
            transform: translateX(400px);
            opacity: 0;
        }

        .toast.success {
            border-left-color: #10b981;
            background: #f0fdf4;
            color: #065f46;
        }

        .toast.error {
            border-left-color: #ef4444;
            background: #fef2f2;
            color: #dc2626;
        }

        .toast.info {
            border-left-color: #3b82f6;
            background: #eff6ff;
            color: #1e40af;
        }

        .toast.warning {
            border-left-color: #f59e0b;
            background: #fffbeb;
            color: #92400e;
        }

        /* Toggle password button */
        .toggle-password:hover {
            background: ${gray200} !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize with login form
    popup.innerHTML = formTemplates.login;

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '×';
    closeButton.addEventListener('click', closePopup);
    popup.appendChild(closeButton);

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Add scrollbar class to form content
    const formContent = popup.querySelector('div > div');
    if (formContent) {
        formContent.classList.add('popup-form-content');
    }

    // Add fade-in animation
    popup.classList.add('fade-in');

    // Toast Notification System
    const toastUtils = {
        createToast(message, type = 'info') {
            let toastContainer = document.querySelector('.toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.className = 'toast-container';
                document.body.appendChild(toastContainer);
            }

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;

            toast.innerHTML = `
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

        showInfo(message) {
            return this.createToast(message, 'info');
        },

        showWarning(message) {
            return this.createToast(message, 'warning');
        }
    };

    // Utility Functions
    const utils = {
        showFieldError(fieldId, message) {
            const errorElement = popup.querySelector(`.error-message[data-field="${fieldId}"]`);
            const inputElement = popup.querySelector(`#${fieldId}`);

            if (errorElement && inputElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                inputElement.classList.add('error');
            }
        },

        hideFieldError(fieldId) {
            const errorElement = popup.querySelector(`.error-message[data-field="${fieldId}"]`);
            const inputElement = popup.querySelector(`#${fieldId}`);

            if (errorElement && inputElement) {
                errorElement.style.display = 'none';
                inputElement.classList.remove('error');
            }
        },

        clearAllErrors() {
            const errorElements = popup.querySelectorAll('.error-message');
            const inputElements = popup.querySelectorAll('input, select');

            errorElements.forEach(element => {
                element.style.display = 'none';
            });

            inputElements.forEach(element => {
                element.classList.remove('error');
            });
        },

        showLoading(formType) {
            const spinner = popup.querySelector(`#${formType}LoadingSpinner`);
            const submitBtn = popup.querySelector(`#${formType}SubmitBtn`) ||
                popup.querySelector(`#${formType === 'forgotPassword' ? 'sendOtpBtn' :
                    formType === 'verifyOtp' ? 'verifyOtpBtn' :
                        formType === 'resetPassword' ? 'resetPasswordBtn' : 'submitBtn'}`);
            const errorMessage = popup.querySelector(`#${formType}ErrorMessage`);

            if (spinner) spinner.style.display = 'block';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = formType === 'login' ? 'Signing in...' :
                    formType === 'register' ? 'Creating account...' :
                        formType === 'forgotPassword' ? 'Sending OTP...' :
                            formType === 'verifyOtp' ? 'Verifying OTP...' :
                                formType === 'resetPassword' ? 'Resetting password...' : 'Processing...';
            }
            if (errorMessage) errorMessage.style.display = 'none';
        },

        hideLoading(formType) {
            const spinner = popup.querySelector(`#${formType}LoadingSpinner`);
            const submitBtn = popup.querySelector(`#${formType}SubmitBtn`) ||
                popup.querySelector(`#${formType === 'forgotPassword' ? 'sendOtpBtn' :
                    formType === 'verifyOtp' ? 'verifyOtpBtn' :
                        formType === 'resetPassword' ? 'resetPasswordBtn' : 'submitBtn'}`);

            if (spinner) spinner.style.display = 'none';
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = formType === 'login' ? 'Sign In' :
                    formType === 'register' ? 'Create Account' :
                        formType === 'forgotPassword' ? 'Send OTP' :
                            formType === 'verifyOtp' ? 'Verify OTP' :
                                formType === 'resetPassword' ? 'Reset Password' : 'Submit';
            }
        },

        showError(formType, message) {
            const errorMessage = popup.querySelector(`#${formType}ErrorMessage`);

            if (errorMessage) {
                errorMessage.textContent = message;
                errorMessage.style.display = 'block';
            }
        },

        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        validatePhone(phone) {
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);
        },

        validatePassword(password) {
            return password.length >= 6;
        },

        validateOtp(otp) {
            const otpRegex = /^\d{6}$/;
            return otpRegex.test(otp);
        }
    };

    // API Service Functions
    const apiService = {
        async makeRequest(url, options = {}) {
            try {
                console.log(`Making API request to: ${url}`);

                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                });

                console.log(`Response status: ${response.status} ${response.statusText}`);

                // Check if response is JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    // If not JSON, get text and create a proper error
                    const text = await response.text();
                    console.error('Non-JSON response:', text.substring(0, 200));

                    throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('API response data:', data);

                if (!response.ok) {
                    throw new Error(data.message || `HTTP error! status: ${response.status}`);
                }

                return data;
            } catch (error) {
                console.error('API request failed:', error);

                // Enhanced error messages
                if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                    throw new Error('Network error: Unable to connect to server. Please check your internet connection and try again.');
                }

                if (error.message.includes('non-JSON response')) {
                    throw new Error('Server error: Please try again later or contact support.');
                }

                throw error;
            }
        },

        async login(email, password) {
            return this.makeRequest(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
        },

        async register(userData) {
            return this.makeRequest(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        },

        async sendOtp(email) {
            return this.makeRequest(`${API_BASE_URL}/api/auth/send-otp`, {
                method: 'POST',
                body: JSON.stringify({ email, purpose: 'password_reset' })
            });
        },

        async verifyOtp(email, otp) {
            return this.makeRequest(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: 'POST',
                body: JSON.stringify({ email, otp, purpose: 'password_reset' })
            });
        },

        async resetPassword(email, otp, newPassword) {
            return this.makeRequest(`${API_BASE_URL}/api/auth/reset-password`, {
                method: 'POST',
                body: JSON.stringify({ email, otp, newPassword })
            });
        }
    };

    // Form switching functions
    function switchToLogin() {
        currentForm = 'login';
        popup.innerHTML = formTemplates.login;

        // Re-add close button
        const newCloseButton = document.createElement('button');
        newCloseButton.className = 'close-button';
        newCloseButton.innerHTML = '×';
        newCloseButton.addEventListener('click', closePopup);
        popup.appendChild(newCloseButton);

        popup.classList.add('fade-in');
        attachLoginEventListeners();

        // Add scrollbar class
        const formContent = popup.querySelector('div > div');
        if (formContent) {
            formContent.classList.add('popup-form-content');
        }

        // Focus on first input
        setTimeout(() => {
            const firstInput = popup.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    function switchToRegister() {
        currentForm = 'register';
        popup.innerHTML = formTemplates.register;

        // Re-add close button
        const newCloseButton = document.createElement('button');
        newCloseButton.className = 'close-button';
        newCloseButton.innerHTML = '×';
        newCloseButton.addEventListener('click', closePopup);
        popup.appendChild(newCloseButton);

        popup.classList.add('fade-in');
        attachRegisterEventListeners();

        // Add scrollbar class
        const formContent = popup.querySelector('div > div');
        if (formContent) {
            formContent.classList.add('popup-form-content');
        }

        // Focus on first input
        setTimeout(() => {
            const firstInput = popup.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    function switchToForgotPassword() {
        currentForm = 'forgotPassword';
        popup.innerHTML = formTemplates.forgotPassword;

        // Re-add close button
        const newCloseButton = document.createElement('button');
        newCloseButton.className = 'close-button';
        newCloseButton.innerHTML = '×';
        newCloseButton.addEventListener('click', closePopup);
        popup.appendChild(newCloseButton);

        popup.classList.add('fade-in');
        attachForgotPasswordEventListeners();

        // Add scrollbar class
        const formContent = popup.querySelector('div > div');
        if (formContent) {
            formContent.classList.add('popup-form-content');
        }

        // Focus on first input
        setTimeout(() => {
            const firstInput = popup.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    function switchToVerifyOtp(email) {
        forgotPasswordEmail = email;
        currentForm = 'verifyOtp';
        popup.innerHTML = formTemplates.verifyOtp;

        // Re-add close button
        const newCloseButton = document.createElement('button');
        newCloseButton.className = 'close-button';
        newCloseButton.innerHTML = '×';
        newCloseButton.addEventListener('click', closePopup);
        popup.appendChild(newCloseButton);

        popup.classList.add('fade-in');
        attachVerifyOtpEventListeners();

        // Add scrollbar class
        const formContent = popup.querySelector('div > div');
        if (formContent) {
            formContent.classList.add('popup-form-content');
        }

        // Focus on OTP input
        setTimeout(() => {
            const otpInput = popup.querySelector('#otpCode');
            if (otpInput) otpInput.focus();
        }, 100);
    }

    function switchToResetPassword() {
        currentForm = 'resetPassword';
        popup.innerHTML = formTemplates.resetPassword;

        // Re-add close button
        const newCloseButton = document.createElement('button');
        newCloseButton.className = 'close-button';
        newCloseButton.innerHTML = '×';
        newCloseButton.addEventListener('click', closePopup);
        popup.appendChild(newCloseButton);

        popup.classList.add('fade-in');
        attachResetPasswordEventListeners();

        // Add scrollbar class
        const formContent = popup.querySelector('div > div');
        if (formContent) {
            formContent.classList.add('popup-form-content');
        }

        // Focus on first input
        setTimeout(() => {
            const firstInput = popup.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    // Toggle password visibility
    function setupPasswordToggle() {
        const toggleButtons = popup.querySelectorAll('.toggle-password');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function () {
                const input = this.parentElement.querySelector('input');
                if (input.type === 'password') {
                    input.type = 'text';
                    this.textContent = '🙈';
                } else {
                    input.type = 'password';
                    this.textContent = '👁️';
                }
            });
        });
    }

    // Experience field handler
    window.handleExperienceChange = function (selectElement) {
        const otherContainer = document.getElementById('otherExperienceContainer');
        if (selectElement && otherContainer) {
            if (selectElement.value === 'Others') {
                otherContainer.style.display = 'block';
            } else {
                otherContainer.style.display = 'none';
            }
        }
    };

    // Phone number input handler - only allow numbers and limit to 10 digits
    window.handlePhoneInput = function (inputElement) {
        inputElement.value = inputElement.value.replace(/[^0-9]/g, '').slice(0, 10);
    };

    // Form validation functions
    function validateLoginForm(data) {
        let isValid = true;
        utils.clearAllErrors();

        if (!data.email.trim()) {
            utils.showFieldError('loginEmail', 'Email address is required');
            isValid = false;
        } else if (!utils.validateEmail(data.email)) {
            utils.showFieldError('loginEmail', 'Please enter a valid email address');
            isValid = false;
        }

        if (!data.password.trim()) {
            utils.showFieldError('loginPassword', 'Password is required');
            isValid = false;
        } else if (data.password.length < 6) {
            utils.showFieldError('loginPassword', 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    function validateRegisterForm(data) {
        let isValid = true;
        utils.clearAllErrors();

        if (!data.name.trim()) {
            utils.showFieldError('registerName', 'Full name is required');
            isValid = false;
        } else if (data.name.trim().length < 2) {
            utils.showFieldError('registerName', 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!data.email.trim()) {
            utils.showFieldError('registerEmail', 'Email address is required');
            isValid = false;
        } else if (!utils.validateEmail(data.email)) {
            utils.showFieldError('registerEmail', 'Please enter a valid email address');
            isValid = false;
        }

        if (!data.phone.trim()) {
            utils.showFieldError('registerPhone', 'Phone number is required');
            isValid = false;
        } else if (!utils.validatePhone(data.phone)) {
            utils.showFieldError('registerPhone', 'Please enter a valid 10-digit phone number');
            isValid = false;
        }

        if (!data.experience) {
            utils.showFieldError('registerExperience', 'Please select your experience level');
            isValid = false;
        } else if (data.experience === 'Others' && !data.otherExperience.trim()) {
            utils.showFieldError('otherExperience', 'Please specify your experience');
            isValid = false;
        }

        if (!data.password.trim()) {
            utils.showFieldError('registerPassword', 'Password is required');
            isValid = false;
        } else if (!utils.validatePassword(data.password)) {
            utils.showFieldError('registerPassword', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (!data.confirmPassword.trim()) {
            utils.showFieldError('registerConfirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (data.password !== data.confirmPassword) {
            utils.showFieldError('registerConfirmPassword', 'Passwords do not match');
            isValid = false;
        }

        return isValid;
    }

    function validateForgotPasswordForm(data) {
        let isValid = true;
        utils.clearAllErrors();

        if (!data.email.trim()) {
            utils.showFieldError('forgotPasswordEmail', 'Email address is required');
            isValid = false;
        } else if (!utils.validateEmail(data.email)) {
            utils.showFieldError('forgotPasswordEmail', 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    }

    function validateVerifyOtpForm(data) {
        let isValid = true;
        utils.clearAllErrors();

        if (!data.otp.trim()) {
            utils.showFieldError('otpCode', 'OTP is required');
            isValid = false;
        } else if (!utils.validateOtp(data.otp)) {
            utils.showFieldError('otpCode', 'Please enter a valid 6-digit OTP');
            isValid = false;
        }

        return isValid;
    }

    function validateResetPasswordForm(data) {
        let isValid = true;
        utils.clearAllErrors();

        if (!data.newPassword.trim()) {
            utils.showFieldError('newPassword', 'New password is required');
            isValid = false;
        } else if (!utils.validatePassword(data.newPassword)) {
            utils.showFieldError('newPassword', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (!data.confirmNewPassword.trim()) {
            utils.showFieldError('confirmNewPassword', 'Please confirm your new password');
            isValid = false;
        } else if (data.newPassword !== data.confirmNewPassword) {
            utils.showFieldError('confirmNewPassword', 'Passwords do not match');
            isValid = false;
        }

        return isValid;
    }

    // Event listener attachment functions
    function attachLoginEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const switchToRegisterBtn = document.getElementById('switchToRegister');
        const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

        // Setup password toggle
        setupPasswordToggle();

        if (loginForm) {
            loginForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const formData = {
                    email: document.getElementById('loginEmail').value,
                    password: document.getElementById('loginPassword').value
                };

                if (!validateLoginForm(formData)) {
                    toastUtils.showError('Please fix the errors in the form');
                    return;
                }

                utils.showLoading('login');

                try {
                    const result = await apiService.login(formData.email, formData.password);

                    if (result.success) {
                        toastUtils.showSuccess('Welcome back! Redirecting...');

                        // Store token and user data
                        if (result.data && result.data.token) {
                            localStorage.setItem('authToken', result.data.token);
                            localStorage.setItem('userData', JSON.stringify(result.data.user));
                        }

                        setTimeout(() => {
                            closePopup();
                            // Redirect or update UI here
                            window.location.reload(); // Or redirect to dashboard
                        }, 2000);
                    } else {
                        utils.showError('login', result.message);
                        toastUtils.showError(result.message);
                        utils.hideLoading('login');
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    const errorMessage = error.message || 'Login failed. Please try again.';
                    utils.showError('login', errorMessage);
                    toastUtils.showError(errorMessage);
                    utils.hideLoading('login');
                }
            });
        }

        if (switchToRegisterBtn) {
            switchToRegisterBtn.addEventListener('click', switchToRegister);
        }

        if (forgotPasswordBtn) {
            forgotPasswordBtn.addEventListener('click', switchToForgotPassword);
        }
    }

    function attachRegisterEventListeners() {
        const registerForm = document.getElementById('registerForm');
        const switchToLoginBtn = document.getElementById('switchToLogin');
        const phoneInput = document.getElementById('registerPhone');

        // Setup password toggle
        setupPasswordToggle();

        // Add phone input validation
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const formData = {
                    name: document.getElementById('registerName').value,
                    email: document.getElementById('registerEmail').value,
                    phone: document.getElementById('registerPhone').value,
                    experience: document.getElementById('registerExperience').value,
                    otherExperience: document.getElementById('otherExperience')?.value || '',
                    password: document.getElementById('registerPassword').value,
                    confirmPassword: document.getElementById('registerConfirmPassword').value
                };

                // Prepare data for API - using exact values from dropdown
                const apiData = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    experience: formData.experience,
                    password: formData.password,
                    additionalInfo: formData.experience === 'Others' ? formData.otherExperience : ''
                };

                if (!validateRegisterForm(formData)) {
                    toastUtils.showError('Please fix the errors in the form');
                    return;
                }

                utils.showLoading('register');

                try {
                    const result = await apiService.register(apiData);

                    if (result.success) {
                        toastUtils.showSuccess('Account created successfully! Redirecting to login...');

                        setTimeout(() => {
                            switchToLogin();
                        }, 3000);
                    } else {
                        utils.showError('register', result.message);
                        toastUtils.showError(result.message);
                        utils.hideLoading('register');
                    }
                } catch (error) {
                    console.error('Registration error:', error);
                    const errorMessage = error.message || 'Registration failed. Please try again.';
                    utils.showError('register', errorMessage);
                    toastUtils.showError(errorMessage);
                    utils.hideLoading('register');
                }
            });
        }

        if (switchToLoginBtn) {
            switchToLoginBtn.addEventListener('click', switchToLogin);
        }
    }

    function attachForgotPasswordEventListeners() {
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        const backToLoginBtn = document.getElementById('backToLogin');

        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const formData = {
                    email: document.getElementById('forgotPasswordEmail').value
                };

                if (!validateForgotPasswordForm(formData)) {
                    toastUtils.showError('Please fix the errors in the form');
                    return;
                }

                utils.showLoading('forgotPassword');

                try {
                    const result = await apiService.sendOtp(formData.email);

                    if (result.success) {
                        toastUtils.showSuccess('OTP sent successfully! Check your email.');

                        // Switch to OTP verification form
                        setTimeout(() => {
                            switchToVerifyOtp(formData.email);
                        }, 1500);
                    } else {
                        utils.showError('forgotPassword', result.message);
                        toastUtils.showError(result.message);
                        utils.hideLoading('forgotPassword');
                    }
                } catch (error) {
                    console.error('OTP send error:', error);
                    const errorMessage = error.message || 'Failed to send OTP. Please try again.';
                    utils.showError('forgotPassword', errorMessage);
                    toastUtils.showError(errorMessage);
                    utils.hideLoading('forgotPassword');
                }
            });
        }

        if (backToLoginBtn) {
            backToLoginBtn.addEventListener('click', switchToLogin);
        }
    }

    function attachVerifyOtpEventListeners() {
        const verifyOtpForm = document.getElementById('verifyOtpForm');
        const backToForgotPasswordBtn = document.getElementById('backToForgotPassword');
        const resendOtpBtn = document.getElementById('resendOtpBtn');

        if (verifyOtpForm) {
            verifyOtpForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const formData = {
                    otp: document.getElementById('otpCode').value
                };

                if (!validateVerifyOtpForm(formData)) {
                    toastUtils.showError('Please fix the errors in the form');
                    return;
                }

                utils.showLoading('verifyOtp');

                try {
                    const result = await apiService.verifyOtp(forgotPasswordEmail, formData.otp);

                    if (result.success) {
                        toastUtils.showSuccess('OTP verified successfully!');

                        // Store verified OTP for password reset
                        verifiedOtp = formData.otp;

                        // Switch to reset password form
                        setTimeout(() => {
                            switchToResetPassword();
                        }, 1500);
                    } else {
                        utils.showError('verifyOtp', result.message);
                        toastUtils.showError(result.message);
                        utils.hideLoading('verifyOtp');
                    }
                } catch (error) {
                    console.error('OTP verification error:', error);
                    const errorMessage = error.message || 'Failed to verify OTP. Please try again.';
                    utils.showError('verifyOtp', errorMessage);
                    toastUtils.showError(errorMessage);
                    utils.hideLoading('verifyOtp');
                }
            });
        }

        if (backToForgotPasswordBtn) {
            backToForgotPasswordBtn.addEventListener('click', switchToForgotPassword);
        }

        if (resendOtpBtn) {
            resendOtpBtn.addEventListener('click', async function () {
                utils.showLoading('forgotPassword');

                try {
                    const result = await apiService.sendOtp(forgotPasswordEmail);

                    if (result.success) {
                        toastUtils.showSuccess('OTP resent successfully!');
                    } else {
                        toastUtils.showError(result.message);
                    }
                } catch (error) {
                    console.error('Resend OTP error:', error);
                    const errorMessage = error.message || 'Failed to resend OTP. Please try again.';
                    toastUtils.showError(errorMessage);
                } finally {
                    utils.hideLoading('forgotPassword');
                }
            });
        }
    }

    function attachResetPasswordEventListeners() {
        const resetPasswordForm = document.getElementById('resetPasswordForm');
        const backToVerifyOtpBtn = document.getElementById('backToVerifyOtp');

        // Setup password toggle
        setupPasswordToggle();

        if (resetPasswordForm) {
            resetPasswordForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const formData = {
                    newPassword: document.getElementById('newPassword').value,
                    confirmNewPassword: document.getElementById('confirmNewPassword').value
                };

                if (!validateResetPasswordForm(formData)) {
                    toastUtils.showError('Please fix the errors in the form');
                    return;
                }

                utils.showLoading('resetPassword');

                try {
                    if (!verifiedOtp) {
                        throw new Error('OTP verification required. Please start the process again.');
                    }

                    const result = await apiService.resetPassword(forgotPasswordEmail, verifiedOtp, formData.newPassword);

                    if (result.success) {
                        toastUtils.showSuccess('Password reset successfully! Redirecting to login...');

                        // Clear stored OTP
                        verifiedOtp = '';

                        // Redirect to login
                        setTimeout(() => {
                            switchToLogin();
                        }, 2000);
                    } else {
                        utils.showError('resetPassword', result.message);
                        toastUtils.showError(result.message);
                        utils.hideLoading('resetPassword');
                    }
                } catch (error) {
                    console.error('Password reset error:', error);
                    const errorMessage = error.message || 'Failed to reset password. Please try again.';
                    utils.showError('resetPassword', errorMessage);
                    toastUtils.showError(errorMessage);
                    utils.hideLoading('resetPassword');
                }
            });
        }

        if (backToVerifyOtpBtn) {
            backToVerifyOtpBtn.addEventListener('click', function () {
                // Go back to verify OTP form
                switchToVerifyOtp(forgotPasswordEmail);
            });
        }
    }

    // Close popup function
    function closePopup() {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
        }
    }

    // Initialize with login form listeners
    attachLoginEventListeners();

    // Close handlers
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closePopup();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // Focus on first input
    setTimeout(() => {
        const firstInput = popup.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }, 150);
}

// Make functions globally available
window.createAuthSystem = createAuthSystem;
window.openAuthSystem = createAuthSystem;
window.openLogin = createAuthSystem;

// Auto-initialize when auth buttons are clicked
document.addEventListener('DOMContentLoaded', function () {
    // Attach to login buttons
    const loginButtons = document.querySelectorAll('[onclick*="login"], [onclick*="auth"], .login-btn, .auth-btn, [data-action="login"], [data-action="auth"]');

    loginButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            createAuthSystem();
        });
    });

    // Also handle buttons with onclick attributes containing login/auth
    const buttonsWithOnclick = document.querySelectorAll('button[onclick], a[onclick]');
    buttonsWithOnclick.forEach(button => {
        const onclickAttr = button.getAttribute('onclick') || '';
        if (onclickAttr.includes('login') || onclickAttr.includes('auth') || onclickAttr.includes('Login') || onclickAttr.includes('Auth')) {
            button.addEventListener('click', function (e) {
                if (!onclickAttr.includes('createAuthSystem') && !onclickAttr.includes('openAuthSystem')) {
                    e.preventDefault();
                    e.stopPropagation();
                    createAuthSystem();
                }
            });
        }
    });

    // Check if user is already logged in
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        // Update UI to show logged in state
        const loginButtons = document.querySelectorAll('.login-btn, .auth-btn, [data-action="login"]');
        loginButtons.forEach(button => {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            button.textContent = userData.name || 'My Account';
            button.style.backgroundColor = '#800020';
            button.style.color = 'white';
        });
    }
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createAuthSystem, openAuthSystem, openLogin };
}