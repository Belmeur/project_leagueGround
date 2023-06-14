import { Box, Link, Typography } from '@mui/material';
import React from 'react'
import {GiCrown } from 'react-icons/gi';

const RankingUnit = ({player, rank}) => {
  // console.log(player)
  return (
    <Box sx={{width: '100%', textAlign:'center', height: '50px', border: 2, marginTop: '10px', overflow: 'hidden'}}>
      {/* <Box /> */}
      <Box sx={{width: '90%', margin: 'auto'}}>
        <Box sx={{visibility: rank === 0 ? "visible" : "hidden" ,position: 'absolute', left: '29%'}}>
          <GiCrown color="gold" size={44} rotate={90} />
        </Box>
        <Box sx={{visibility: rank === 1 ? "visible" : "hidden" ,position: 'absolute', left: '29%'}}>
          <GiCrown color="silver" size={44} />
        </Box>
        <Box sx={{visibility: rank === 2 ? "visible" : "hidden" ,position: 'absolute', left: '29%'}}>
          <GiCrown color="brown" size={44} />
        </Box>
          <Typography variant="p" component="p" sx={{display:'inline-block', marginRight: '3%', width: '20px', lineHeight: '50px', fontSize: '14px', fontWeight: 'bold'}}>{rank +1}</Typography>
          <Link href={"/profile/" + player.SummonerName}><Typography variant="p" component="p" sx={{display:'inline-block', width:"40%", fontSize: '14px', textAlign: 'left', color: 'black'}}>{player.SummonerName}</Typography></Link>
          <Typography variant="p" component="p" sx={{display:'inline-block', width:"13%", fontSize: '14px'}}>{player.LeaguePoints} LP</Typography>
          <Typography variant="p" component="p" sx={{display:'inline-block', width:"13%", fontSize: '14px'}}>{player.Wins} W</Typography>
          <Typography variant="p" component="p" sx={{display:'inline-block', width:"13%", fontSize: '14px'}}>{player.Losses} L</Typography>
          <Typography variant="p" component="p" sx={{display:'inline-block', width:"13%", fontSize: '14px', color: Math.floor((player.Wins*100/(player.Losses+player.Wins))) < 50 ? "gray" : Math.floor((player.Wins*100/(player.Losses+player.Wins))) < 60? "orange" : Math.floor((player.Wins*100/(player.Losses+player.Wins))) < 70? "red" : "#6495ED", fontWeight:  Math.floor((player.Wins*100/(player.Losses+player.Wins))) > 59 ? "bold" : "normal" }}>{Math.floor((player.Wins*100/(player.Losses+player.Wins)))}%</Typography>
      </Box>
      
    </Box>
  )
}

export default RankingUnit