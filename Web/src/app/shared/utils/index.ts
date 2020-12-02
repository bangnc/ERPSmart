

export function parseQueryString(queryString: string): any {
    const dictionary = {};

    // remove the '?' from the beginning of the
    // if it exists
    if (queryString.indexOf('?') === 0) {
        queryString = queryString.substr(1);
    }

    // Step 1: separate out each key/value pair
    const parts = queryString.split('&');

    for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        // Step 2: Split Key/Value pair
        const keyValuePair = p.split('=');

        // Step 3: Add Key/Value pair to Dictionary object
        const key = keyValuePair[0];
        let value = keyValuePair[1];

        // decode URI encoded string
        value = decodeURIComponent(value);
        value = value.replace(/\+/g, ' ');
        dictionary[key] = value;
    }

    // Step 4: Return Dictionary Object
    return dictionary;
}
export function generatorGUID() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
export function validateNum(e: any) {
    if (!e.code) {
        return false;
    }
    // chặn các ký tự ngoại trừ k m b t
    if (e.code.indexOf('Key') !== -1 && e.key !== 'k' && e.key !== 'm' && e.key !== 'b' && e.key !== 't') {
        return false;
    }
    // chặn các ký tự đặc biệt
    if (e.key.match(/[\@#!$%^&*()_+|~=`{}\[\]:";'<>?.\/]/)) {
        return false;
    }
}
export function jsonToUrlencoded(obj: any): any {
    const str = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return str.join('&');
}



