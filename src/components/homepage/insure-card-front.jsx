import { Box, Paper, Typography } from '@mui/material'
import insureIcon from '../../assets/insure-icon.svg'

function InsureCardFront() {
  return (
    <Paper elevation={4} sx={{ borderRadius: '1rem' }}>
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
            Línea de <span style={{ color: '#015646' }}>seguros</span>
          </Typography>
          <img
            src={insureIcon}
            alt="insure-icon"
            width="50%"
            style={{ maxWidth: 200, marginTop: 24 }}
          />
        </Box>
      </Box>
    </Paper>
  )
}

export default InsureCardFront
