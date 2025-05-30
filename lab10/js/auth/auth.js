import { state } from '../state.js';
import { authContainer, appContainer, currentUserElement } from '../constants.js';
import { setupAuthEventListeners } from './ui.js';
import { fetchFriends } from '../friends/api.js';
import { handleScroll } from '../friends/pagination.js';

export function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        state.currentUser = JSON.parse(user);
        showApp();
    } else {
        showAuth();
    }
}

export function showAuth() {
    authContainer.classList.remove('hidden');
    appContainer.classList.add('hidden');
}

export function showApp() {
    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
    currentUserElement.textContent = `Welcome, ${state.currentUser.name}`;
    window.addEventListener('scroll', handleScroll);
    fetchFriends();
}

export function handleLogout() {
    window.removeEventListener('scroll', handleScroll);
    localStorage.removeItem('currentUser');
    state.currentUser = null;
    showAuth();
}

export function initAuth() {
    checkAuth();
    setupAuthEventListeners();
}