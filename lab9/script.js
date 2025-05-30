const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const phoneRegex = /^\+380\d{9}$/;
const usernameRegex = /^(?=(.*\d){2,}).{6,}$/;

function showForm(formId) {
    document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
    const activeForm = document.getElementById(formId);
    if (activeForm) activeForm.classList.add('active');

    activeForm.querySelectorAll('input, select').forEach(input => {
        input.classList.remove('valid', 'invalid');
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const messageEl = formGroup.querySelector('.form-text');
            if (messageEl) {
                messageEl.textContent = '';
                messageEl.classList.remove('valid', 'invalid');
            }
        }
    });

    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    const tabButton = document.querySelector('.tab-button[data-form="' + formId + '"]');
    if (tabButton) tabButton.classList.add('active');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

function populateCities() {
    const countrySelect = document.getElementById('signup-country');
    const citySelect = document.getElementById('signup-city');
    if (!countrySelect || !citySelect) return;

    const country = countrySelect.value;
    citySelect.disabled = !country;

    const cities = {
        'Ukraine': ['Kyiv', 'Chernivtsi', 'Harkiv'],
        'USA': ['New York', 'Los Angeles', 'San-Hose'],
    };

    citySelect.innerHTML = '<option value="">Select City</option>';
    if (country && cities[country]) {
        cities[country].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

function validateSignup(event) {
    event.preventDefault();

    const fields = [
        { id: 'signup-firstname', regex: nameRegex, error: 'First name can only contain letters and spaces', allowEmpty: false },
        { id: 'signup-lastname', regex: nameRegex, error: 'Last name can only contain letters and spaces', allowEmpty: false },
        { id: 'signup-email', regex: /^\S+@\S+\.\S+$/, error: 'Invalid email format', allowEmpty: false },
        { id: 'signup-password', minLength: 6, error: 'Password must be at least 6 characters', allowEmpty: false },
        { id: 'signup-confirm', matchWith: 'signup-password', error: 'Passwords do not match', allowEmpty: false },
        { id: 'signup-phone', regex: phoneRegex, error: 'Please provide a valid Ukrainian phone number (+380XXXXXXXXX)', allowEmpty: false },
        { id: 'signup-dob', allowEmpty: false, error: 'Please provide your date of birth' },
        { id: 'signup-country', allowEmpty: false, error: 'Please select your country' },
        { id: 'signup-city', allowEmpty: false, error: 'Please select your city' },
    ];

    let valid = true;
    let formData = {};

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input) return;

        const value = input.value.trim();

        if (!field.allowEmpty && value === '') {
            setError(input, 'This field is required');
            valid = false;
        } else if (field.regex && !field.regex.test(value)) {
            setError(input, field.error);
            valid = false;
        } else if (field.minLength && value.length < field.minLength) {
            setError(input, field.error);
            valid = false;
        } else if (field.matchWith) {
            const matchInput = document.getElementById(field.matchWith);
            const matchValue = matchInput ? matchInput.value.trim() : '';
            if (value !== matchValue) {
                setError(input, field.error);
                valid = false;
            } else {
                setSuccess(input, 'Looks good');
                formData[field.id] = value;
            }
        } else {
            setSuccess(input, 'Looks good');
            formData[field.id] = value;
        }
    });

    if (valid) {
        console.log('Form data (Signup):', formData);
        alert('Registration successful!');
        const signupForm = document.getElementById('signup');
        if (signupForm) signupForm.reset();
        clearValidation('signup');
    }
}

function validateLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');
    if (!username || !password) return;

    let valid = true;

    if (username.value.trim() === '') {
        setError(username, 'Please enter your username');
        valid = false;
    } else if (!usernameRegex.test(username.value.trim())) {
        setError(username, 'Username must be at least 6 characters long and contain at least 2 digits');
        valid = false;
    } else {
        setSuccess(username, 'Looks good!');
    }

    if (password.value.trim() === '') {
        setError(password, 'Password is required');
        valid = false;
    } else if (password.value.length < 6) {
        setError(password, 'Password must be at least 6 characters');
        valid = false;
    } else {
        setSuccess(password, 'Looks good!');
    }

    if (valid) {
        console.log('Form data (Login):', {
            username: username.value.trim(),
            password: password.value
        });

        alert('Login successful!');
        const loginForm = document.getElementById('login');
        if (loginForm) loginForm.reset();
        clearValidation('login');
    }
}

function setError(input, message) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        const messageEl = formGroup.querySelector('.form-text');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.classList.add('invalid');
            messageEl.classList.remove('valid');
        }
    }
}

function setSuccess(input, message) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        const messageEl = formGroup.querySelector('.form-text');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.classList.add('valid');
            messageEl.classList.remove('invalid');
        }
    }
}

function clearValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.querySelectorAll('input, select').forEach(input => {
        input.classList.remove('valid', 'invalid');
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const messageEl = formGroup.querySelector('.form-text');
            if (messageEl) {
                messageEl.textContent = '';
                messageEl.classList.remove('valid', 'invalid');
            }
        }
    });
}
