import searchIndex from "../../../content/search/index.json"

export const getLocalSearchIndex = () => {
    return searchIndex;
}

export const shortify = (text: string, maxLength = 75) => {
    if (text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength) + " ..."
}