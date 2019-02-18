export function sanitize(value) {
    if(!value) {
        return '';
    }

    if('string' !== typeof value) {
        value = '' + value;
    }

    return value.trim();
}

export function sanitizeArray(value) {
    if(!value) {
        return [];
    }

    if(Array.isArray(value)) {
        return value
            .map(v => sanitize(v))
            .filter(v => v);
    }

    return [];
}

export function sanitizeNumber(value) {
    if(!value) {
        return '';
    }

    if('number' === typeof value) {
        return value;
    }

    return sanitize(value);
}