import { Box, Grid2, Link, Paper, Typography } from '@mui/material'
import statesIcon from '../../assets/states-icon.svg'

function StatesCard() {
  return (
    <Paper sx={{ borderRadius: '1rem' }}>
      <Link href="/" underline="none" color="inherit">
        <Grid2 container minHeight={250} maxHeight={250} p={2.4} spacing={2.4}>
          <Grid2
            size={{ xs: 12, md: 6 }}
            sx={{ textAlign: { xs: 'center', md: 'start' } }}
          >
            <Typography fontSize={20} fontWeight={600} color="primary.main">
              Mis <span style={{ color: '#015646' }}>negocios</span>
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <Box
              display="flex"
              sx={{ justifyContent: { xs: 'center', md: 'end' } }}
            >
              <img
                src={statesIcon}
                alt="states-icon"
                width="50%"
                style={{ maxWidth: 200 }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Link>
    </Paper>
  )
}

export default StatesCard
