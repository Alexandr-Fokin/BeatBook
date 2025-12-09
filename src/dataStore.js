export const DataStore = {
    getUserData: () => {
        try {
            const data = JSON.parse(localStorage.getItem("userData"));
            if (data && typeof data === "object") return data;
        } catch (e) {
            // ignore parse error
        }
        const defaultData = {
            added: [],
            folders: [
                { id: "liked", name: "Избранное", parentId: null, icon: 2 },
                { id: "test", name: "Тестовая папка", parentId: null, icon: 1 },
            ],
        };
        localStorage.setItem("userData", JSON.stringify(defaultData));
        return defaultData;
    },

    saveUserData: (data) => {
        localStorage.setItem("userData", JSON.stringify(data));
    },
};