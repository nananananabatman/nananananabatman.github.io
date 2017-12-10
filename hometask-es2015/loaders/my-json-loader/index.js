module.exports = function (source) {
    let value = typeof source === "string" ? JSON.parse(source) : source;

    for (let key in value) {
        if (!isNaN(+key)) {
            delete value[key];
        }
    }
    console.log(value);
    return `module.exports = ${JSON.stringify(value)}`;
};
