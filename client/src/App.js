import { Box, Container } from '@mui/material';
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Ranking from './components/Ranking/Ranking';


const App = () => {
  return (
    <Box sx={{width: {xs:'100%', md: '80%', lg: '100%'}, textAlign: 'center', margin: 'auto', alignItems: 'center'}}>
      <Navbar />
        <BrowserRouter>
        <Box >
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile/:userName" exact element={<Profile  />} />
            <Route path="/ranking" exact element={<Ranking  />} />
          </Routes>
          </Box>
        </BrowserRouter>
      
    </Box>
  )
}

export default App