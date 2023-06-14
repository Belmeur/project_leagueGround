import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../slices/profileSlice';
import Profilebody from './ProfileBody/Profilebody';
import Game from './ProfileBody/ProfileBodyRight/Game/Game';
import ProfileHeader from './ProfileHeader/ProfileHeader';


const Profile = () => {
  let {userName} = useParams();
  userName = (userName.toLowerCase()).replace(/\s/g, '');
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  // console.log(Object.keys(profile).length);
  useEffect(() => {
    dispatch(getProfile(userName));
  }, [])
  // console.log(profile.SummonerName)
  return (
    <Box sx={{textAlign: 'center'}}>
      {profile.SummonerName === "" ?
        <Typography sx={{marginTop: '60px'}}>
          We were not able to find summoner with such name. Please check the name again or try again later.
        </Typography>
       
      :
        <ProfileHeader id={0} profile={profile} />
      }
      {Object.keys(profile).length?
        <>
          {profile.SummonerName !== ""?
          <Profilebody id={0} profile={profile}/>
          :
          <>
          </>
          }
        </>
      :
      <></>
      }
      
    </Box>
  )
}

export default Profile