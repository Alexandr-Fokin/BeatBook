export const DataStore = {
    getUserData: () => JSON.parse(localStorage.getItem('userData') || '{"albums": [], "tracks": [], "folders": [{"id":"liked", "name": "Любимые альбомы"}, {"id":"test", "name": "Тестовая папка"}]}'),
    saveUserData: (data) => localStorage.setItem('userData', JSON.stringify(data))
} 