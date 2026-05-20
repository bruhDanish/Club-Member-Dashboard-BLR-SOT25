function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function updatePoints(current) {
    return current + getRandomInt(1, 10)
}

function flashElement(cardId) {
    var card = document.getElementById(cardId)
    if (card) {
        card.classList.remove("flash")
        void card.offsetWidth
        card.classList.add("flash")
    }
}

function startPointsInterval() {
    return setInterval(function() {
        var el = document.getElementById("rewards-val")
        if (el) {
            // Update by a random amount between 1 and 10
            el.textContent = updatePoints(parseInt(el.textContent))
            flashElement("points-card")
        }
    }, 5000) // Every 5 seconds
}

// Global timers
var pointsTimer;
var countdownInterval;

function startExpiryCountdown(expiryStr) {
    if (countdownInterval) clearInterval(countdownInterval);
    const expiryElement = document.getElementById('expiry-val');
    const expirySubElement = document.getElementById('expiry-year-val');
    const expiryLbl = document.getElementById('expiry-date-lbl');
    if (!expiryElement) return;

    if (expiryLbl) {
        expiryLbl.textContent = `Expires: ${expiryStr}`;
    }

    // Parse date. E.g. "Dec 31, 2025" or "August 15, 2026"
    const expiryDate = new Date(expiryStr).getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = expiryDate - now;
        
        if (isNaN(expiryDate) || distance <= 0) {
            expiryElement.innerHTML = "Expired";
            if (expirySubElement) expirySubElement.innerHTML = "Membership over";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the main countdown in the heading
        expiryElement.innerHTML = `${days}d : ${hours}h`;
        // Display the minutes and seconds in the sub-paragraph
        if (expirySubElement) {
            expirySubElement.innerHTML = `${mins}m : ${secs}s remaining`;
        }
    }
    
    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000);
}

function initDashboard(user) {
    memberData = user; // Set active user globally for data.js to read
    
    // Update static interface elements
    const sidebarName = document.getElementById('sidebar-name');
    if (sidebarName) sidebarName.textContent = user.name;

    const sidebarRole = document.getElementById('sidebar-role');
    if (sidebarRole) sidebarRole.textContent = user.planType || 'Member';

    const headerRole = document.getElementById('header-role');
    if (headerRole) headerRole.textContent = user.planType || 'Member';

    const heroUsername = document.getElementById('hero-username');
    if (heroUsername) heroUsername.textContent = user.name;

    // Calculate dynamic time-of-day greeting
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Morning';
        if (hour < 17) return 'Afternoon';
        return 'Evening';
    }
    const greetingSpan = document.getElementById('dynamic-greeting');
    if (greetingSpan) greetingSpan.textContent = getGreeting();

    // Populate profile details grid dynamically
    const profAge = document.getElementById('prof-age');
    const profHeight = document.getElementById('prof-height');
    const profWeight = document.getElementById('prof-weight');
    const profGoal = document.getElementById('prof-goal');
    const profId = document.getElementById('prof-id');
    const profRetention = document.getElementById('prof-retention');

    if (profAge) profAge.textContent = user.age || '28 yrs';
    if (profHeight) profHeight.textContent = user.height || '178 cm';
    if (profWeight) profWeight.textContent = user.weight || '82 kg';
    if (profGoal) profGoal.textContent = user.goal || 'Muscle Gain';
    if (profId) profId.textContent = user.memberId || 'EF-0001';
    if (profRetention) profRetention.textContent = user.retention || '92%';

    // Update settings tab inputs
    const settingsNameInput = document.getElementById('fullName');
    const settingsEmailInput = document.getElementById('email');
    if (settingsNameInput) settingsNameInput.value = user.name;
    if (settingsEmailInput) settingsEmailInput.value = user.email;
    
    // Update dashboard cards via data.js functions
    displayExistingPlan();
    displayPlanType();
    displayExpiryDate();

    // Reset and initialize intervals
    if (pointsTimer) clearInterval(pointsTimer);
    
    // Set initial values from the DB
    const rewardsVal = document.getElementById("rewards-val");
    if (rewardsVal) rewardsVal.innerHTML = `${user.fitPoints} <span style="font-size: 1.25rem; font-weight: 300; opacity: 0.7;">.</span>`;
    
    // Set Goal Progress from user record and keep constant
    const goalValElement = document.getElementById("capacity-val");
    if (goalValElement) {
        goalValElement.textContent = user.goalProgress || "65%";
    }
    
    // Total sessions is now fixed according to the user's mock data
    const sessionsVal = document.getElementById("sessions-val");
    if (sessionsVal) sessionsVal.innerHTML = `${user.totalSessions} <span style="font-size: 1.25rem; font-weight: 300; opacity: 0.7;">.</span>`;
    
    // Start Expiry Dynamic Countdown Timer
    startExpiryCountdown(user.expiryDate || "Dec 31, 2025");

    // Only points update dynamically now
    pointsTimer = startPointsInterval();
}

