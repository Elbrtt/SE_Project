// Form state tracking (true = Login, false = Register)
let isLoginMode = true;

// Temporary volatile array database mapping users dynamically
const userDatabase = [
    {
        username: "admin",
        email: "admin@oasis.com",
        password: "admin123"
    }
];

// Handles clean interface mutation between Authentication and Registration architectures
function toggleMode() {
    isLoginMode = !isLoginMode;
    
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    const alertBox = document.getElementById('authAlert');
    const emailGroup = document.getElementById('emailGroup');
    const emailInput = document.getElementById('email');
    
    // Purge previous validation artifacts during structural context mutations
    alertBox.className = "nb-badge hidden";

    if (isLoginMode) {
        formTitle.textContent = "Welcome Back";
        formSubtitle.textContent = "Please sign in to your account to continue";
        submitBtn.textContent = "Sign In";
        toggleText.innerHTML = 'Don\'t have an account? <span id="toggleBtn" onclick="toggleMode()">Register now</span>';
        
        emailGroup.classList.add('hidden');
        emailInput.removeAttribute('required');
    } else {
        formTitle.textContent = "Create New Account";
        formSubtitle.textContent = "Fill in the details below to register your Oasis account";
        submitBtn.textContent = "Register";
        toggleText.innerHTML = 'Already have an account? <span id="toggleBtn" onclick="toggleMode()">Sign in here</span>';
        
        emailGroup.classList.remove('hidden');
        emailInput.setAttribute('required', 'required');
    }
}

// Intercept form submission and process targeted functional routines
document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const usernameInput = document.getElementById('username').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value;
    const alertBox = document.getElementById('authAlert');

    alertBox.className = "nb-badge hidden";

    if (!isLoginMode) {
        // === REGISTRATION FLOW ===
        
        // 1. Email structural verification
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            alertBox.textContent = "Invalid email format (must include '@' and a domain suffix).";
            alertBox.className = "nb-badge nb-badge-danger";
            return;
        }

        // 2. Collision checking inside active user storage array
        const isUsernameExist = userDatabase.some(user => user.username.toLowerCase() === usernameInput.toLowerCase());
        if (isUsernameExist) {
            alertBox.textContent = "Username is already taken! Please choose another one.";
            alertBox.className = "nb-badge nb-badge-danger";
            return;
        }

        // 3. Mutate array database with new credentials profile
        userDatabase.push({
            username: usernameInput,
            email: emailInput,
            password: passwordInput
        });

        alertBox.textContent = "Registration successful! You can now log in with your credentials.";
        alertBox.className = "nb-badge nb-badge-success";
        
        // Return interface to Authentication mode view state
        setTimeout(() => {
            toggleMode();
            // Automatically map newly registered handle into user input
            document.getElementById('username').value = usernameInput;
            document.getElementById('password').value = "";
        }, 1500);

    } else {
        // === AUTHENTICATION SIGN IN FLOW ===
        
        // Query user database mapping for valid property matching criteria
        const validUser = userDatabase.find(user => 
            user.username.toLowerCase() === usernameInput.toLowerCase() && 
            user.password === passwordInput
        );

        if (validUser) {
            alertBox.textContent = `Access granted! Welcome back, ${validUser.username}. Redirecting...`;
            alertBox.className = "nb-badge nb-badge-success";
            
            setTimeout(() => {
                window.location.href = '../pages/index.html'; 
            }, 1500);
        } else {
            alertBox.textContent = "Invalid username or password configuration.";
            alertBox.className = "nb-badge nb-badge-danger";
        }
    }
});

(function initWindowControls() {
    // Fungsi eksekusi utama
    const setupListeners = () => {
        if (window.electron && window.electron.windowControls) {
            const { minimize, maximize, close } = window.electron.windowControls;

            // Selector menggunakan class bawaan dari HTML asli kamu
            const minBtn = document.querySelector('.min-button');
            const maxBtn = document.querySelector('.win-button');
            const closeBtn = document.querySelector('.exit-button');

            if (minBtn) {
                minBtn.onclick = (e) => { e.preventDefault(); minimize(); };
            }
            if (maxBtn) {
                maxBtn.onclick = (e) => { e.preventDefault(); maximize(); };
            }
            if (closeBtn) {
                closeBtn.onclick = (e) => { e.preventDefault(); close(); };
            }
            
            console.log("[Oasis IPC] Window controls successfully attached.");
        } else {
            console.warn("[Oasis IPC] window.electron.windowControls tidak terdeteksi.");
        }
    };

    // Jalankan langsung jika DOM sudah siap, atau tunggu jika belum
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupListeners);
    } else {
        setupListeners();
    }
})();