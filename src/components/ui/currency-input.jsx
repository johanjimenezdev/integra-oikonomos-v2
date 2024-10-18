import { TextField } from '@mui/material'
import { NumericFormat } from 'react-number-format'

function CurrencyInput({ name, label, value, onChange }) {
  return (
    <NumericFormat
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      customInput={TextField}
      prefix={'$'}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      fullWidth
    />
  )
}

export default CurrencyInput
