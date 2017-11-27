let map,
    localStorageObject = {
        addValueToStorage(name, score) {
            if(!map.has(name) || (map.has(name) && map.get(name) < score)) {
                map.set(name, score);
            }
        },
        getFromStorage() {
            map = new Map();
            if (localStorage.length !== 0) {
                for(let i = 0; i < localStorage.length; ++i) {
                    map.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
                }

                localStorage.clear();
            }

            return map;
        },
        updateStorage() {
            map.forEach((value, key) => {
                localStorage.setItem(key, value);
            });
        }
    };

export {localStorageObject};
