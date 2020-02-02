export const getFavorites = () => {
    const favoritesDataStorage = localStorage.getItem("favorites");
    let favorites = [];

    if (favoritesDataStorage) {
        favorites = JSON.parse(favoritesDataStorage);
    }

    return favorites;
}

export const setFavorites = (favorites) => {
    const favoritesStr = JSON.stringify(favorites);
    localStorage.setItem("favorites", favoritesStr);
}