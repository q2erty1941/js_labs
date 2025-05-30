import { nameRegex, phoneRegex, usernameRegex, emailRegex } from '../constants.js';
import { setError, setSuccess } from './ui.js';
import { state } from '../state.js';
import { showApp } from './auth.js';

export function validateSignup(event) {
    event.preventDefault();
    let valid = true;

    const firstName = document.getElementById('signup-firstname');
    const lastName = document.getElementById('signup-lastname');
    const email = document.getElementById('signup-email');
    const phone = document.getElementById('signup-phone');
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('signup-confirm');
    const country = document.getElementById('signup-country');
    const city = document.getElementById('signup-city');
    const dob = document.getElementById('signup-dob');
    const sexSelected = document.querySelector('input[name="signup-sex"]:checked');

    // Validate first name
    if (!nameRegex.test(firstName.value.trim())) {
        setError(firstName, 'First name can only contain letters and spaces');
        valid = false;
    } else {
        setSuccess(firstName, 'Looks good');
    }

    // Validate last name
    if (!nameRegex.test(lastName.value.trim())) {
        setError(lastName, 'Last name can only contain letters and spaces');
        valid = false;
    } else {
        setSuccess(lastName, 'Looks good');
    }

    // Validate email
    if (!emailRegex.test(email.value.trim())) {
        setError(email, 'Invalid email format');
        valid = false;
    } else {
        setSuccess(email, 'Looks good');
    }

    // Validate phone (Ukrainian format)
    if (!phoneRegex.test(phone.value.trim())) {
        setError(phone, 'Please provide a valid Ukrainian phone number (+380XXXXXXXXX)');
        valid = false;
    } else {
        setSuccess(phone, 'Looks good');
    }

    // Validate password
    if (password.value.length < 6) {
        setError(password, 'Password must be at least 6 characters');
        valid = false;
    } else {
        setSuccess(password, 'Looks good');
    }

    // Validate confirm password
    if (confirmPassword.value !== password.value) {
        setError(confirmPassword, 'Passwords do not match');
        valid = false;
    } else {
        setSuccess(confirmPassword, 'Looks good');
    }

    // Validate date of birth
    if (!dob.value) {
        setError(dob, 'Please provide your date of birth');
        valid = false;
    } else {
        setSuccess(dob, 'Looks good');
    }

    // Validate country
    if (!country.value) {
        setError(country, 'Please select your country');
        valid = false;
    } else {
        setSuccess(country, 'Looks good');
    }

    // Validate city
    if (!city.value) {
        setError(city, 'Please select your city');
        valid = false;
    } else {
        setSuccess(city, 'Looks good');
    }

    // Validate sex
    if (!sexSelected) {
        const sexError = document.getElementById('signup-dob-text');
        sexError.style.display = 'block';
        sexError.innerText = 'Please select your sex';
        valid = false;
    }

    if (valid) {
        state.currentUser = {
            name: firstName.value.trim() + ' ' + lastName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim()
        };

        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        document.getElementById('signup').reset();
        showApp();
    }
}

export function validateLogin(event) {
    event.preventDefault();
    let valid = true;

    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');

    // Validate username
    if (!usernameRegex.test(username.value.trim())) {
        setError(username, 'Username must be at least 6 characters long and contain at least 2 digits');
        valid = false;
    } else {
        setSuccess(username, 'Looks good');
    }

    // Validate password
    if (password.value.length < 6) {
        setError(password, 'Password must be at least 6 characters');
        valid = false;
    } else {
        setSuccess(password, 'Looks good');
    }

    if (valid) {
        state.currentUser = {
            name: username.value.trim(),
            email: username.value.trim() + '@example.com'
        };

        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        document.getElementById('login').reset();
        showApp();
    }
}