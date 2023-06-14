import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRanking } from '../../slices/rankingSlice';
import RankingUnit from './RankingUnit/RankingUnit';

const Ranking = () => {
  const [unloop, unloopChange] = useState(50);
  const dispatch = useDispatch();
  const rankingData = useSelector((state) => state.ranking.ranking);
  useEffect(() => {
    dispatch(getRanking());
  }, [])
  console.log(rankingData.Players);
  return (
    <Box sx={{marginTop: '10px', width: '40%', margin: 'auto'}}>
    <Box sx={{marginTop: '30px', marginBottom: '20px'}}>
      <Typography component="h5" variant="h5" sx={{textAlign: 'left', textDecoration: 'underline', fontSize: '26px'}}> Leaderboard</Typography>
    </Box>
      {rankingData.Players?.map((player, index) => {
        
        return  index < unloop ? 
        <RankingUnit key={index} player={player} rank={index} /> 
        :
         <></>
      
        
      })}
      <Button variant="contained" sx={{visibility: unloop === 300 ? "hidden" : "visible", width: "100%", marginTop: '10px', fontWeight: 'bold', color: 'white', backgroundColor: 'black', '&:hover': {
       background: "gray",
    },}} onClick={() => unloopChange(unloop + 50)}> Load More Players</Button>
      <Box sx={{height: '150px'}}></Box>
    </Box>
  )
}

export default Ranking