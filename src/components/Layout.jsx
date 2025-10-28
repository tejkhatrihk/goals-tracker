import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material'

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Goals Tracker
          </Typography>
        </Toolbar>
      </AppBar>

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
