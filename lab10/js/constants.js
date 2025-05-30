// DOM Elements
export const authContainer = document.querySelector('.form-container');
export const appContainer = document.getElementById('app-container');
export const loginForm = document.getElementById('login');
export const registerForm = document.getElementById('signup');
export const currentUserElement = document.getElementById('current-user');
export const logoutBtn = document.getElementById('logout-btn');
export const friendsContainer = document.getElementById('friends-container');
export const loadingIndicator = document.getElementById('loading-indicator');
export const errorMessage = document.getElementById('error-message');
export const searchInput = document.getElementById('search-input');
export const clearSearch = document.getElementById('clear-search');
export const genderFilter = document.getElementById('gender-filter');
export const ageFilter = document.getElementById('age-filter');
export const sortBy = document.getElementById('sort-by');
export const pagination = document.getElementById('pagination');

// Validation patterns
export const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
export const phoneRegex = /^\+380\d{9}$/;
export const usernameRegex = /^(?=(.*\d){2,}).{6,}$/;
export const emailRegex = /^\S+@\S+\.\S+$/;