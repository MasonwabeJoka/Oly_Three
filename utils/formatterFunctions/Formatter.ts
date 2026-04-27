type FormatOptions = {
    locale?: string;
    currency?: string;
};


export function formatDate(date: Date, locale: string = 'en-ZA'): string {
    return new Intl.DateTimeFormat(locale).format(date);
}

export function formatPhoneNumber(phoneNumber: string): string {
    // This is a basic format, adjust regex based on your needs
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

export function formatAddress(address: string): string {
    // Implement based on how you want to format addresses
    return address; 
}

export function formatName(name: string): string {
    return name.split(' ').map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(' ');
}


export function formatRelativeTime(input: Date | string | number, locale: string = 'en-ZA'): string {

    // Check for null or invalid input
    if (!input && input !== 0) {
        console.error('Invalid input to formatRelativeTime:', input);
        return 'Invalid date';
    }

    // Convert input to a Date object
    const inputDate = typeof input === 'number' ? new Date(input)
        : typeof input === 'string' ? new Date(input)
        : input;

    // Additional check if conversion results in an invalid date
    if (isNaN(inputDate.getTime())) {
        console.error('Invalid date provided to formatRelativeTime:', input);
        return 'Invalid date';
    }

    const now = new Date();
    const diffInSeconds = (now.getTime() - inputDate.getTime()) / 1000;
    const diffInDays = Math.floor(diffInSeconds / 86400);

    // Today → show time (e.g., "14:20")
    if (inputDate.toDateString() === now.toDateString()) {
        return inputDate.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (inputDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }

    // 2-6 days ago → abbreviated day name (Mon, Tue, Wed...)
    if (diffInDays < 7) {
        return inputDate.toLocaleDateString(locale, { weekday: 'short' });
    }

    // 7+ days → relative time (1 week, 2 months, 1 year...)
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
    ];

    for (const interval of intervals) {
        if (diffInSeconds >= interval.seconds) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            const plural = count === 1 ? '' : 's';
            return `${count} ${interval.label}${plural}`;
        }
    }

    return 'just now';
}

export function formatTime(input: Date | string | number, locale: string = 'en-ZA'): string {
    // Check for null or invalid input
    if (!input && input !== 0) {
        console.error('Invalid input to formatTime:', input);
        return 'Invalid date';
    }

    // Convert input to a Date object
    const date = typeof input === 'number' ? new Date(input)
        : typeof input === 'string' ? new Date(input)
        : input;

    // Additional check if conversion results in an invalid date
    if (isNaN(date.getTime())) {
        console.error('Invalid date provided to formatTime:', input);
        return 'Invalid date';
    }

    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return date.toLocaleDateString(locale);
}

export function formatPercentage(value: number, locale: string = 'en-ZA'): string {
    return new Intl.NumberFormat(locale, {
        style: 'percent',
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatLargeNumber(value: number, locale: string = 'en-ZA'): string {
    if (value < 100000) {
        return new Intl.NumberFormat(locale).format(value);
    }
    if (value < 1000000) {
        return (value / 1000) + 'K';
    }
    return (value / 1000000) + 'M';
}

export function formatNumberWithCommas(value: number, locale: string = 'en-ZA'): string {
    
    const numberString = new Intl.NumberFormat(locale, {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
    
    return numberString;
}

export function formatNumberWithSpaces(value: number, options: FormatOptions = {}): string {
    const { locale = 'en-ZA' } = options;
    
    // Convert number to string without separators
    const numberString = Math.abs(value).toString();
    
    // Split into integer and decimal parts if any
    const parts = numberString.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1] ? '.' + parts[1] : '';
    
    // Add spaces every 3 digits from right to left
    let formattedInteger = '';
    for (let i = integerPart.length - 1, count = 0; i >= 0; i--) {
        if (count > 0 && count % 3 === 0) {
            formattedInteger = ' ' + formattedInteger;
        }
        formattedInteger = integerPart[i] + formattedInteger;
        count++;
    }
    
    // Add back the sign if negative
    const sign = value < 0 ? '-' : '';
    
    // Use Intl.NumberFormat for locale-specific decimal handling if needed
    const finalNumber = sign + formattedInteger + decimalPart;
    
    return finalNumber;
}
export function formatList(items: string[], locale: string = 'en-ZA'): string {
    return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items);
}

export function sanitizeInput(input: string): string {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

export function formatFileSize(bytes: number, decimalPoint: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimalPoint < 0 ? 0 : decimalPoint;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

type Currency = 'ZAR' | 'USD' | 'EUR' | 'GBP'; // Extend this list with more currencies as needed

interface PriceFormatOptions {
    locale?: string;
    currency?: Currency;
    showCurrency?: boolean; // Determines if currency is shown at the end of amount
    useGrouping?: boolean; // Whether to use grouping separators, such as thousands separators
    showCents?: boolean; // Determines if decimals are shown
    formatThousands?: boolean; // Determines if K suffix is shown for thousands    
    formatMillions?: boolean; // Determines if K suffix is shown for millions    
}

export function formatPrice(value: number, options?: PriceFormatOptions): string {
    const {
        locale = 'en-ZA',
        currency = 'ZAR',
        showCurrency = true,
        useGrouping = true,
        showCents = false,
        formatThousands = true,
        formatMillions = true,
    } = options || {};

    const fractionDigits = showCents ? 2 : 0;

    let formattedValue: string;
    let baseValue = value;
    let suffix = '';

    if (value >= 1000000 && formatMillions) {
        baseValue = value / 1000000;
        suffix = 'M';
    } else if (value >= 1000 && formatThousands) {
        baseValue = value / 1000;
        suffix = 'K';
    }

    formattedValue = new Intl.NumberFormat(locale, {
        style: showCurrency ? 'currency' : 'decimal',
        currency: currency,
        useGrouping: useGrouping,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }).format(baseValue);

    // Append suffix after currency formatting
    formattedValue = `${formattedValue}${suffix}`;

    // Prepend "R" only if showCurrency is false
    return showCurrency ? formattedValue : `R${formattedValue}`;
}



// Example Usage

/*

import * as Formatter from './path/to/formatter';

const formattedDate = Formatter.formatDate(new Date());
const formattedPhone = Formatter.formatPhoneNumber('1234567890');
const relativeTime = Formatter.formatRelativeTime(new Date(Date.now() - 3600 * 1000)); // 1 hour ago
const formattedPercentage = Formatter.formatPercentage(0.123); // "12.3%"
const formattedLargeNumber = Formatter.formatLargeNumber(12345); // "12.3K"
const formattedList = Formatter.formatList(['Apples', 'Oranges', 'Bananas']); // "Apples, Oranges, and Bananas"
const sanitizedText = Formatter.sanitizeInput('<script>alert("xss")</script>'); // "&lt;script&gt;alert("xss")&lt;/script&gt;"
const formattedFileSize = Formatter.formatFileSize(1024); // "1 KB"
const formattedPrice = formatPrice(95000, { showCents: true })
or
formatPrice(95000, { currency: 'USD', showCents: true })


*/