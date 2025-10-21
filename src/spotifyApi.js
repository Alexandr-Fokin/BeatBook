export async function getToken() {
    const clientId = "123cf0a0417247469d4fcbb8b7ec89c1";
    const clientSecret = "5301e8e323874ec3a88bfae30b253c7c";

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token; // вот его потом используем в других запросах
}
export async function searchAlbumsData(searchValue) {
    const token = await getToken();
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            searchValue
        )}&type=album&limit=20`,
        {
            headers: { Authorization: "Bearer " + token },
        }
    );
    const data = await response.json();
    console.log(data.albums.items);
    return (data.albums.items)
}