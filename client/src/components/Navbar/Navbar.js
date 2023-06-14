import React from 'react'
import { AppBar, Link, Toolbar, Box } from '@mui/material'

const Navbar = () => {
  return (
    <AppBar sx={{position: 'sticky', backgroundColor: 'black'}}>
      <Toolbar sx={{justifyContent: "space-between", width: '65%', margin:'auto'}}>
        <Box>
          <Link href="/" color="inherit" sx={{textDecoration: 'none', fontWeight: 'bold'}}> Home </Link>
          <Link href="/ranking" color="inherit" sx={{textDecoration: 'none', fontWeight: 'bold' , marginLeft: '25px'}}> Ranking </Link>
        </Box>
        <Box>
          <Link href="/login" color="inherit" sx={{textDecoration: 'none', fontWeight: 'bold'}}> Login </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar