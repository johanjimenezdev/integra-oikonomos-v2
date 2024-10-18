import { TextField } from '@mui/material'

function CustomInput({ type, name, label, value, onChange }) {
  return (
    <TextField
      type={type}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onWheel={e => {
        e.target.blur()
      }}
      fullWidth
    />
  )
}
export default CustomInput
