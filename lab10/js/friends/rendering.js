import { state } from '../state.js';
import { friendsContainer, pagination } from '../constants.js';
import {handlePageChange, renderPagination} from './pagination.js';
import { applyFiltersAndSort } from './filters.js';

// Функція для оновлення стану та localStorage


export function renderFriends() {
    if (state.filteredFriends.length === 0) {
        friendsContainer.innerHTML = '<div class="no-results">No friends found matching your criteria</div>';
        pagination.classList.add('hidden');
        return;
    }

    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    const paginatedFriends = state.filteredFriends.slice(start, end);

    friendsContainer.innerHTML = paginatedFriends.map(friend => {
        if (!friend.id) {
            console.error('Friend object is missing id:', friend);
            return '';
        }

        const isFavorite = state.favorites.includes(friend.id);
        return `
            <div class="friend-card" data-id="${friend.id}">
                <div class="card-header">
                    <img src="${friend.picture}" alt="${friend.name}">
                    <span class="card-badge">${friend.gender === 'male' ? '♂' : '♀'} ${friend.age}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${friend.name}</h3>
                    <p class="card-text"><i class="fas fa-envelope"></i> ${friend.email}</p>
                    <p class="card-text"><i class="fas fa-phone"></i> ${friend.phone}</p>
                    <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${friend.location}</p>
                </div>
                <div class="card-footer">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            data-id="${friend.id}"
                            aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="view-profile">View Profile</button>
                </div>
            </div>
        `;
    }).join('');

    pagination.classList.remove('hidden');
}

export function showFavorites() {
    const favoritesBtn = document.querySelector('.favorites-btn');
    favoritesBtn.classList.add('active');

    if (state.favorites.length === 0) {
        friendsContainer.innerHTML = '<div class="no-results">You have no favorites yet</div>';
        pagination.classList.add('hidden');
        return;
    }

    const favoriteFriends = state.friends.filter(friend => {
      return state.favorites.includes(friend.id)
    });

    if (favoriteFriends.length === 0) {
        friendsContainer.innerHTML = '<div class="no-results">Your favorites will appear here</div>';
        pagination.classList.add('hidden');
        return;
    }

    friendsContainer.innerHTML = favoriteFriends.map(friend => `
        <div class="friend-card" data-id="${friend.id}">
            <div class="card-header">
                <img src="${friend.picture}" alt="${friend.name}">
                <span class="card-badge">${friend.gender === 'male' ? '♂' : '♀'} ${friend.age}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${friend.name}</h3>
                <p class="card-text"><i class="fas fa-envelope"></i> ${friend.email}</p>
                <p class="card-text"><i class="fas fa-phone"></i> ${friend.phone}</p>
                <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${friend.location}</p>
            </div>
            <div class="card-footer">
                <button class="favorite-btn active" data-id="${friend.id}" aria-label="Remove from favorites">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="view-profile">View Profile</button>
            </div>
        </div>
    `).join('');

    pagination.classList.add('hidden');
}

export function showAllFriends() {
    document.querySelector('.favorites-btn').classList.remove('active');
    applyFiltersAndSort();
    renderFriends();
    renderPagination();
}

export function toggleFavorite(id) {
   const index = state.favorites.indexOf(id);

    if(index === -1) {
        state.favorites.push(id);
    } else {
        state.favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(state.favorites));

    if(document.querySelector('.favorites-btn').classList.contains('active')) {
        showFavorites();
    } else {
        renderFriends();
    }

}


export function setupMainEventListeners() {

    document.querySelector('.favorites-btn').addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            showFavorites();
        } else {
            showAllFriends();
        }
    });

    friendsContainer.addEventListener('click', (e) => {
        const favoriteBtn = e.target.closest('.favorite-btn');
        if (favoriteBtn) {
            e.preventDefault();
            const id = favoriteBtn.getAttribute('data-id');
            if (id) {
                toggleFavorite(id);
            } else {
                console.error('Favorite button has no data-id attribute');
            }
        }
    });


    document.addEventListener('click' , function (e) {
        if(e.target.classList.contains('active')) {
            handlePageChange(parseInt(e.target.dataset.page));
        }

        // if(i.target.classList.contains('favorite-btn') || e.target.closest('.favorite-btn')) {
        //     const btn = e.target.classList.contains('favorite-btn') ? e.target : e.target.closest('.favorite-btn');
        //
        //     const id = btn.dataset.id;
        //     toggleFavorite(id);
        // }
    })

    // document.querySelector('.favorite-btn').addEventListener('click', function() {
    //     if(this.classList.contains('active')) {
    //         showAllFriends();
    //     } else {
    //         showFavorites()
    //     }
    // })
}