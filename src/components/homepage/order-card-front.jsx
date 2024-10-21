import { Box, Paper, Typography } from '@mui/material'
import orderIcon from '../../assets/order-icon.svg'

function OrderCardFront() {
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
          <Typography fontWeight={500} color="primary.main">
            Línea de <span style={{ color: '#015646' }}>libranza</span>
          </Typography>
          <img
            src={orderIcon}
            alt="order-icon"
            width="50%"
            style={{ maxWidth: 200, marginTop: 24 }}
          />
        </Box>
      </Box>
    </Paper>
  )
}

export default OrderCardFront
