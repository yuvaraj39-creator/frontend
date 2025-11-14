// Create Course Application Form - Popup Window (Improved Compact Version)
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
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Full Name</label>
                        <input type="text" id="applicantName" required 
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                            placeholder="Enter your full name">
                    </div>

                    <!-- Phone & Email in one row -->
                    <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Phone</label>
                            <input type="tel" id="applicantPhone" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                                placeholder="Phone number">
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Email</label>
                            <input type="email" id="applicantEmail" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; transition: border-color 0.3s;"
                                placeholder="Email address">
                        </div>
                    </div>

                    <!-- Course & Study Mode in one row -->
                    <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Course</label>
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
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Study Mode</label>
                            <select id="studyMode" required 
                                style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; background: white; cursor: pointer;">
                                <option value="">Select mode</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    <!-- Message -->
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #333; font-size: 0.85rem;">Message (Optional)</label>
                        <textarea id="applicantMessage" rows="2"
                            style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.85rem; resize: vertical; min-height: 60px;"
                            placeholder="Any additional information"></textarea>
                    </div>

                    <!-- Buttons -->
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" id="cancelBtn" 
                            style="padding: 8px 16px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.85rem;">
                            Cancel
                        </button>
                        <button type="submit" 
                            style="padding: 8px 16px; background: ${primaryColor}; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer; transition: background 0.3s; font-size: 0.85rem;">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add hover effects
    const style = document.createElement('style');
    style.textContent = `
        #applicationForm input:focus, #applicationForm select:focus, #applicationForm textarea:focus {
            outline: none;
            border-color: ${primaryColor} !important;
        }
        
        #applicationForm button[type="submit"]:hover {
            background: ${primaryDark} !important;
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
    `;
    document.head.appendChild(style);

    // Add scrollbar class to form content
    const formContent = popup.querySelector('div > div');
    formContent.classList.add('popup-form-content');

    // Append to overlay
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Form submission handler
    const form = popup.querySelector('#applicationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const applicationData = {
            name: document.getElementById('applicantName').value,
            phone: document.getElementById('applicantPhone').value,
            email: document.getElementById('applicantEmail').value,
            course: document.getElementById('selectedCourse').value,
            studyMode: document.getElementById('studyMode').value,
            message: document.getElementById('applicantMessage').value,
            timestamp: new Date().toISOString()
        };

        // Here you would typically send data to your backend
        console.log('Application Data:', applicationData);
        
        // Show success message
        alert('Application submitted successfully!');
        
        // Close popup
        document.body.removeChild(overlay);
        document.head.removeChild(style);
    });

    // Cancel button handler
    const cancelBtn = popup.querySelector('#cancelBtn');
    cancelBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.head.removeChild(style);
    });

    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
        }
    });
}
