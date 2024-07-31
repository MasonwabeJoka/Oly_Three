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

export function formatRelativeTime(input: Date | string, locale: string = 'en-ZA'): string {

      // Check for null or invalid input
      if (!input) {
        console.error('Invalid input to formatRelativeTime:', input);
        return 'Invalid date'; // or any other default/error message
    }

    // Convert input to a Date object if it's a string
    const inputDate = typeof input === 'string' ? new Date(input) : input;

      // Additional check if conversion results in an invalid date
      if (isNaN(inputDate.getTime())) {
        console.error('Invalid date provided to formatRelativeTime:', input);
        return 'Invalid date'; // or any other default/error message
    }

    const now = new Date();
    const diffInSeconds = (now.getTime() - inputDate.getTime()) / 1000;

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    // Define time intervals in seconds
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        if (diffInSeconds >= interval.seconds) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            return rtf.format(-count, interval.label as Intl.RelativeTimeFormatUnit);
        }
    }

    return 'just now'; // For times less than a second
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

    if (value < 100000) {
        formattedValue = new Intl.NumberFormat(locale, {
            style: showCurrency ? 'currency' : 'decimal',
            currency: currency,
            useGrouping: useGrouping,
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        }).format(value);
    } else {
        let suffix = '';
        let baseValue = value;

        if (value >= 1000000 && formatMillions) {
            baseValue = value / 1000000;
            suffix = 'M';
        } else if (value >= 1000 && formatThousands) {
            baseValue = value / 1000;
            suffix = 'K';
        }

        formattedValue = new Intl.NumberFormat(locale, {
            useGrouping: useGrouping,
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        }).format(baseValue) + suffix;
    }

    // Prepend "R" to the formatted value only if showCurrency is false
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