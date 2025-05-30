// Імпорт необхідних модулів
import { state } from './state.js';
import {
    authContainer,
    appContainer,
    loginForm,
    registerForm,
    currentUserElement,
    logoutBtn,
    friendsContainer,
    loadingIndicator,
    errorMessage,
    searchInput,
    clearSearch,
    genderFilter,
    ageFilter,
    sortBy,
    pagination
} from './constants.js';

import { initAuth, showApp, showAuth, handleLogout } from './auth/auth.js';
import { validateLogin, validateSignup } from './auth/validation.js';
import {
    showForm,
    togglePassword,
    populateCities,
    setError,
    setSuccess
} from './auth/ui.js';

import { fetchFriends } from './friends/api.js';
import {
    applyFiltersAndSort,
    handleSearch,
    handleFilterChange,
    handleSortChange
} from './friends/filters.js';
import {
    renderFriends,
    showFavorites,
    showAllFriends,
    toggleFavorite,
    setupMainEventListeners
} from './friends/rendering.js';
import {
    renderPagination,
    handlePageChange,
    handleScroll
} from './friends/pagination.js';

import {
    updateURL,
    clearSearchHandler,
    handlePopState
} from './utils/helpers.js';
import { debounce } from './utils/debounce.js';

// Ініціалізація додатку
function setupEventListeners() {
    // Auth event listeners
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function() {
            showForm(this.textContent.toLowerCase());
        });
    });

    loginForm.addEventListener('submit', validateLogin);
    registerForm.addEventListener('submit', validateSignup);
    logoutBtn.addEventListener('click', handleLogout);

    // Search and filters
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    clearSearch.addEventListener('click', clearSearchHandler);
    genderFilter.addEventListener('change', handleFilterChange);
    ageFilter.addEventListener('change', handleFilterChange);
    sortBy.addEventListener('change', handleSortChange);

    // Friends and pagination
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('page-btn')) {
            handlePageChange(parseInt(e.target.dataset.page));
        }

        if (e.target.classList.contains('favorite-btn') || e.target.closest('.favorite-btn')) {
            const btn = e.target.classList.contains('favorite-btn') ? e.target : e.target.closest('.favorite-btn');
            const id = btn.dataset.id;
            toggleFavorite(id);
        }

        if (e.target.classList.contains('toggle-password') || e.target.closest('.toggle-password')) {
            const icon = e.target.classList.contains('toggle-password') ? e.target : e.target.closest('.toggle-password');
            const inputId = icon.parentElement.querySelector('input').id;
            togglePassword(inputId);
        }

        if (e.target.closest('[data-action="toggle-favorites"]')) {
            if (e.target.closest('[data-action="toggle-favorites"]').classList.contains('active')) {
                showAllFriends();
            } else {
                showFavorites();
            }
        }
    });

    // Country select change
    document.getElementById('signup-country')?.addEventListener('change', populateCities);

    // Handle back/forward navigation
    window.addEventListener('popstate', handlePopState);
}

// Ініціалізація додатку
function init() {
    // Ініціалізація автентифікації
    initAuth();

    // Налаштування основних обробників подій
    setupEventListeners();


    // Оновлення URL
    updateURL();

    // Додаємо обробник скролу
    window.addEventListener('scroll', handleScroll);
}

// Запуск додатку після завантаження DOM
document.addEventListener('DOMContentLoaded', init);

// Експортуємо функції, які можуть знадобитися в інших модулях
export {
    state,
    showApp,
    showAuth,
    renderFriends,
    renderPagination
};