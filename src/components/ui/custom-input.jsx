import { TextField } from '@mui/material'

function CustomInput(props) {
  return (
    <TextField
      {...props}
      onWheel={e => {
        e.target.blur()
      }}
      fullWidth
    />
  )
}
export default CustomInput
