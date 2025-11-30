export function findItemType(itemForFindType) {
    if (itemForFindType.type == "album") {
        return itemForFindType.album_type == "album"
            ? "Альбом"
            : itemForFindType.album_type == "single"
                ? "Сингл"
                : "Неизвестно что :(";
    }
    if (itemForFindType.type == "track") {
        return "Трек";
    } else {
        return "Неизвестно что :(";
    }
}