export function     isRequired(value) {
    if(!value) {
        return 'validation-value-is-required';
    }
    if(Array.isArray(value) && !value.length) {
        return 'validation-value-is-required';
    }
    return '';
}

export function isPositiveNumber(value) {
    const digitsOnlyRegexp = /^\d+$/;
    if(!digitsOnlyRegexp.test(value) || value <= 0) {
        return 'validation-value-is-positive-number';
    }
    return '';
}