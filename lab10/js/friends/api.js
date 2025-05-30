import { state } from '../state.js';
import { loadingIndicator, errorMessage } from '../constants.js';
import { applyFiltersAndSort } from './filters.js';
import { renderFriends } from './rendering.js';
import { renderPagination } from './pagination.js';

export async function fetchFriends() {
    try {
        if (state.isLoading) return;

        state.isLoading = true;
        loadingIndicator.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        const response = await fetch(
            `https://randomuser.me/api/?page=${state.currentPage}&results=${state.itemsPerPage}&seed=friendconnect`
        );

        if (!response.ok) throw new Error('Failed to fetch friends');

        const data = await response.json();

        const newFriends = data.results.map(user => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            firstName: user.name.first,
            lastName: user.name.last,
            age: user.dob.age,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            picture: user.picture.large,
            location: `${user.location.city}, ${user.location.country}`,
            registered: new Date(user.registered.date)
        }));

        state.friends = [...state.friends, ...newFriends];
        state.loadedPages = state.currentPage;

        applyFiltersAndSort();
        renderFriends();
        renderPagination();

    } catch (err) {
        state.error = err.message;
        errorMessage.textContent = `Error: ${err.message}`;
        errorMessage.classList.remove('hidden');
        state.currentPage--;
    } finally {
        state.isLoading = false;
        loadingIndicator.classList.add('hidden');
    }
}