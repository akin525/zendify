import moment from "moment-timezone";

export function formatNumber(
    number: number,
    locale = "en-US",
): string {
    return number.toLocaleString(locale);
}

export function dateTimeFormatter(dateTimeString: string): string {
    if (dateTimeString) {
        const formattedDateTime = moment.tz(dateTimeString, "YYYY-MM-DDTHH:mm:ss.SSSSSSZ", "UTC").format("DD-MM-YYYY HH:mm:ss");
        return formattedDateTime;
    }
}


export function currencyFormatter(price: number | string): string {
    try {
        const NGN = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
        });
        return NGN.format(Number(price));
    } catch (error) {
        return `${price}`;
    }
}

export function makeDashCase(word: string) {
    if (word) {
        const result = word.split(" ").join("-");
        return result;
    }

    return "";
}

export function makeNormalCaseAndRemoveId(word: string) {
    if (word) {
        const splited = word.split("-");
        const result = splited.slice(0, splited.length - 1).join(" ");
        return result;
    }

    return "";
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
        return null; // Return null if the date is not valid
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}