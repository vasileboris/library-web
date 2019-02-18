export default function validate(value, rules) {
    for(let rule of rules) {
        const message = rule(value);
        if(message) {
            return message;
        }
    }
    return '';
}