export function getIDFromParams(word: string) {
    if (word) {
        const splited = word.split("-");
        const result = splited[splited.length - 1];
        return result;
    }

    return "";
}