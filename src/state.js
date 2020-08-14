const cbs = []

export {cbs};

export function getlevelbycode(code) {
    const orgcode = parseInt(code, 10)
    let level = '1';
    if (orgcode % 10000 === 0) {
        level = '1'
    } else if (orgcode % 100 === 0) {
        level = '2'
    } else {
        level = '3'
    }
    return level
}

export default new Proxy({
    orgcode: '110000',
    level: '1',
}, {
    get(target, property) {
        return property in target ? target[property] : '';
    },
    set(target, property, value) {
        if (property === 'orgcode') {
            if (typeof value !== 'string') {
                throw new TypeError(`orgcode must be a string but ${value} [${typeof value}]`);
            }
            target.level = getlevelbycode(value);
        }   
        target[property] = value;
        cbs.forEach(cb => cb())
        return true
    },
}
)