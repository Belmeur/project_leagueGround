import React, { useState } from 'react'
import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import Game from './ProfileBodyRight/Game/Game';
import { useSelector } from 'react-redux';


const Profilebody = ({profile}) => {
  const updateStatus = useSelector((state) => state.profile.updateStatus);
  const [unloop, unloopChange] = useState(20);
  return (
    <Box sx={{ marginTop: '2%', width: '100%'}}>
          <Grid container spacing={0}>
            <Grid item sx={{width: '15%'}}>

            </Grid>
            <Grid item sx={{width: '234px', height:"170px"}} >
              {typeof(profile.Rank) === "undefined" ? 
              <Box sx={{border: 1, borderColor: 'black', height: '150px', width:{xs:'50%', sm:"50%", md:"100%", lg:"100%"},margin: 'auto'}}>
                <Grid container sx={{padding: 2}}>
                  <Grid item xs={6} sm={6} md={6} lg={6} sx={{lineHeight: {xs: "170px", sm:"170px" ,md: "170px", lg: '170px'}}}>
                    <Box component="img" sx={{ width: {xs: '75px', sm: '75px', md:"75px", lg:"75px"}, minWidth: '70px', borderRadius: '10%'}} src={"/images/UNRANKED.png"} />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} sx={{paddingTop: '15px'}}>
                    <Typography variant="p" component="p" sx={{fontSize: '14px', fontWeight: 'bold'}}>Ranked Solo</Typography>
                    <Typography variant="p" component="p" sx={{fontSize: '14px'}}>Tier: - </Typography>
                    <Typography variant="p" component="p" sx={{fontSize: '14px'}}>Rank: - </Typography>
                    <Typography variant="p" component="p" sx={{fontSize: '14px'}}>Winrate: - </Typography>
                    <Typography variant="p" component="p" sx={{fontSize: '14px'}}></Typography>
                  </Grid>
                </Grid>
                
              </Box>
              :
              <Box sx={{border: 1, borderColor: 'black', height: '150px', }}>
                <Grid container sx={{padding: 2}}>
                  <Grid item xs={6} sm={6} md={6} lg={6} sx={{lineHeight: {xs: "170px", sm:"170px" ,md: "170px", lg: '170px'}, paddingTop: '10px'}}>
                    <Box component="img" sx={{ width: {xs: '75px', sm: '75px', md:"75px", lg:"75px"}, minWidth: '70px', borderRadius: '10%'}} src={"/images/" + profile.Tier + ".png"} />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} sx={{paddingTop: '15px'}}>
                    <Typography variant="p" component="p" sx={{fontSize: '14px', fontWeight: 'bold'}}>Ranked Solo</Typography>
                    <Typography variant="p" component="p" sx={{fontSize: '14px'}}>Tier: {(profile.Tier[0] + (profile.Tier.toLowerCase()).slice(1))} </Typography>
                    <Typography variant="p" component="p" sx={{fontSize: '14px'}}>Rank: {profile.Rank} </Typography>
                    <Typography variant="p" component="p" sx={{fontSize: '14px'}}>Winrate: {profile.Winrate} %</Typography>
                    <Typography variant="p" component="p" sx={{fontSize: '14px'}}></Typography>
                  </Grid>
                </Grid>
                
              </Box>
              }
            

            </Grid>
            <Grid item lg={0.1}>

            </Grid>
            <Grid item sx={{width: '850px'}}>
              {typeof(profile.GameList) === 'undefined' ?
              <LinearProgress  sx={{marginTop: '5%'}}/>
              :
              <Box>
                {profile.GameList.length === 0 ?
                  <Box sx={{marginTop: '5%'}}>
                    {updateStatus?
                      <LinearProgress sx={{marginTop: '25px'}} />
                      :
                      <>
                      <Typography variant="h5" component="h5" sx={{fontSize: '20px'}}> Unable to find recent games.  </Typography>
                      </>
                    }
                  </Box>
                :
                  <Box>
                    {updateStatus?
                      <LinearProgress sx={{marginTop: '25px'}} />
                    :
                    
                      profile.GameList?.map((game, index) => {
                        return  index < unloop ? 
                                <Game key={index} game={game} />
                                :
                                <React.Fragment key={index}></React.Fragment>
                      })
                    }
                    <Button variant="contained" sx={{visibility: unloop === 300 ? "hidden" : "visible", width: "100%", marginTop: '10px', fontWeight: 'bold', color: 'white', backgroundColor: 'black', '&:hover': {
                      background: "gray",
                      },}} onClick={() => unloopChange(unloop + 10)}> Load More Games</Button>
                    <Box sx={{height: '150px'}}></Box>
                  </Box>
                }
              </Box>
              }
            </Grid>
        </Grid>
      </Box>
  )
}

export default Profilebody