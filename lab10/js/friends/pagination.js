import { state } from '../state.js';
import { pagination } from '../constants.js';
import { fetchFriends } from './api.js';
import { applyFiltersAndSort } from './filters.js';
import { renderFriends } from './rendering.js';
import { updateURL } from '../utils/helpers.js';

export function renderPagination() {
    const totalPages = state.loadedPages + 1;

    if (totalPages <= 1) {
        pagination.classList.add('hidden');
        return;
    }

    let paginationHTML = '';

    paginationHTML += `
        <button class="page-btn ${state.currentPage === 1 ? 'disabled' : ''}" 
                ${state.currentPage === 1 ? 'disabled' : ''}
                data-page="${state.currentPage - 1}">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    paginationHTML += `
        <button class="page-btn ${state.currentPage === totalPages ? 'disabled' : ''}" 
                ${state.currentPage === totalPages ? 'disabled' : ''}
                data-page="${state.currentPage + 1}">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

export function handlePageChange(page) {
    if (page < 1) return;

    state.currentPage = page;

    if (page > state.loadedPages) {
        fetchFriends();
    } else {
        applyFiltersAndSort();
        renderFriends();
        renderPagination();

        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.page) === state.currentPage);
        });
    }

    updateURL();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function handleScroll() {
    const appContainer = document.getElementById('app-container');
    if (appContainer.classList.contains('hidden') ||
        state.isLoading ||
        document.querySelector('.favorites-btn').classList.contains('active')) {
        return;
    }

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollThreshold = 100;
    const nearBottom = scrollTop + clientHeight >= scrollHeight - scrollThreshold;

    if (nearBottom) {
        const totalPages = Math.ceil(state.filteredFriends.length / state.itemsPerPage);

        if (state.currentPage < totalPages) {
            handlePageChange(state.currentPage + 1);
        } else if (state.currentPage === state.loadedPages) {
            handlePageChange(state.currentPage + 1);
        }
    }
}