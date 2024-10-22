const findClosest = (table, target) => {
  let result = null
  for (let i = 0; i < table.length; i++) {
    if (target >= table[i].key) {
      result = table[i].value
    } else {
      break
    }
  }
  return result
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
})

export { findClosest, formatter }
