import React from 'react'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { updateProfile, updateToggle } from '../../../slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
  
const ProfileHeader = ({profile}) => {
  function relativeTimeConverter(timeStamp){
    const diffMin = Math.floor((Date.now() - timeStamp)/60/1000);
    
    //if less than 60 minute return only "__ minutes ago"
    //if more than 60 minutes return "___ h ___ m ago"
    //if more than 5 hours return "___h ago"
    //if more than 24 hours return "___d ___h ago"
    // if more than 2 days return "___ d ago"
    // if more than 2 weeks, return "___ w ago"
    if(timeStamp === 0){
      return "never";
    }
    if(diffMin < 60){
      return diffMin + " min ago";
    }else if (diffMin < 300){
      return Math.floor(diffMin/60) + " h " + Math.floor(diffMin % 60) + " m ago" ;
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
  const dispatch = useDispatch();
  const updateStatus = useSelector((state) => state.profile.updateStatus);
  // console.log(updateStatus)
  function handleUpdate() {
    dispatch(updateToggle());
    dispatch(updateProfile(profile.SummonerName)).then(() => dispatch(updateToggle()));
  }

  return (
    <div>
    {Object.keys(profile).length?
      <Box sx={{width: '100%', margin: 'auto', marginTop: '40px', marginBottom: '40px'}}>
{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
{/* Fit screen size if you want;*/}
        <Grid container spacing={1} sx={{margin:'auto'}}>
          <Grid item sx={{width:{sx:"20%", sm:"20%", md:"20%", lg:"20%"}}}>
{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}

          </Grid>
          <Grid item  sx={{width:{sx:"100px", sm:"100px", md:"100px", lg:"100px"}, textAlign: {xs:"right", sm:"right", md:"right", lg:'right'}}}>
            <Box component="img" sx={{ width: {lg: '85px', md: '85px', sm: '90px', xs: '90px'}, minWidth: '70px', borderRadius: '10%'}} src={"http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/" + profile.IconNumber + ".png"} />
          </Grid>
          <Grid item sx={{width:{xs:"90px", sm:"90px", md:"90px", lg:"90px"}, marginTop: '5px'}}>
                <Box sx={{textAlign: 'left'}}>
                  <Box component="img" sx={{ maxWidth: '75px'}} src='/images/Flag_Empty.png' />
                </Box>    
                <Box sx={{textAlign: 'left'}}>
                  <Typography variant='h5' component='h5' sx={{fontSize: '20px', fontWeight: 'bold'}}>{profile.SummonerName} </Typography>
                  <Typography variant='p' component='p' sx={{fontSize: '14px'}}>Lv: {profile.SummonerLevel} </Typography>
                </Box>
          </Grid>
          <Grid item sx={{width:{xs:"70px", sm:"70px", md:"70px", lg:"70px"}, marginTop: {xs:6, sm:6, md:6, lg:6}, marginLeft:"30px"}}>
            <Button variant="contained" sx={{fontWeight: 'bold', width: '55px', height: '30px', fontSize: '12px', backgroundColor: 'black'}} onClick={handleUpdate}>Update</Button>
          </Grid>
          <Grid item sx={{width:{xs:"85px", sm:"85px", md:"85px", lg:"85px"}, marginTop: {xs:6, sm:6, md:6, lg:6}}}>
            <Typography variant="p" component="p" sx={{fontSize: '13px'}}>Last Update:</Typography>
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
            <Typography variant="p" component="p" sx={{fontSize: '13px'}}>{relativeTimeConverter( profile.LastUpdated)}</Typography>
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
          </Grid>

        </Grid>
      </Box>
    :
      <CircularProgress sx={{marginTop: '25px'}}/>
    }
    </div>
  )
}

export default ProfileHeader