const PAGO = (tasa, nper, va, vf = 0, tipo = 0) => {
  if (tasa === 0) {
    return -(va + vf) / nper
  }
  const factor = Math.pow(1 + tasa, nper)
  const pago = (tasa * (va * factor + vf)) / (factor - 1)
  if (tipo === 1) {
    return pago / (1 + tasa)
  }
  return -pago
}

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

export { PAGO, findClosest, formatter }
