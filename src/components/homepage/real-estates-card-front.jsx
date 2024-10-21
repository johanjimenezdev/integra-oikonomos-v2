import { Box, Paper, Typography } from '@mui/material'
import realEstatesIcon from '../../assets/real-estates-icon.svg'

function RealEstatesCardFront() {
  return (
    <Paper sx={{ borderRadius: '1rem' }}>
      <Box
        display="flex"
        minHeight={250}
        justifyContent="center"
        alignItems="center"
        p={1.6}
        textAlign="center"
      >
        <Box>
          <Typography fontSize={20} fontWeight={500} color="primary.main">
            Línea de <span style={{ color: '#015646' }}>vivienda</span>
          </Typography>
          <img
            src={realEstatesIcon}
            alt="real-states-icon"
            width="50%"
            style={{ maxWidth: 200, marginTop: 24 }}
          />
        </Box>
      </Box>
    </Paper>
  )
}

export default RealEstatesCardFront
