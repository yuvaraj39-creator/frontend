
class ToastNotification {
    constructor() {
        this.container = document.getElementById('toast-container');
        this.toastId = 0;
    }

    show(message, type = 'info', title = '', duration = 5000) {
        const toastId = `toast-${this.toastId++}`;
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast ${type}`;
        toast.innerHTML = `
                    <div class="toast-icon">
                        <i class="${icons[type]}" aria-hidden="true"></i>
                    </div>
                    <div class="toast-content">
                        ${title ? `<div class="toast-title">${title}</div>` : ''}
                        <div class="toast-message">${message}</div>
                    </div>
                    <button class="toast-close" onclick="toastSystem.close('${toastId}')">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        if (duration > 0) {
            setTimeout(() => {
                this.close(toastId);
            }, duration);
        }

        return toastId;
    }

    close(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }

    success(message, title = 'Success') {
        return this.show(message, 'success', title);
    }

    error(message, title = 'Error') {
        return this.show(message, 'error', title);
    }

    warning(message, title = 'Warning') {
        return this.show(message, 'warning', title);
    }

    info(message, title = 'Information') {
        return this.show(message, 'info', title);
    }
}

const toastSystem = new ToastNotification();

class CampusLifeGrid {
    constructor() {
        this.gridContainer = document.getElementById('campus-grid');
        this.init();
    }

    async init() {
        await this.loadImages();
        this.createGrid();
    }

    async loadImages() {
        try {
            const response = await fetch('Campus_Life.json', { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!data || !Array.isArray(data.images) || data.images.length === 0) {
                throw new Error('Invalid JSON structure or empty images');
            }
            this.images = data.images;
            console.log('Campus images loaded:', this.images.length);
        } catch (error) {
            console.error('Error loading campus life images:', error);
            toastSystem.warning('Could not load campus images — using fallback images');
            this.images = [
                {
                    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                    alt: "Students in library"
                },
                {
                    url: "https://media.istockphoto.com/id/882215368/photo/hes-a-great-tutor.webp?a=1&b=1&s=612x612&w=0&k=20&c=CSIs1x0XKDDptmpffMlQGewM280I4PmQFd7ujpdrEyc=",
                    alt: "Classroom learning"
                },
                {
                    url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1490&q=80",
                    alt: "Sports event"
                },
                {
                    url: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
                    alt: "Cultural festival"
                },
                {
                    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                    alt: "Campus building"
                },
                {
                    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                    alt: "Student collaboration"
                },
                {
                    url: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
                    alt: "Graduation ceremony"
                },
                {
                    url: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                    alt: "Student discussion"
                }
            ];
        }
    }

    getRandomImages(count) {
        if (!Array.isArray(this.images) || this.images.length === 0) return [];
        const available = this.images.length;
        const pick = Math.min(count, available);
        const shuffled = [...this.images].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, pick);
    }


    createGrid() {
        this.gridContainer.innerHTML = '';

        // Get 4 random images
        const randomImages = this.getRandomImages(4);

        randomImages.forEach((image) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'campus-grid-item';

            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.alt || 'Campus image';
            imgElement.loading = 'lazy';
            imgElement.onerror = () => {
                imgElement.src = 'https://via.placeholder.com/600x400?text=Campus+Image';
            };
            if (!this.images || this.images.length === 0) {
                this.gridContainer.innerHTML = '<div class="text-center text-gray-500">No campus images available</div>';
                return;
            }


            const caption = document.createElement('div');
            caption.className = 'campus-grid-caption';
            caption.innerHTML = `<h3 class="text-white font-semibold">${image.alt}</h3>`;

            gridItem.appendChild(imgElement);
            gridItem.appendChild(caption);
            this.gridContainer.appendChild(gridItem);
        });

        console.log('Campus grid loaded with 4 random images');
    }
}

class UserAuthManager {


