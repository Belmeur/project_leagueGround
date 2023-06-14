import React from 'react'
import { Box } from '@mui/material';
import LogoImage from '../LogoImage/LogoImage';
import SearchBox from '../../SearchBox/SearchBox';

const Home = () => {
  return (
    <Box>
      <LogoImage />
      <Box sx={{width: '65%', textAlign: 'center', margin: 'auto'}}>
      <SearchBox />
      </Box>
    </Box>
  )
}

export default Home