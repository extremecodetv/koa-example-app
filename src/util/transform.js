
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const shift = (item) => item.split('.').shift();


exports.transformArray = (arr) => {
    const result = [];
    if (arr instanceof Array) {
        arr.forEach(index => {
            result.push(capitalize(shift(index)));
        });
    } else {
        throw Error('Argument must be type of Array');
    }

    return result;
};

/**
 * Вспомогательная функция которая преобразует имена объектов
 * для экспорта, путем отбрасывания всего что находится после точки
 * (user.model => User)
 * P.S.
 * Люблю JS, как собака палку
 */
exports.transformObject = (obj) => {
    Object.keys(obj).forEach(key => {
        const name = capitalize(shift(key));
        obj[name] = obj[key];
        delete obj[key];
    });

    return obj;
};
