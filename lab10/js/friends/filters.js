import { state } from '../state.js';
import { renderFriends } from './rendering.js';
import { renderPagination } from './pagination.js';
import { updateURL } from '../utils/helpers.js';

export function applyFiltersAndSort() {
    if (!state.friends?.length) {
        state.filteredFriends = [];
        return;
    }

    let filtered = [...state.friends];

    // Пошук за ім'ям
    if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase();
        filtered = filtered.filter(friend =>
            friend.name.toLowerCase().includes(term)
        );
    }

    // Фільтрація за статтю
    if (state.filters.gender !== 'all') {
        filtered = filtered.filter(friend =>
            friend.gender === state.filters.gender
        );
    }

    // Фільтрація за віком
    if (state.filters.age !== 'all') {
        const [min, max] = state.filters.age.split('-').map(Number);
        filtered = filtered.filter(friend =>
            max ? friend.age >= min && friend.age <= max : friend.age >= min
        );
    }

    // Сортування
    const [sortKey, sortDirection] = (state.sortBy || 'name-asc').split('-');
    filtered.sort((a, b) => {
        let comparison = 0;
        switch (sortKey) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'age':
                comparison = a.age - b.age;
                break;
            case 'registered':
                comparison = new Date(a.registered) - new Date(b.registered);
                break;
        }
        return sortDirection === 'desc' ? -comparison : comparison;
    });

    state.filteredFriends = filtered;
}

function updateAndRender() {
    state.currentPage = 1;
    applyFiltersAndSort();
    renderFriends();
    renderPagination();
    updateURL();
}

export function handleSearch() {
    const searchInput = document.getElementById('search-input');
    state.searchTerm = searchInput?.value.trim() || '';
    updateAndRender();
}

export function handleFilterChange() {
    const genderFilter = document.getElementById('gender-filter');
    const ageFilter = document.getElementById('age-filter');
    state.filters = {
        gender: genderFilter?.value || 'all',
        age: ageFilter?.value || 'all'
    };
    updateAndRender();
}

export function handleSortChange() {
    const sortBy = document.getElementById('sort-by');
    state.sortBy = sortBy?.value || 'name-asc';
    updateAndRender();
}