    constructor() {
        this.authButton = document.getElementById('auth-button');
        this.mobileAuthButton = document.getElementById('mobile-auth-button');
        this.isLoggedIn = false;

        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.updateAuthButtons();
        this.authButton.addEventListener("click", () => {
            if (this.isLoggedIn) {
                createCommunityPopupForm();
            } else {
                createAuthSystem();
            }
        });

        this.mobileAuthButton.addEventListener("click", () => {
            if (this.isLoggedIn) {
                createCommunityPopupForm();
            } else {
                createAuthSystem();
            }
        });

    }

    checkLoginStatus() {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        this.isLoggedIn = !!(token && userData);
    }

    updateAuthButtons() {
        const buttonText = this.isLoggedIn ? 'Join Now' : 'Login Now';

        if (this.authButton) {
            this.authButton.textContent = buttonText;
        }

        if (this.mobileAuthButton) {
            this.mobileAuthButton.textContent = buttonText;
        }
    }

    login() {
        localStorage.setItem('authToken', 'demo-token');
        localStorage.setItem('userData', JSON.stringify({ name: 'User', email: 'user@example.com' }));
        this.isLoggedIn = true;
        this.updateAuthButtons();
        toastSystem.success('Successfully logged in!');
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        this.isLoggedIn = false;
        this.updateAuthButtons();
        toastSystem.info('Logged out successfully');
    }
}

// NEW: Recruiter Images Loader
class RecruiterImagesLoader {
    constructor() {
        this.sliderTrack = document.getElementById('recruiters-slider-track');
        this.init();
    }

    async init() {
        await this.loadRecruiterImages();
    }

    async loadRecruiterImages() {
        try {
            const response = await fetch('Placements.json');
            const data = await response.json();

            const logos = data.image; // JSON array

            // Clear existing content
            this.sliderTrack.innerHTML = '';

            // Create two sets of logos for seamless infinite scrolling
            [...logos, ...logos].forEach((logo) => {
                const item = document.createElement('div');
                item.className = 'recruiters-slider-item';

                item.innerHTML = `
                            <img src="${logo.src}" alt="${logo.alt}" class="w-full h-full object-contain">
                        `;

                this.sliderTrack.appendChild(item);
            });

            console.log("Recruiter images loaded successfully!");
        } catch (error) {
            console.error("Error loading Recruiter Logos:", error);
            this.showFallbackLogos();
        }
    }

