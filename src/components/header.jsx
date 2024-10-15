import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import fullLogo from '../assets/full-logo.svg'
import { useContext, useState } from 'react'
import { AccountCircleOutlined, LogoutOutlined } from '@mui/icons-material'
import { AuthContext } from '../firebase/context/auth-provider'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../store/session'

function Header() {
  const [anchorEl, setAnchorEl] = useState(null)
  const { logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const { session } = useSession()

  const handleSignOut = () => {
    logOut().then(() => navigate('/login'))
  }

  return (
    <AppBar
      elevation={4}
      sx={{ bgcolor: 'background.paper', color: 'inherit', borderRadius: 0 }}
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', p: 0.8 }}>
        <Box display="flex" height={48} alignItems="stretch">
          <IconButton sx={{ p: 1.2, mx: 0.5 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="inherit"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </IconButton>
          <Link href="/" display="flex" alignItems="center">
            <img src={fullLogo} alt="oikonomos-logo" width={180} />
          </Link>
        </Box>

        <Box>
          <IconButton
            onClick={e => setAnchorEl(e.currentTarget)}
            sx={{ width: 48, height: 48, p: 0 }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                textTransform: 'uppercase'
              }}
            >
              {session.auth ? session.name[0] : ' '}
            </Avatar>
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: '1rem'
                }
              }
            }}
            transitionDuration={0}
          >
            <MenuItem
              disableRipple
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Avatar
                src={session.photo}
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: 'primary.main',
                  textTransform: 'uppercase'
                }}
              >
                {session.auth ? session.name[0] : ' '}
              </Avatar>
              <Typography
                mt={0.7}
                fontSize={14}
              >{`${session.name.split(' ')[0]} ${
                session.lastName.split(' ')[0]
              }`}</Typography>
              <Typography fontSize={14}>{session.emailIntegra}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14 }}
                primary="Cerrar sesión"
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
