import { state } from '../state.js';
import { searchInput, genderFilter, ageFilter, sortBy } from '../constants.js';
import { applyFiltersAndSort } from '../friends/filters.js';
import { renderFriends } from '../friends/rendering.js';
import { renderPagination } from '../friends/pagination.js';

export function updateURL() {
    const params = new URLSearchParams();

    if (state.searchTerm) params.set('search', state.searchTerm);
    if (state.filters.gender !== 'all') params.set('gender', state.filters.gender);
    if (state.filters.age !== 'all') params.set('age', state.filters.age);
    if (state.sortBy !== 'name-asc') params.set('sort', state.sortBy);
    if (state.currentPage > 1) params.set('page', state.currentPage);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState(null, '', newUrl);
}

export function handlePopState() {
    const params = new URLSearchParams(window.location.search);

    state.searchTerm = params.get('search') || '';
    state.filters.gender = params.get('gender') || 'all';
    state.filters.age = params.get('age') || 'all';
    state.sortBy = params.get('sort') || 'name-asc';
    state.currentPage = parseInt(params.get('page')) || 1;

    searchInput.value = state.searchTerm;
    genderFilter.value = state.filters.gender;
    ageFilter.value = state.filters.age;
    sortBy.value = state.sortBy;

    applyFiltersAndSort();
    renderFriends();
    renderPagination();
}

export function clearSearchHandler() {
    searchInput.value = '';
    state.searchTerm = '';
    applyFiltersAndSort();
    renderFriends();
    renderPagination();
    updateURL();
}