import { Box, Typography } from '@mui/material'

function Loading() {
  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      left={0}
    >
      <Typography>Cargando ...</Typography>
    </Box>
  )
}

export default Loading
