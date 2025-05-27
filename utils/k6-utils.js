const _env = __ENV.env ?  __ENV.env : 'dev'

const variable = JSON.parse(open(`./../${_env}.env.json`))


export function url(path) {
    return variable.baseUrl + (path ? path : '');
}

export function env(key, byDefault) {
    return variable.hasOwnProperty(key) ? variable[key] : byDefault;
}


export function environment() {
    return _env;
}

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function randomIntBetween(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

export function randomString(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (length--) {
        res += charset[Math.random() * charset.length | 0]
    }
    return res;
}

export function nextItem(items, index) {
    let key= (index < items.length) ? index : (items.length % index)
    return items[key];
}