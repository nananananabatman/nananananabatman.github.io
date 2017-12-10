module.exports = function (source) {
    for (let key in source) {
        if (!isNaN(+key)) {
            delete source[key];
        }
    }

    return source;
};
