import { Box, Paper, Typography } from '@mui/material'
import consumptionIcon from '../../assets/consumption-icon.svg'

function ConsumptionCardFront() {
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
          {' '}
          <Typography fontSize={20} fontWeight={600} color="primary.main">
            Línea de <span style={{ color: '#015646' }}>consumo</span>
          </Typography>
          <img
            src={consumptionIcon}
            alt="consumption-icon"
            width="50%"
            style={{ maxWidth: 200, marginTop: 24 }}
          />
        </Box>
      </Box>
    </Paper>
  )
}

export default ConsumptionCardFront
