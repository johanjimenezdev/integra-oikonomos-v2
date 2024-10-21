import { Box, Link, Paper, Typography, useMediaQuery } from '@mui/material'
import statesIcon from '../../assets/states-icon.svg'
import {
  AttachMoneyOutlined,
  ContentPasteSearchOutlined,
  WorkOutlineOutlined
} from '@mui/icons-material'

function StatesCard() {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Paper
      sx={{
        borderRadius: '1rem',
        transition: 'all 500ms ease',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow:
            '0px 3px 3px -2px rgba(0, 181, 129, 0.2), 0px 3px 4px 0px rgba(0, 181, 129, 0.14), 0px 1px 8px 0px rgba(0, 181, 129, 0.12)'
        }
      }}
    >
      <Link href="/" underline="none" color="inherit">
        <Box
          display="flex"
          width="100%"
          minHeight={250}
          justifyContent="center"
          alignItems="center"
          p={1.6}
          textAlign="center"
        >
          <Box width="100%" height="100%">
            <Typography fontWeight={500} color="primary.main">
              Mis <span style={{ color: '#015646' }}>negocios</span>
            </Typography>
            <img
              src={statesIcon}
              alt="real-states-icon"
              width={100}
              style={{ maxWidth: 200, marginTop: 24 }}
            />
          </Box>
        </Box>
      </Link>
    </Paper>
  )
}

export default StatesCard
