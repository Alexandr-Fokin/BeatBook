export const DataStore = {
    getUserData: () => {
        try {
            const data = JSON.parse(localStorage.getItem("userData"));
            if (data && typeof data === "object") return data;
        } catch (e) {
            // ignore parse error
        }
        const defaultData = {
            albums: [],
            tracks: [],
            folders: [
                { id: "liked", name: "Любимые альбомы" },
                { id: "test", name: "Тестовая папка" },
            ],
        };
        localStorage.setItem("userData", JSON.stringify(defaultData));
        return defaultData;
    },

    saveUserData: (data) => {
        localStorage.setItem("userData", JSON.stringify(data));
    },
};