    showFallbackLogos() {
        // Fallback logos in case JSON fails to load
        const fallbackLogos = [
            { src: './patner/1200px-Qualcomm-Logo.svg.png', alt: 'Qualcomm Logo' },
            { src: './patner/1200px-Ramco_Systems_Logo.svg.png', alt: 'Ramco Systems Logo' },
            { src: './patner/1280px-Accenture.svg.png', alt: 'Accenture Logo' },
            { src: './patner/2560px-Infosys_logo.svg.png', alt: 'Infosys Logo' },
            { src: './patner/2560px-Wipro_Primary_Logo_Color_RGB.svg.png', alt: 'Wipro Logo' },
            { src: './patner/capgemini-201x.svg', alt: 'Capgemini Logo' },
            { src: './patner/HCL_Technologies-Logo.wine.png', alt: 'HCL Technologies Logo' },
            { src: './patner/HTC-logo.png', alt: 'HTC Logo' }
        ];

        this.sliderTrack.innerHTML = '';

        [...fallbackLogos, ...fallbackLogos].forEach((logo) => {
            const item = document.createElement('div');
            item.className = 'recruiters-slider-item';

            item.innerHTML = `
                        <img src="${logo.src}" alt="${logo.alt}" class="w-full h-full object-contain">
                    `;

            this.sliderTrack.appendChild(item);
        });

        console.log("Fallback recruiter logos loaded");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const campusGrid = new CampusLifeGrid();
    const userAuthManager = new UserAuthManager();
    const recruiterLoader = new RecruiterImagesLoader(); // NEW: Initialize recruiter loader

    const mainContent = document.getElementById('main-content');

    document.getElementById('mobile-menu-button').addEventListener('click', function () {
        const mobileMenu = document.getElementById('mobile-menu');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        mobileMenu.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isExpanded);

        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    document.getElementById('explore-programs-btn').addEventListener('click', function () {
        document.getElementById('courses').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    const learnMoreBtn = document.getElementById('learn-more-btn');
    const backToNormalBtn = document.getElementById('back-to-normal-btn');
    const aboutFlipCard = document.getElementById('about-flip-card');

    learnMoreBtn.addEventListener('click', function () {
        aboutFlipCard.classList.add('flipped');
    });

    backToNormalBtn.addEventListener('click', function () {
        aboutFlipCard.classList.remove('flipped');
    });

    document.getElementById('contact-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.subject || !data.message) {
            toastSystem.error('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            toastSystem.error('Please enter a valid email address');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch(`${window.AppConfig.API_BASE_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                toastSystem.success('Message sent successfully! We will get back to you soon.');
                this.reset();
            } else {
                toastSystem.error(result.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            toastSystem.error('Failed to send message. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    class CoursesManager {
        constructor() {
            this.apiBaseUrl = window.AppConfig
                ? `${window.AppConfig.API_BASE_URL}/api`
                : '/api';

            this.init();
        }

        init() {
            this.loadCourses();
        }

        async loadCourses() {
            const coursesContainer = document.getElementById('courses-container');
            if (!coursesContainer) return;

            try {
                coursesContainer.innerHTML = this.getSkeletonHTML();

                setTimeout(async () => {
                    try {
                        const response = await fetch(`${window.AppConfig.API_BASE_URL}/api/courses?limit=100&status=active`);

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const result = await response.json();

                        if (result.success && result.data.courses.length > 0) {
                            const allCourses = result.data.courses;
                            const randomCourses = this.getRandomCourses(allCourses, 3);
                            this.updateCoursesSection(randomCourses);
                        } else {
                            this.showFallbackCourses();
                        }
                    } catch (error) {
                        console.error('Error loading courses:', error);
                        this.showFallbackCourses();
                    }
                }, 1500);
            } catch (error) {
                console.error('Error loading courses:', error);
                this.showFallbackCourses();
            }
        }

        getRandomCourses(courses, count) {
            const shuffled = [...courses].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }

        formatINR(amount) {
            return '₹' + amount.toLocaleString('en-IN');
        }

        generateRandomRating() {
            return (Math.random() * 0.6 + 4.2).toFixed(1);
        }

        createSellerBadge(seller) {
            if (!seller) return '';

            const sellerClassMap = {
                'Best Seller': 'best-seller',
                'Top Rated': 'top-rated',
                'Most Popular': 'most-popular',
                'Trending Now': 'trending-now',
                'Student Favorite': 'student-favorite',
                'Bestseller': 'bestseller',
                'Hot Pick': 'hot-pick',
                'Editor\'s Choice': 'editors-choice',
                'Featured Course': 'featured-course',
                'Highly Recommended': 'highly-recommended',
                'Top Choice': 'top-choice'
            };

            const badgeClass = sellerClassMap[seller] || 'best-seller';

            return `<span class="seller-badge ${badgeClass}">${seller}</span>`;
        }

        updateCoursesSection(courses) {
            const coursesContainer = document.getElementById('courses-container');
            if (!coursesContainer) return;

            if (courses.length === 0) {
                coursesContainer.innerHTML = this.getNoCoursesHTML();
                return;
            }

            coursesContainer.innerHTML = courses.map(course => {
                const rating = this.generateRandomRating();
                const hasDiscount = course.onlineOriginalPrice && course.onlineOriginalPrice > course.onlinePrice;
                const courseImage = course.images && course.images[0]
                    ? course.images[0]
                    : 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                const courseDescription = course.miniDescription || course.description || 'No description available.';

                return `
                        <div class="course-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
                            <div class="relative">
                                <img src="${courseImage}" 
                                     alt="${course.title || 'Course Image'}" 
                                     class="w-full h-48 object-cover"
                                     onerror="this.src='https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'">
                                ${course.seller ?
                        `<div class="absolute top-2 right-2">
                                        ${this.createSellerBadge(course.seller)}
                                    </div>` : ''
                    }
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">${course.title || 'Untitled Course'}</h3>
                                <p class="text-sm text-gray-600 mb-3">${course.category || 'General'}</p>
                                
                                <div class="flex items-center mb-4">
                                    <div class="text-yellow-400 mr-2">
                                        ${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))}
                                    </div>
                                    <span class="text-sm text-gray-600">${rating}</span>
                                </div>
                                
                                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                                    ${courseDescription}
                                </p>
                                
                                <div class="flex items-center justify-between">
                                    <div>
                                        <span class="text-lg font-bold text-[#800020]">${this.formatINR(course.onlinePrice || 0)}</span>
                                        ${hasDiscount ?
                        `<span class="text-sm text-gray-500 line-through ml-2">${this.formatINR(course.onlineOriginalPrice)}</span>` : ''
                    }
                                    </div>
                                    <a href="info.html?id=${course._id || course.id}">
                                        <button class="px-4 py-2 bg-[#800020] hover:bg-[#600018] text-white text-sm rounded transition duration-300">
                                            View Details
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
            }).join('');
        }

        getSkeletonHTML() {
            return `
                    <div class="course-card bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="skeleton skeleton-image"></div>
                        <div class="p-6">
                            <div class="skeleton skeleton-title mb-2"></div>
                            <div class="skeleton skeleton-text mb-3 w-3/4"></div>
                            <div class="skeleton skeleton-text mb-4"></div>
                            <div class="skeleton skeleton-text mb-4"></div>
                            <div class="flex items-center justify-between">
                                <div class="skeleton skeleton-text w-1/3"></div>
                                <div class="skeleton skeleton-button"></div>
                            </div>
                        </div>
                    </div>
                    <div class="course-card bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="skeleton skeleton-image"></div>
                        <div class="p-6">
                            <div class="skeleton skeleton-title mb-2"></div>
                            <div class="skeleton skeleton-text mb-3 w-3/4"></div>
                            <div class="skeleton skeleton-text mb-4"></div>
                            <div class="skeleton skeleton-text mb-4"></div>
                            <div class="flex items-center justify-between">
                                <div class="skeleton skeleton-text w-1/3"></div>
                                <div class="skeleton skeleton-button"></div>
                            </div>
                        </div>
                    </div>
                    <div class="course-card bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="skeleton skeleton-image"></div>
                        <div class="p-6">
                            <div class="skeleton skeleton-title mb-2"></div>
                            <div class="skeleton skeleton-text mb-3 w-3/4"></div>
                            <div class="skeleton skeleton-text mb-4"></div>
                            <div class="skeleton skeleton-text mb-4"></div>
                            <div class="flex items-center justify-between">
                                <div class="skeleton skeleton-text w-1/3"></div>
                                <div class="skeleton skeleton-button"></div>
                            </div>
                        </div>
                    </div>
                `;
        }

        getNoCoursesHTML() {
            return `
                    <div class="col-span-3 text-center py-8">
                        <p class="text-gray-600">No courses available at the moment.</p>
                    </div>
                `;
        }

        showFallbackCourses() {
            const demoCourses = [
                {
                    id: '1',
                    title: 'Computer Science',
                    description: 'Learn programming, algorithms, and software development with industry experts.',
                    category: 'B.Tech',
                    images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1422&q=80'],
                    onlinePrice: 3200,
                    onlineOriginalPrice: 4000,
                    duration: '4 Years'
                },
                {
                    id: '2',
                    title: 'Business Administration',
                    description: 'Master business strategies, management principles, and leadership skills.',
                    category: 'MBA',
                    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'],
                    onlinePrice: 4500,
                    onlineOriginalPrice: 5500,
                    duration: '2 Years'
                },
                {
                    id: '3',
                    title: 'Electrical Engineering',
                    description: 'Explore electrical systems, power generation, and electronic circuits.',
                    category: 'B.Tech',
                    images: ['https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'],
                    onlinePrice: 3400,
                    onlineOriginalPrice: 4200,
                    duration: '4 Years'
                }
            ];

            this.updateCoursesSection(demoCourses);
        }
    }

    const coursesManager = new CoursesManager();
});

function createAuthSystem() {
    const userAuthManager = new UserAuthManager();

    if (userAuthManager.isLoggedIn) {
        createCommunityPopupForm();
    } else {
        userAuthManager.login();
    }
}