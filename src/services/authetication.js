let isLoginMode = true;

function toggleMode() {
    isLoginMode = !isLoginMode;
    
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    const alertBox = document.getElementById('authAlert');
    const emailGroup = document.getElementById('emailGroup');
    const emailInput = document.getElementById('email');
    
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

document.getElementById('authForm').addEventListener('submit', async function(event) {

    event.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value;
    const alertBox = document.getElementById('authAlert');

    alertBox.className = "nb-badge hidden";

    try {

        if (!isLoginMode) {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailInput)) {
                alertBox.textContent = "Invalid email format (must include '@' and a domain suffix).";
                alertBox.className = "nb-badge nb-badge-danger";
                return;
            }

            const result = await window.electron.auth.register({
                username: usernameInput,
                email: emailInput,
                password: passwordInput
            });

            if (!result.success) {
                alertBox.textContent = result.message || "Registration failed.";
                alertBox.className = "nb-badge nb-badge-danger";
                return;
            }

            alertBox.textContent = "Registration successful! You can now log in with your credentials.";
            alertBox.className = "nb-badge nb-badge-success";

            const loginCard = document.querySelector('.login-card');
            loginCard.style.transition = 'opacity 1.2s ease';
            void loginCard.offsetHeight;
            loginCard.style.opacity = '0';

            setTimeout(() => {
                toggleMode();
                document.getElementById('username').value = usernameInput;
                document.getElementById('password').value = "";
                void loginCard.offsetHeight;
                loginCard.style.opacity = '1';
            }, 1200);

        } else {

            const result = await window.electron.auth.login({
                username: usernameInput,
                password: passwordInput
            });

            if (result.success) {
                alertBox.textContent = `Access granted! Welcome back, ${result.username}. Redirecting...`;
                alertBox.className = "nb-badge nb-badge-success";

                setTimeout(() => {
                    window.location.href = "../pages/index.html";
                }, 1500);

            } else {
                alertBox.textContent = "Invalid username or password.";
                alertBox.className = "nb-badge nb-badge-danger";
            }
        }

    } catch (error) {
        console.error(error);
        alertBox.textContent = "An unexpected error occurred.";
        alertBox.className = "nb-badge nb-badge-danger";
    }
});

(function initWindowControls() {
    const setupListeners = () => {
        if (window.electron && window.electron.windowControls) {
            const { minimize, maximize, close } = window.electron.windowControls;

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupListeners);
    } else {
        setupListeners();
    }
})();