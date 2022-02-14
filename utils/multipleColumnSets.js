const multipleColumnSets = (obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    const columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        values,
        columnSet,
    }
}

module.exports = multipleColumnSets;