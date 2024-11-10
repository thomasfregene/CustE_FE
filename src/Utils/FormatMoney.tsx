export const FormatMoney = (number: number | null | undefined, symbol: string | null = null): string => {
    // Default to 0.00 if the number is null or undefined
    number = number ?? 0.00; 

    // Convert number to string and format it
    const formattedNumber = parseFloat(number.toString()).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    switch (symbol) {
        case "NGN":
            return '₦' + formattedNumber;
        case "USD":
            return '$' + formattedNumber;
        case "EUR":
            return '€' + formattedNumber;
        case "GBP":
            return '£' + formattedNumber;
        default:
            return getCurrency() + formattedNumber;
    }
}

export const getCurrency = (): string => {
    const settings = localStorage.getItem("invoiceSetting");
    if (settings !== null) {
        const currency = JSON.parse(settings);
        return currency.symbol || '₦'; // Return '₦' if symbol is not defined
    } else {
        return '₦';
    }
}

export const FormatDollar = (number: number | null | undefined, symbol: string = "$"): string => {
    // Default to 0.00 if the number is null or undefined
    number = number ?? 0.00;

    // Convert number to string and format it
    return symbol + parseFloat(number.toString()).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const FormatMoneyWithoutCurrency = (number: number | null | undefined): string => {
    // Default to 0.00 if the number is null or undefined
    number = number ?? 0.00;

    // Convert number to string and format it
    return parseFloat(number.toString()).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
}
