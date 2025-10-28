import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react'
import Menu from './menu';

export default function Layout({ children }) {
     const [showMenu, setShowMenu] = useState(false)
     const toggleMenu = () => setShowMenu((prev) => !prev)
      
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', }}>
        
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>          
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Goals Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      {showMenu && <Menu />}

      {/* Main Content */}
        <Container maxWidth={false} disableGutters>
        {children}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 2,
          textAlign: 'center',
          bgcolor: '#e3f2fd',
          borderTop: '1px solid #ccc',
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} CraftopiaBox Goals Tracker
        </Typography>
      </Box>
    </Box>
  )
}
