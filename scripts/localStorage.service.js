let map;

export class LocalStorageService {
    static addValueToStorage(name, score) {
        if(!map.has(name) || (map.has(name) && map.get(name) < score)) {
            map.set(name, score);
        }
    }

    static getFromStorage() {
        map = new Map();
        if (localStorage.length !== 0) {
            for(let i = 0; i < localStorage.length; ++i) {
                map.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
            }

            localStorage.clear();
        }

        return map;
    }

    static updateStorage() {
        map.forEach((value, key) => {
            localStorage.setItem(key, value);
        });
    }
}
