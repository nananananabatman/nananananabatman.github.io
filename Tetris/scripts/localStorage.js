let map,
    localStorageObject = {
        addValueToStorage(name, score) {
            if(!map.has(name) || (map.has(name) && map.get(name) < score)) {
                map.set(name, score);
            }
        },
        getData(name) {
            return map.get(name);
        },
        getFromStorage() {
            map = new Map();
            if (localStorage.length !== 0) {
                for(let i = 0; i < localStorage.length; ++i) {
                    map.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
                }
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