// Initialization and Login Logic
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.querySelector('.dashboard-layout');
    const loginOverlay = document.getElementById('login-overlay');
    const landingPage = document.getElementById('landing-page-container');
    
    // Check if user is already logged in
    const savedEmail = localStorage.getItem('loggedUserEmail');
    if (savedEmail) {
        const foundUser = mockUsers.find(u => u.email.toLowerCase() === savedEmail.toLowerCase());
        if (foundUser) {
            if (landingPage) landingPage.style.display = 'none';
            dashboard.style.display = 'flex';
            loginOverlay.classList.add('hidden');
            initDashboard(foundUser);
            // Replace state immediately to prevent landing page back navigation
            if (history.state === null || !history.state.loggedIn) {
                history.replaceState({ loggedIn: true, tab: 'overview-tab', title: 'Overview' }, '');
            }
        } else {
            if (landingPage) landingPage.style.display = 'block';
            dashboard.style.display = 'none';
            loginOverlay.classList.add('hidden');
        }
    } else {
        if (landingPage) landingPage.style.display = 'block';
        dashboard.style.display = 'none';
        loginOverlay.classList.add('hidden');
    }

    // Login Form Elements
    const loginBtn = document.getElementById('login-submit-btn');
    const loginName = document.getElementById('login-name');
    const loginEmail = document.getElementById('login-email');
    const loginError = document.getElementById('login-error');

    loginBtn.addEventListener('click', () => {
        const nameVal = loginName.value.trim();
        const emailVal = loginEmail.value.trim();

        if (!nameVal || !emailVal) {
            loginError.textContent = "Please enter both name and email.";
            loginError.style.display = 'block';
            return;
        }

        // Search mockUsers for matching credentials (Name & Email)
        const foundUser = mockUsers.find(u => 
            u.name.toLowerCase() === nameVal.toLowerCase() &&
            u.email.toLowerCase() === emailVal.toLowerCase()
        );
        
        if (foundUser) {
            // Save to local storage to keep them logged in
            localStorage.setItem('loggedUserEmail', foundUser.email);

            // Hide landing and login, show dashboard
            if (landingPage) landingPage.style.display = 'none';
            loginOverlay.classList.add('hidden');
            dashboard.style.display = 'flex';
            
            // Initialize Dashboard with specific user data
            initDashboard(foundUser);

            // Establish the root history state of the dashboard session
            history.pushState({ loggedIn: true, tab: 'overview-tab', title: 'Overview' }, '');
        } else {
            loginError.textContent = "Invalid name or email. Please try again.";
            loginError.style.display = 'block';
        }
    });

    // Landing Page Clicks
    const landingLoginBtn = document.getElementById('landing-login-btn');
    if (landingLoginBtn) {
        landingLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (landingPage) landingPage.style.display = 'none';
            loginOverlay.classList.remove('hidden');
            showLoginForm(true);
        });
    }

    const landingSignupBtn = document.getElementById('landing-signup-btn');
    if (landingSignupBtn) {
        landingSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (landingPage) landingPage.style.display = 'none';
            loginOverlay.classList.remove('hidden');
            showSignupForm(true);
        });
    }

    // Support for class-based login & signup triggers (CTA buttons)
    document.querySelectorAll('.trigger-login').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (landingPage) landingPage.style.display = 'none';
            loginOverlay.classList.remove('hidden');
            showLoginForm(true);
        });
    });

    document.querySelectorAll('.trigger-signup').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (landingPage) landingPage.style.display = 'none';
            loginOverlay.classList.remove('hidden');
            showSignupForm(true);
        });
    });

    // Dynamic Sliding Marquee Builder
    const MEMBERS_PREVIEW = [
        {i:'AM',n:'Arjun Mehta',g:'Muscle Gain'},
        {i:'PS',n:'Priya Sharma',g:'Weight Loss'},
        {i:'RD',n:'Rohan Desai',g:'Athletic Perf.'},
        {i:'MI',n:'Meera Iyer',g:'Flexibility'},
        {i:'KP',n:'Karan Patel',g:'Endurance'},
        {i:'NK',n:'Nisha Kapoor',g:'Toning'},
        {i:'VS',n:'Vikram Singh',g:'Strength'},
        {i:'AR',n:'Ananya Roy',g:'General Fitness'},
        {i:'SN',n:'Siddharth Nair',g:'Marathon'},
        {i:'DJ',n:'Deepika Joshi',g:'Wellness'}
    ];
    function buildMarquee(){
        const doubled = [...MEMBERS_PREVIEW, ...MEMBERS_PREVIEW];
        const t = document.getElementById('marqueeTrack');
        if (t) {
            t.innerHTML = doubled.map(m => `
                <div class="marquee-item">
                    <div class="m-av">${m.i}</div>
                    <div>
                        <div class="m-name">${m.n}</div>
                        <div class="m-goal">${m.g}</div>
                    </div>
                </div>
            `).join('');
        }
    }
    buildMarquee();

    // Back to Home links inside Login/Signup cards
    const backToHomeBtns = document.querySelectorAll('.back-to-home');
    backToHomeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loginOverlay.classList.add('hidden');
            if (landingPage) landingPage.style.display = 'block';
            
            // Clear any error states
            if (loginError) loginError.style.display = 'none';
            const signupError = document.getElementById('signup-error');
            if (signupError) signupError.style.display = 'none';
        });
    });

    // Form toggle links
    const showSignupLink = document.getElementById('show-signup-link');
    const showLoginLink = document.getElementById('show-login-link');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');

    let isTransitioning = false;

    function showLoginForm(immediate = false) {
        if (!loginFormContainer || !signupFormContainer) return;
        if (immediate) {
            signupFormContainer.className = "page";
            signupFormContainer.style.display = 'none';
            loginFormContainer.className = "page active";
            loginFormContainer.style.display = 'block';
            return;
        }

        if (isTransitioning) return;
        isTransitioning = true;

        // Reset inline displays to let classes take control
        loginFormContainer.style.display = '';
        signupFormContainer.style.display = '';

        loginFormContainer.className = "page";
        signupFormContainer.className = "page";

        signupFormContainer.classList.add('slide-out-right');
        loginFormContainer.classList.add('slide-in-left');

        setTimeout(() => {
            signupFormContainer.classList.remove('slide-out-right');
            signupFormContainer.style.display = 'none';
            loginFormContainer.className = "page active";
            isTransitioning = false;
        }, 500);
    }

    function showSignupForm(immediate = false) {
        if (!loginFormContainer || !signupFormContainer) return;
        if (immediate) {
            loginFormContainer.className = "page";
            loginFormContainer.style.display = 'none';
            signupFormContainer.className = "page active";
            signupFormContainer.style.display = 'block';
            return;
        }

        if (isTransitioning) return;
        isTransitioning = true;

        // Reset inline displays to let classes take control
        loginFormContainer.style.display = '';
        signupFormContainer.style.display = '';

        loginFormContainer.className = "page";
        signupFormContainer.className = "page";

        loginFormContainer.classList.add('slide-out-left');
        signupFormContainer.classList.add('slide-in-right');

        setTimeout(() => {
            loginFormContainer.classList.remove('slide-out-left');
            loginFormContainer.style.display = 'none';
            signupFormContainer.className = "page active";
            isTransitioning = false;
        }, 500);
    }

    if (showSignupLink) showSignupLink.addEventListener('click', (e) => { e.preventDefault(); showSignupForm(); });
    if (showLoginLink) showLoginLink.addEventListener('click', (e) => { e.preventDefault(); showLoginForm(); });

    // Check URL parameters for initial form
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === 'signup') {
        showSignupForm(true);
    }

    // Signup Logic
    const signupBtn = document.getElementById('signup-submit-btn');
    const signupFirstName = document.getElementById('signup-first-name');
    const signupLastName = document.getElementById('signup-last-name');
    const signupEmail = document.getElementById('signup-email');
    const termsCheck = document.getElementById('terms-check');
    const signupError = document.getElementById('signup-error');

    if (signupBtn) signupBtn.addEventListener('click', () => {
        const firstNameVal = signupFirstName ? signupFirstName.value.trim() : '';
        const lastNameVal = signupLastName ? signupLastName.value.trim() : '';
        const emailVal = signupEmail ? signupEmail.value.trim() : '';

        if (!firstNameVal || !lastNameVal || !emailVal) {
            signupError.textContent = "Please fill in all fields.";
            signupError.style.display = "block";
            return;
        }

        if (termsCheck && !termsCheck.checked) {
            signupError.textContent = "You must agree to the Terms and Conditions.";
            signupError.style.display = "block";
            return;
        }

        const existingUser = mockUsers.find(u => u.email.toLowerCase() === emailVal.toLowerCase());
        if (existingUser) {
            signupError.textContent = "Email already exists. Please log in.";
            signupError.style.display = "block";
            return;
        }

        const nameVal = `${firstNameVal} ${lastNameVal}`;

        // Add new user
        const newUser = {
            name: nameVal,
            email: emailVal,
            plan: "Basic",
            planType: "New Member",
            expiryDate: "Dec 31, 2025",
            totalSessions: 10,
            usedSessions: 0,
            remainingSessions: 10,
            fitPoints: 0
        };
        mockUsers.push(newUser);
        
        // Save mockUsers to localStorage so it persists!
        localStorage.setItem('leapx_mockUsers', JSON.stringify(mockUsers));

        // Log them in
        localStorage.setItem('loggedUserEmail', newUser.email);
        if (landingPage) landingPage.style.display = 'none';
        loginOverlay.classList.add('hidden');
        dashboard.style.display = 'flex';
        initDashboard(newUser);

        // Establish the root history state of the dashboard session
        history.pushState({ loggedIn: true, tab: 'overview-tab', title: 'Overview' }, '');
    });

    // Notification Dropdown Logic
    const notifBtn = document.getElementById('notification-btn');
    const notifDropdown = document.getElementById('notification-dropdown');
    const notifBadge = document.getElementById('notification-badge');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('hidden');
            
            if (notifBadge && !notifDropdown.classList.contains('hidden')) {
                notifBadge.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
                notifDropdown.classList.add('hidden');
            }
        });
    }

    // Logout Logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Remove user from localStorage
            localStorage.removeItem('loggedUserEmail');
            
            // Reset form fields
            loginName.value = '';
            loginEmail.value = '';
            loginError.style.display = 'none';
            
            // Show landing page, hide dashboard and login overlays
            dashboard.style.display = 'none';
            loginOverlay.classList.add('hidden');
            if (landingPage) landingPage.style.display = 'block';
            
            // Clear running timers & remove sidebar effects
            if (pointsTimer) clearInterval(pointsTimer);
            if (countdownInterval) clearInterval(countdownInterval);
            document.body.classList.remove("sidebarGone");
        });
    }

    // Floating Success Toast Notification
    function showSuccessNotification(message) {
        const existingToast = document.getElementById('success-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.id = 'success-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #10B981;
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            font-family: 'Inter', sans-serif;
        `;
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Save Changes Settings Form Logic
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            
            if (!fullNameInput || !emailInput || !memberData) return;
            
            const newName = fullNameInput.value.trim();
            const newEmail = emailInput.value.trim();
            
            if (!newName || !newEmail) {
                alert("Name and email cannot be empty.");
                return;
            }
            
            const oldEmail = memberData.email;
            const userIndex = mockUsers.findIndex(u => u.email.toLowerCase() === oldEmail.toLowerCase());
            
            if (userIndex !== -1) {
                // Update in mock database
                mockUsers[userIndex].name = newName;
                mockUsers[userIndex].email = newEmail;
                
                // Update active global session variables
                memberData.name = newName;
                memberData.email = newEmail;
                
                // Save back to localStorage mock users
                localStorage.setItem('leapx_mockUsers', JSON.stringify(mockUsers));
                
                // Keep the login token updated so login persists correctly
                localStorage.setItem('loggedUserEmail', newEmail);
                
                // Refresh UI headers in real-time
                const sidebarName = document.getElementById('sidebar-name');
                if (sidebarName) sidebarName.textContent = newName;
                const heroUsername = document.getElementById('hero-username');
                if (heroUsername) heroUsername.textContent = newName;
                
                // Trigger success visual toast
                showSuccessNotification("Profile updated successfully!");
            }
        });
    }

    // ================= DYNAMIC REDESIGN INTERACTIVE HANDLERS =================

    // Sidebar Toggling behavior
    const sidebarElement = document.querySelector(".sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle-btn");
    const closeSidebarBtn = document.getElementById("sidebar-close-btn");

    if (toggleBtn && sidebarElement) {
        toggleBtn.addEventListener("click", () => {
            sidebarElement.classList.toggle("hide");
            document.body.classList.toggle("sidebarGone");
        });
    }

    if (closeSidebarBtn && sidebarElement) {
        closeSidebarBtn.addEventListener("click", () => {
            sidebarElement.classList.add("hide");
            document.body.classList.add("sidebarGone");
        });
    }

    // Upgrade Plan Modal actions
    const upgradeBtn = document.getElementById("upgrade-plan-btn");
    const membershipModal = document.querySelector(".membershipModal");
    const closeMembership = document.querySelector(".closeMembership");

    if (upgradeBtn && membershipModal) {
        upgradeBtn.addEventListener("click", () => {
            membershipModal.classList.add("show");
        });
    }

    if (closeMembership && membershipModal) {
        closeMembership.addEventListener("click", () => {
            membershipModal.classList.remove("show");
        });
    }

    if (membershipModal) {
        membershipModal.addEventListener("click", (e) => {
            if (e.target === membershipModal) {
                membershipModal.classList.remove("show");
            }
        });
    }

    // Active Plan Card Upgrades
    const selectPlanBtns = document.querySelectorAll(".planCard button");
    selectPlanBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".planCard");
            if (!card) return;
            const chosenPlan = card.querySelector("h2").textContent.trim();
            
            if (memberData) {
                memberData.plan = chosenPlan;
                memberData.planType = chosenPlan === 'Premium' ? 'VIP Access' : (chosenPlan === 'Advanced' ? 'Elite Access' : 'Pro Member');
                
                // Update localStorage mock database
                const userIdx = mockUsers.findIndex(u => u.email.toLowerCase() === memberData.email.toLowerCase());
                if (userIdx !== -1) {
                    mockUsers[userIdx].plan = chosenPlan;
                    mockUsers[userIdx].planType = memberData.planType;
                    localStorage.setItem('leapx_mockUsers', JSON.stringify(mockUsers));
                }
                
                // Update UI elements in real-time
                const activePlanVal = document.getElementById('active-plan-val');
                const planTypeVal = document.getElementById('plan-type-val');
                if (activePlanVal) activePlanVal.textContent = chosenPlan;
                if (planTypeVal) planTypeVal.textContent = memberData.planType;

                const sidebarRole = document.getElementById('sidebar-role');
                if (sidebarRole) sidebarRole.textContent = memberData.planType;
                
                const headerRole = document.getElementById('header-role');
                if (headerRole) headerRole.textContent = memberData.planType;
                
                // Update settings tab form placeholders
                displayExistingPlan();
                displayPlanType();
                
                // Highlight corresponding card in the pricing grid
                document.querySelectorAll(".planCard").forEach(c => c.classList.remove("activePlan"));
                card.classList.add("activePlan");
                
                // Close modal and present float success feedback toast
                membershipModal.classList.remove("show");
                showSuccessNotification(`Upgraded to ${chosenPlan} Membership successfully! 🚀`);
            }
        });
    });

    // Move navbar items to sidebar on scroll
    const header = document.querySelector('.ultraGlassHeader');
    const headerRight = document.querySelector('.ultraHeaderRight');
    const navLinks = document.querySelector('.navLinks');
    const headerLeft = document.querySelector('.ultraHeaderLeft');
    const mainContent = document.querySelector('.main-content');

    if (mainContent) {
        mainContent.addEventListener('scroll', () => {
            if (mainContent.scrollTop > 50) {
                if (!document.body.classList.contains('header-moved')) {
                    document.body.classList.add('header-moved');
                    if (headerRight && navLinks) {
                        // Move the right side of the header into the sidebar
                        navLinks.appendChild(headerRight);
                        headerRight.style.flexDirection = 'column';
                        headerRight.style.alignItems = 'stretch';
                        headerRight.style.marginTop = '15px';
                        headerRight.style.paddingLeft = '0';
                        headerRight.style.gap = '8px';
                        headerRight.style.position = 'relative'; // for dropdown positioning
                        
                        // Transform notification button into a sidebar tab
                        const notifBtnToTab = document.getElementById('notification-btn');
                        const notifIcon = document.getElementById('notification-icon');
                        const notifText = document.getElementById('notification-text');
                        const notifDropdown = document.getElementById('notification-dropdown');
                        
                        if (notifBtnToTab) {
                            notifBtnToTab.className = 'tab';
                            if (notifText) notifText.style.display = 'inline';
                            if (notifIcon) notifIcon.style.cssText = '';
                        }
                        
                        // Adjust dropdown to display below
                        if (notifDropdown) {
                            notifDropdown.style.top = '100%'; // Below the tabs
                            notifDropdown.style.left = '0';
                            notifDropdown.style.right = 'auto';
                            notifDropdown.style.marginTop = '5px';
                            notifDropdown.style.zIndex = '1000';
                        }
                        
                        // Hide the main header smoothly
                        if (header) {
                            header.style.transform = 'translateY(-100px)';
                            header.style.opacity = '0';
                            header.style.pointerEvents = 'none';
                        }
                    }
                }
            } else {
                if (document.body.classList.contains('header-moved')) {
                    document.body.classList.remove('header-moved');
                    if (headerRight && header) {
                        // Move the right side back to the header
                        header.appendChild(headerRight);
                        headerRight.style.flexDirection = 'row';
                        headerRight.style.alignItems = 'center';
                        headerRight.style.marginTop = '0';
                        headerRight.style.paddingLeft = '0';
                        headerRight.style.gap = '15px';
                        headerRight.style.position = 'static';
                        
                        const notifBtnToTab = document.getElementById('notification-btn');
                        const notifIcon = document.getElementById('notification-icon');
                        const notifText = document.getElementById('notification-text');
                        const notifDropdown = document.getElementById('notification-dropdown');
                        
                        // Revert notification tab back to icon button
                        if (notifBtnToTab) {
                            notifBtnToTab.className = 'glassNotify';
                            if (notifText) notifText.style.display = 'none';
                            if (notifIcon) notifIcon.style.cssText = 'font-size: 1.25rem; color: #fff;';
                        }
                        
                        // Revert dropdown position
                        if (notifDropdown) {
                            notifDropdown.style.top = '80px';
                            notifDropdown.style.right = '0';
                            notifDropdown.style.left = 'auto';
                            notifDropdown.style.marginTop = '0';
                        }
                        
                        // Show the main header
                        header.style.transform = 'translateY(0)';
                        header.style.opacity = '1';
                        header.style.pointerEvents = 'auto';
                    }
                }
            }
        });
    }
});

// Global password strength indicator matching the screenshot styles
window.updateStrength = function(val) {
    const fill = document.getElementById('strength-fill');
    if (!fill) return;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const colors = isLight ? ['#ef4444', '#f59e0b', '#10b981', '#047857'] : ['#555555', '#888888', '#bbbbbb', '#ffffff'];
    const widths = ['25%', '50%', '75%', '100%'];
    fill.style.width = val.length ? (widths[score-1] || '10%') : '0%';
    fill.style.backgroundColor = val.length ? (colors[score-1] || '#555555') : 'transparent';
};
