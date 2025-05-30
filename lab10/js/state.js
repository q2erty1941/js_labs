export const state = {
    currentUser: null,
    friends: [],
    filteredFriends: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    currentPage: 1,
    itemsPerPage: 30,
    isLoading: false,
    error: null,
    searchTerm: '',
    filters: {
        gender: 'all',
        age: 'all'
    },
    sortBy: 'name-asc',
    loadedPages: 0
};