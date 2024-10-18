import { Box, Link, Typography } from '@mui/material'

function CardOption({ icon, label, href }) {
  return (
    <Box
      height={40}
      sx={{ '&:hover': { color: 'primary.main', cursor: 'pointer' } }}
    >
      <Link
        href={href}
        underline="none"
        sx={{ display: 'flex', gap: 1.6, color: 'inherit' }}
      >
        <Box display="flex" alignItems="center" color="primary.main">
          {icon}
        </Box>
        <Typography fontSize={20}>{label}</Typography>
      </Link>
    </Box>
  )
}

export default CardOption
