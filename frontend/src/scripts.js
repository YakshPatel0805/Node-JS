// Login functionality
function login(email, password) {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.success) {
                alert(data.message);
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirect to dashboard/index page
                window.location.href = '/';
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.log(err);
            alert("Login failed. Please try again.");
        });
}

// Form submission for login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                login(email, password);
            } else {
                alert("Please fill in all fields");
            }
        });
    }
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    if(themeSwitch) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            if (savedTheme === 'dark-mode') {
                themeSwitch.checked = true;
            }
        }

        // Theme toggle functionality
        themeSwitch.addEventListener('change', function () {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }
});



// Signup functionality
function signup(userData) {
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.success) {
                alert(data.message);
                window.location.href = '/login';
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.log(err);
            alert("Signup failed. Please try again.");
        });
}

// Password strength checker
function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    let strength = 0;
    let feedback = '';

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
        case 0:
        case 1:
            feedback = 'Weak';
            strengthIndicator.className = 'password-strength weak';
            break;
        case 2:
        case 3:
            feedback = 'Medium';
            strengthIndicator.className = 'password-strength medium';
            break;
        case 4:
        case 5:
            feedback = 'Strong';
            strengthIndicator.className = 'password-strength strong';
            break;
    }

    strengthIndicator.textContent = password ? `Password strength: ${feedback}` : '';
}

// Password match checker
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchIndicator = document.getElementById('passwordMatch');

    if (confirmPassword) {
        if (password === confirmPassword) {
            matchIndicator.textContent = '✓ Passwords match';
            matchIndicator.className = 'password-match match';
        } else {
            matchIndicator.textContent = '✗ Passwords do not match';
            matchIndicator.className = 'password-match no-match';
        }
    } else {
        matchIndicator.textContent = '';
        matchIndicator.className = 'password-match';
    }
}

// Form validation
function validateForm() {
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    if (!fullname || !email || !password || !confirmPassword) {
        alert('Please fill in all required fields');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    if (!terms) {
        alert('Please accept the Terms & Conditions');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    return true;
}

// Form submission for signup
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if(signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                const userData = {
                    fullname: document.getElementById('fullname').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    password: document.getElementById('password').value,
                    newsletter: document.getElementById('newsletter') ? document.getElementById('newsletter').checked : false
                };

                signup(userData);
            }
        });
    }
});

// Password strength checking
document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const usernameField = document.getElementById('username');

    if(passwordField) {
        passwordField.addEventListener('input', function () {
            checkPasswordStrength(this.value);
            checkPasswordMatch();
        });
    }

    if(confirmPasswordField) {
        confirmPasswordField.addEventListener('input', checkPasswordMatch);
    }

    if(usernameField) {
        // Real-time username availability check (mock)
        usernameField.addEventListener('blur', function () {
            const username = this.value.trim();
            if (username.length >= 3) {
                // Simulate API call
                setTimeout(() => {
                    // Mock check - in real app, this would be an API call
                    const unavailableUsernames = ['admin', 'user', 'test', 'demo'];
                    if (unavailableUsernames.includes(username.toLowerCase())) {
                        this.style.borderColor = '#e74c3c';
                        // You could add a message here
                    } else {
                        this.style.borderColor = '#27ae60';
                    }
                }, 500);
            }
        });
    }
});