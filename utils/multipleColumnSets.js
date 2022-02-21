const multipleColumnSets = (obj) => {
  const keys = Object.keys(obj)
  const values = Object.values(obj)

  const columnSet = keys.map(key => `${key} = ?`).join(', ')

  return {
    values,
    columnSet
  }
}

const insertData = (obj) => {
  const keys = Object.keys(obj)
  const values = Object.values(obj)

  const setData = `(${keys
    .map(key => `${key}`)
    .join(', ')}) VALUES (${
      keys
      .map(key => '?')
      .join(', ')})`

  return {
    values,
    setData
  }
}

module.exports = {
  multipleColumnSets,
  insertData
}
