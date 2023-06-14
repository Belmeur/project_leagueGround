import { Box, Grid, Typography } from '@mui/material'
import React, {useState} from 'react'
import PlayerLeft from './Player/PlayerLeft.js/PlayerLeft';
import PlayerRight from './Player/PlayerRight.js/PlayerRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Game = ({id, game}) => {
  function relativeTimeConverter(timeStamp){
    const diffMin = Math.floor((Date.now() - timeStamp)/60/1000);
    
    //if less than 60 minute return only "__ minutes ago"
    //if more than 60 minutes return "___ h ___ m ago"
    //if more than 5 hours return "___h ago"
    //if more than 24 hours return "___d ___h ago"
    // if more than 2 days return "___ d ago"
    // if more than 2 weeks, return "___ w ago"
    if(diffMin < 60){
      return diffMin + " min ago";
    }else if (diffMin < 300){
      return Math.floor(diffMin/60) + " h " + diffMin % 60 + " m ago" ;
    }else if( diffMin < 1440){
      if(diffMin % 60 > 30){
        return Math.ceil(diffMin/60) + " h ago" ;
      }else{
        return Math.floor(diffMin/60) + " h ago" ;
      }
    }else if(diffMin < 2880){
      return Math.floor(diffMin/1440) + " d " + Math.floor((diffMin % 1440)/60) + " h ago"
    }else if(diffMin < 20160){
      if(diffMin % 1440 > 720){
        return Math.ceil(diffMin/1440) + " d ago";
      }else{
        return Math.floor(diffMin/1440) + " d ago";
      }
    }else{
      if(diffMin % 10080 > 5040){
        return Math.ceil(diffMin/10080) + " w ago";
      }else{
        return Math.floor(diffMin/10080) + " w ago";
      }
    }
  }
  const [expand, expandToggle] = useState(false)
  // console.log(expand);
  return (
    <Box sx={{ height: expand? '335px' : '184px', overflow: 'visible', marginBottom: '15px', border: 1}}>
      <Grid container>
        <Grid item xs={1.2} sm={1.2} md={1.2} lg={1.2} sx={{backgroundColor: game.Win? '#E0FFFF' : '#FFE4E1', paddingTop:'10px', height: expand?'305px' : '154px', borderRight: 1, borderBottom: 1, position:'relative'}}>
          <Typography variant="p" component="p" sx={{fontSize: '13.3px', marginBottom: '5px', fontWeight: 'bold'}}>
            {game.GameType} 
          </Typography>

          <Box sx={{height: '48px'}} component="img" src={"http://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/" + game.Champion + ".png"} />
     


          {game.Win? 
            <Typography variant="p" component="p" sx={{fontSize: '12.8px', marginBottom: '6.5px'}}>Victory</Typography>
          :
            <Typography variant="p" component="p" sx={{fontSize: '12.8px', marginBottom: '6.5px'}}>Loss</Typography>
           }

           <Typography variant="p" component="p" sx={{fontSize: '11px', marginBottom: '2.5px'}}>
            {game.PlayTime_Minute}m {game.PlayTime_Second < 10 ? 
              "0" + game.PlayTime_Second + "s"
            :
              game.PlayTime_Second + "s"
            }
           </Typography>
           <Typography variant="p" component="p" sx={{fontSize: '11px'}}>
            {relativeTimeConverter(game.GameEndTime)}  

           </Typography>
           {expand?
            <Box sx={{height: '154px'}}>
              
            </Box>
           :
           <></>
           }
           
        </Grid>
        <Grid item xs={5.4} sm={5.4} md={5.4} lg={5.4} sx={{height: expand? '305px' : '154px', borderRight: 1, textAlign: 'left'}}>
              {game.Players.map((player, index) => {
                if(index < 5){
                  let flag = false;
                  if(player.Win){
                    flag = true;
                  }
                  return (
                      <PlayerLeft key={index} expand={expand} flag={flag} player={player} />
                    )
                }
              })}
        </Grid>
        <Grid item xs={5.4} sm={5.4} md={5.4} lg={5.4} sx={{height: expand? '305px':'154px', borderRight: 1, borderBottom: 1, textAlign: 'right'}}>
        {game.Players.map((player, index) => {
                if(index > 4){
                  let flag = false;
                  if(player.Win){
                    flag = true;
                  }
                  return (
                    <PlayerRight key={index} expand={expand} player={player} flag={flag} />
                    )
                }
              })}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} sx={{height:'30px', backgroundColor: "#000000"}} onClick={() => {expandToggle(!expand)}} >
          <Box sx={{position: 'relative'}}>
              <Grid container>

                <Grid item xs={1.2} sm={1.2} md={1.2} lg={1.2}>
                
                </Grid>
                <Grid item xs={10.8} sm={10.8} md={10.8} lg={10.8} sx={{textAlign: 'center',  '&:hover': {cursor: 'pointer'}}}>
                  {/* <Typography variant="p" component="p" sx={{color: 'white', fontWeight: 'bold'}} > Details </Typography> */}
                  <ArrowDownwardIcon  sx={{marginTop: '4px', color: 'white'}}  />    
                </Grid>
              </Grid>
          </Box>
        </Grid>
      </Grid>
            
      {/* {game.Win}
      {game.Champion} 
      {game.ChampionLevel} 
      {game.PlayTime_Minute}:{game.PlayTime_Second}
      <Box component="img" sx={{width: '50px'}} src={"http://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/" + game.Champion + ".png"} /> */}
    </Box>
  )
}

export default Game