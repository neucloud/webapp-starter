export const mixin = (source, target) => {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            source[i] = target[i];
        }
    }
    return source;
};

export function isEmptyObject(e) {
    for (let t in e) {
        return !1;
    }
    return !0;
};

export const isHttp = (url) => {
    return /^http|https:\/\//.test(url);
};

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
 function find(list, f) {
     return list.filter(f)[0];
 };
export function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj;
    };

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj);
    if (hit) {
        return hit.copy;
    };

    const copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    });

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
};

let utils = {};
utils.mixin = mixin;

export default utils;
