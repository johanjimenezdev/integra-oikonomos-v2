import { TextField } from '@mui/material'
import { NumericFormat } from 'react-number-format'

function CurrencyInput({ name, label, value, onChange }) {
  return (
    <NumericFormat
      name={name}
      label={label}
      value={value}
      onValueChange={values => {
        const e = {
          target: {
            name: name,
            value: values.floatValue
          }
        }
        onChange(e)
      }}
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
