import { LogoutOutlined, NotificationsOutlined } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography
} from '@mui/material'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fullLogo from '../assets/full-logo.svg'
import { AuthContext } from '../firebase/context/auth-provider'
import { useSession } from '../store/session'
import Notification from './notification'

function Header({ notifications }) {
  const [anchorProfile, setAnchorProfile] = useState(null)
  const [anchorNotifications, setAnchorNotifications] = useState(null)
  const { logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const { session } = useSession()
  const unreadNotifications = notifications
    .filter(item => item.isRead === false)
    .map(notif => notif.isRead)

  if (notifications.length) {
    // notifications.sort((x, y) => {
    //   return x.isRead === y.isRead ? 0 : x.isRead ? 1 : -1
    // })
    notifications.sort((x, y) => y.date - x.date)
  }

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
        <Box display="flex" gap={0.6}>
          <Box>
            <IconButton
              onClick={e => setAnchorNotifications(e.currentTarget)}
              sx={{ width: 48, height: 48, p: 0 }}
            >
              <Badge
                badgeContent={notifications.length}
                color="error"
                invisible={unreadNotifications.length <= 0 ? true : false}
              >
                <NotificationsOutlined />
              </Badge>
            </IconButton>
            <Popover
              open={Boolean(anchorNotifications)}
              onClose={() => setAnchorNotifications(null)}
              anchorEl={anchorNotifications}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: '12px',
                    width: { xs: 320, sm: 480 },
                    maxWidth: { xs: 320, sm: 480 },
                    maxHeight: '50vh',
                    overflow: 'hidden'
                  }
                }
              }}
              transitionDuration={0}
            >
              <Box position="sticky" top={0} left={0} bgcolor="inherit">
                <Typography sx={{ px: 1.6, py: 1.2 }}>
                  Notificaciones
                </Typography>
                <Divider />
              </Box>
              <Box
                id="scroll_thin"
                height="100%"
                maxHeight="calc(50vh - 49px)"
                overflow="auto"
              >
                {notifications.length ? (
                  notifications.map(notif => (
                    <Notification key={notif.id} notif={notif} />
                  ))
                ) : (
                  <Box px={1.6} py={3.2}>
                    <Typography
                      fontStyle="italic"
                      fontSize={14}
                      textAlign="center"
                    >
                      No tienes notificaciones por mostrar.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Popover>
          </Box>
          <Box>
            <IconButton
              onClick={e => setAnchorProfile(e.currentTarget)}
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
                {session.name[0]}
              </Avatar>
            </IconButton>
            <Menu
              open={Boolean(anchorProfile)}
              onClose={() => setAnchorProfile(null)}
              anchorEl={anchorProfile}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: '12px'
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
                  {session.name[0]}
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
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
