import {
  Box,
  Button,
  Container,
  Grid2,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import fullLogo from '../assets/full-logo.svg'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../firebase/context/auth-provider'
import { enqueueSnackbar } from 'notistack'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const snackbarProps = {
  variant: 'error',
  anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
  autoHideDuration: 3000
}

function Login() {
  const { logIn, user } = useContext(AuthContext)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = e => {
    e.preventDefault()
    logIn(loginData.email, loginData.password)
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
            enqueueSnackbar('Correo electrónico inválido.', snackbarProps)
            break
          case 'auth/missing-password':
            enqueueSnackbar('Ingrese una contraseña.', snackbarProps)
            break
          case 'auth/wrong-password':
            enqueueSnackbar('Contraseña incorrecta.', snackbarProps)
            break
          case 'auth/user-not-found':
            enqueueSnackbar('Usuario no encontrado.', snackbarProps)
            break
          case 'auth/user-disabled':
            enqueueSnackbar('Usuario deshabilitado.', snackbarProps)
            break
          default:
            enqueueSnackbar(
              'Error desconocido. Comuníquese con soporte técnico.',
              snackbarProps
            )
        }
      })
  }

  const handleRecover = async () => {
    setLoading(true)
    const usersArray = []
    let found = false
    const usersSnapshot = await getDocs(collection(db, 'Users'))
    usersSnapshot.forEach(doc => usersArray.push({ ...doc.data(), id: doc.id }))
    for (let i = 0; i < usersArray.length; i++) {
      if (usersArray[i].emailIntegra === loginData.email) {
        found = true
        const emailInfo = {
          to: usersArray[i].emailPersonal,
          subject: 'Tu cuenta de Integra - recuperación de contraseña',
          html: `<div id=":1u" class="ii gt" jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTgxMzAxMzIzNTc1MDc3MzkyMiJd; 4:WyIjbXNnLWY6MTgxMzAxMzIzNTc1MDc3MzkyMiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLDBd"><div id=":1t" class="a3s aiL msg8124753748133449157"><div class="adM">
 </div><div style="padding:0;margin:0;color:rgb(51,51,51);font-size:13px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:18px"><div class="adM"> 
  </div><div class="m_8124753748133449157mail-wrapper" style="background-color:rgb(255,255,255);margin:0;text-align:center"><div class="adM"> 
   </div><table style="border:0;margin:0;border-spacing:0;table-layout:auto;width:100%;border-collapse:collapse"> 
   </table>
   <table style="border:0;margin:0 auto;border-spacing:0;border-collapse:collapse" align="center"> 
    <tbody style="margin:0">
     <tr style="margin:0">
      <td class="m_8124753748133449157main-table-2" align="center" style="padding:0px 36px 0px 40px;margin:0;color:rgb(51,51,51);width:685px;font-size:13px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:18px"> 
       <table class="m_8124753748133449157content-table-2" style="border:0;margin:0 auto;border-spacing:0;border-collapse:collapse;text-align:left"> 
        <tbody style="margin:0">
         <tr style="margin:0">
          <td class="m_8124753748133449157account-logo-box m_8124753748133449157padding-9 m_8124753748133449157padding-6" style="padding:0;padding-top:32px;margin:0;color:rgb(51,51,51);font-size:13px;padding-bottom:30px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:18px;float:left;text-align:right;margin-right:10px;font-weight:500;color:#00b581">OIKONOMOS</td>
         </tr> 
         <tr style="margin:0">
          <td class="m_8124753748133449157account-content-sf m_8124753748133449157padding-7" style="padding:0;margin:0;color:rgb(51,51,51);font-size:17px;padding-bottom:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:1.3;text-align:left"> Hola, ${usersArray[i].name} ${usersArray[i].lastName}: </td>
         </tr> 
         <tr style="margin:0">
          <td class="m_8124753748133449157account-content-sf m_8124753748133449157padding-7" style="padding:0;margin:0;color:rgb(51,51,51);font-size:17px;padding-bottom:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:1.3;text-align:left"> Tu información de acceso a nuestra plataforma es: </td>
         </tr> 
         <tr style="margin:0">
          <td class="m_8124753748133449157account-content-sf m_8124753748133449157padding-7" style="padding:0;margin:0;color:rgb(51,51,51);font-size:17px;padding-bottom:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:1.3;text-align:left;font-weight:500"> ${usersArray[i].emailIntegra} <br style="margin:0"> </td>
         </tr> 
         <tr style="margin:0">
          <td class="m_8124753748133449157account-content-sf m_8124753748133449157padding-7" style="padding:0;margin:0;color:rgb(51,51,51);font-size:17px;padding-bottom:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:1.3;text-align:left;font-weight:500"> ${usersArray[i].password} </td>
         </tr> 
         <tr style="margin:0">
          <td class="m_8124753748133449157account-content-sf m_8124753748133449157padding-7" style="padding:0;margin:0;color:rgb(51,51,51);font-size:17px;padding-bottom:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:1.3;text-align:left"> Recuerda no compartir esta información con nadie. </td>
         </tr> 
         <tr style="margin:0">
          <td class="m_8124753748133449157account-content-sf m_8124753748133449157padding-7" style="padding:0;margin:0;color:rgb(51,51,51);font-size:17px;padding-bottom:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:1.3;text-align:left"> Atentamente, </td>
         </tr> 
         <tr style="margin:0">
          <td class="m_8124753748133449157account-content-sf m_8124753748133449157padding-5" style="padding:0;margin:0;color:rgb(51,51,51);font-size:17px;padding-bottom:26px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:1.3;text-align:left"> Soporte técnico. </td>
         </tr> 
        </tbody>
       </table> </td>
     </tr> 
     <tr style="margin:0">
      <td style="padding:0;margin:0;color:rgb(51,51,51);width:100%;font-size:13px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:18px" align="center"> 
       <table class="m_8124753748133449157footer-table" style="border:0;margin:0;border-spacing:0;width:100%;font-size:inherit;line-height:18px;border-collapse:collapse;text-align:center"> 
        <tbody style="margin:0">
         <tr style="margin:0">
          <td class="m_8124753748133449157footer-cell" style="padding:0 18px 18px 18px;margin:0;color:rgb(102,102,102);font-size:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:15px;text-align:center"> 
           <table class="m_8124753748133449157footer-table" style="border:0;margin:0;border-spacing:0;width:100%;font-size:inherit;line-height:18px;border-collapse:collapse;text-align:center"> 
            <tbody style="margin:0">
             <tr style="margin:0">
              <td class="m_8124753748133449157footer-background" style="padding:15px 0 7px;background-repeat:no-repeat;margin:0;color:rgb(136,136,136);width:685px;font-size:11px;line-height:22px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;background-position:center top;background-image:url(https://ci3.googleusercontent.com/meips/ADKq_Nbp507bcljL40N0Cn3iWSF45qjHkC8BM9msWt5za56LQF7V32-U1GR6RFOCQ4wx-daV-rjvlry3iotIKfwJsQ6RcHbIHyGLFXFVvK7S9BErrTIgfP7gpmDkDnIOevY=s0-d-e1-ft#https://statici.icloud.com/emailimages/v4/common/footer_gradient_web.png);text-align:center"></td>
             </tr> 
             <tr style="margin:0">
              <td class="m_8124753748133449157footer-cell" style="padding:0 18px 18px 18px;margin:0;color:rgb(102,102,102);font-size:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:15px;text-align:center"><span class="m_8124753748133449157nobr" style="margin:0;white-space:nowrap">Soporte técnico | Johan Jiménez | 3008213229</span> <br style="margin:0"> <span class="m_8124753748133449157nobr" style="margin:0;white-space:nowrap">Copyright © 2024 <a class="m_8124753748133449157apple-address" href="#m_8124753748133449157_address" style="margin:0;color:rgb(102,102,102);white-space:nowrap;text-decoration:none">OIKONOMOS SAS.</a> Diagonal 34 Bis #17-74. </span> <br> <span class="m_8124753748133449157nobr" style="margin:0;white-space:nowrap">(601) 792 4569</span> <br> <span class="m_8124753748133449157nobr" style="margin:0;white-space:nowrap">Todos los derechos reservados.</span> </td>
             </tr> 
            </tbody>
           </table> </td>
         </tr> 
        </tbody>
       </table> </td>
     </tr> 
    </tbody>
   </table><div class="yj6qo"></div><div class="adL">  
  </div></div><div class="adL">  
 </div></div><div class="adL">
</div></div></div>`
        }
      }
    }
    setLoading(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: name === 'email' ? value.trim() : value
    })
  }

  return (
    <Box
      position="relative"
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      py={4.8}
      overflow="hidden"
    >
      <Box
        position="absolute"
        width={400}
        height={400}
        top={-100}
        left={-150}
        zIndex={-1}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#00B581"
            d="M52,-67C66.1,-61.3,75.6,-44.4,78.6,-27.4C81.6,-10.3,78.1,7,70.4,20.4C62.6,33.8,50.5,43.3,38,48.1C25.6,52.9,12.8,53,-2.6,56.6C-18,60.2,-36.1,67.3,-49.2,62.8C-62.4,58.2,-70.7,41.9,-70.3,26.7C-69.9,11.5,-60.7,-2.6,-53.7,-15.4C-46.7,-28.2,-41.9,-39.6,-33.3,-47.1C-24.7,-54.7,-12.4,-58.3,3.3,-62.8C18.9,-67.3,37.8,-72.7,52,-67Z"
            transform="translate(100 100)"
          />
        </svg>
      </Box>
      <Box
        position="absolute"
        width={400}
        height={400}
        bottom={-120}
        right={-150}
        zIndex={-1}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#00B581"
            d="M57.6,-42.1C73.7,-25.7,85.3,-1.8,80.9,18.9C76.5,39.6,56.3,57.2,35.5,63.2C14.7,69.2,-6.7,63.7,-28.9,54.9C-51.1,46.1,-74.3,34.2,-81,15.4C-87.7,-3.4,-78.1,-29,-61.9,-45.4C-45.6,-61.8,-22.8,-69.1,-1,-68.2C20.7,-67.4,41.5,-58.5,57.6,-42.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </Box>
      <Container disableGutters maxWidth="lg">
        <Paper
          elevation={0}
          sx={{ mx: { xs: 2.4, md: 3.6 }, borderRadius: '1rem' }}
        >
          <Grid2 container width="100%" height="100%">
            <Grid2
              size={{ xs: 0, md: 6 }}
              bgcolor="primary.main"
              sx={{
                display: { xs: 'none', md: 'block' },
                borderTopLeftRadius: '1rem',
                borderBottomLeftRadius: '1rem'
              }}
            ></Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1.6}
                  sx={{
                    pt: 6,
                    px: { xs: 2.4, md: 3.6 },
                    pb: { xs: 2.4, md: 3.6 }
                  }}
                >
                  <Box display="flex" justifyContent="left" mb={2.4}>
                    <img src={fullLogo} alt="oikonomos-logo" width={300} />
                  </Box>
                  <Typography component="h1" fontSize={32} mb={1.6}>
                    Inicia sesión
                  </Typography>
                  <TextField
                    name="email"
                    label="Correo electrónico"
                    value={loginData.email}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Contraseña"
                    value={loginData.password}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {!showPassword ? (
                                <VisibilityOffOutlinedIcon
                                  sx={{ color: 'rgba(0, 0, 0, 0.23)' }}
                                />
                              ) : (
                                <VisibilityOutlinedIcon
                                  sx={{ color: 'rgba(0, 0, 0, 0.23)' }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                  />
                  <Box>
                    <Button
                      variant="text"
                      type="button"
                      onClick={handleRecover}
                      disableRipple
                      sx={{
                        minWidth: 0,
                        minHeight: 0,
                        height: 'auto',
                        p: 0,
                        borderRadius: '8px'
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Button>
                  </Box>
                  <Box display="flex" justifyContent="end">
                    <LoadingButton
                      loading={loading}
                      variant="contained"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Iniciar sesión
                    </LoadingButton>
                  </Box>
                </Box>
              </form>
            </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
