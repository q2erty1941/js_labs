import { validateLogin, validateSignup } from './validation.js';
import { authContainer, appContainer, loginForm, registerForm, logoutBtn } from '../constants.js';
import { handleLogout } from './auth.js';

export function setupAuthEventListeners() {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function() {
            showForm(this.textContent.toLowerCase());
        });
    });

    loginForm.addEventListener('submit', validateLogin);
    registerForm.addEventListener('submit', validateSignup);
    logoutBtn.addEventListener('click', handleLogout);
}

export function showForm(formType) {
    document.querySelectorAll('.form').forEach(form => {
        form.classList.remove('active');
    });

    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    if (formType === 'login') {
        document.getElementById('login').classList.add('active');
        document.querySelectorAll('.tab-button')[1].classList.add('active');
    } else {
        document.getElementById('signup').classList.add('active');
        document.querySelectorAll('.tab-button')[0].classList.add('active');
    }
}

export function togglePassword(id) {
    const input = document.getElementById(id);
    const icon = input.parentElement.querySelector('.toggle-password');

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}

export function populateCities() {
    const countrySelect = document.getElementById('signup-country');
    const citySelect = document.getElementById('signup-city');
    const country = countrySelect.value;

    citySelect.disabled = country === '';

    const cities = {
        'Ukraine': ['Kyiv', 'Lviv', 'Odesa'],
        'USA': ['New York', 'Los Angeles', 'Chicago'],
    };

    citySelect.innerHTML = '<option value="">Select City</option>';
    if (cities[country]) {
        cities[country].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

export function setError(input, message) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    const messageEl = input.closest('.form-group')?.querySelector('.form-text');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.display = 'block';
        messageEl.classList.add('invalid');
        messageEl.classList.remove('valid');
    }
}

export function setSuccess(input, message) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    const messageEl = input.closest('.form-group')?.querySelector('.form-text');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.display = 'block';
        messageEl.classList.add('valid');
        messageEl.classList.remove('invalid');
    }
}