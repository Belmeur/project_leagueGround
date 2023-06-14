import React from 'react'
import {Grid, Box, Link, Typography} from '@mui/material'
import {TbSword } from 'react-icons/tb';
import {FaCoins } from 'react-icons/fa';


const PlayerLeft = ({player, flag, expand}) => {
  
  
  return (
    <>
    <Grid container sx={{backgroundColor: flag?'#E0FFFF' : '#FFE4E1', borderBottom: expand? 0 : 1}}>
      <Grid item xs={7} sm={7} md={7} lg={7} >
        <Box sx={{height: '30px', position: 'relative'}}>
          {/* Summoner Spells */}
          <Box sx={{height: '30px', position: 'relative', display: 'inline-block'}}>
            {/* Spell1 */}
            <Box sx={{height: '15px'}}>
              <Box component="img" sx={{width: '15px'}} src={"http://ddragon.leagueoflegends.com/cdn/12.11.1/img/spell/" + player.SummonerSpell1 + ".png"} />
            </Box>
            {/* Spell2 */}
            <Box>
            <Box component="img" sx={{width: '15px'}} src={"http://ddragon.leagueoflegends.com/cdn/12.11.1/img/spell/" + player.SummonerSpell2 + ".png"} />
            </Box>
          </Box>
          {/* Champion Image */}
          <Box component="img" sx={{width: '30px'}} src={player.Champion === 'Belveth' ? "/images/empty.png" : "http://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/" + player.Champion + ".png"} />


          {/* Champion Level */}
          <Box sx={{position: 'relative', display:'inline-block', right: '15px', top: '-20px', backgroundColor: 'black', width: '15px'}}>
            <Typography sx={{color: 'white', fontSize: '10px'}}>
              {player.ChampionLevel}
            </Typography>
          </Box>

          {/* Name + Link */}
          <Link href={'/profile/' + player.SummonerName} sx={{textDecoration: 'none', position: 'relative', bottom: '10px', right: '10px'}}>
            <Typography sx={{width:'130px',fontSize: '11.5px', display: 'inline-block', position: 'relative', bottom: '0px', left: '0px', color: 'black', fontWeight: player.Searched? "bold": "normal", textDecoration: player.Searched?"underline":"none"}}>{player.SummonerName}</Typography>
          </Link>
        </Box>
      </Grid>
      {/* KDA */}
      <Grid item xs={5} sm={5} md={5} lg={5} sx={{textAlign: 'center', position: 'relative'}}>
        <Grid container>
          <Grid item xs={6} md={6} lg={6} sx={{textAlign:'center'}}>
          <Box sx={{display: 'block', position:'relative',backgroundColor: 'white', bottom: '1px', border: 1, height: '10px', width: '28%'}}>
                <Typography sx={{fontSize: '9px', lineHeight: '10px'}}>
                  KDA
                </Typography>
              </Box>
            <Box sx={{display: 'block', position: 'relative',height: '15px', width: '25%', bottom:'3px'}}>
              <Typography sx={{fontSize: '13px', height: '15px'}}>{player.Kill + "/" + player.Death + "/" + player.Assist}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6} lg={6} sx={{position: 'relative', textAlign:'center'}}>
            <Box sx={{display: 'block', position:'relative',backgroundColor: 'white', bottom: '1px', right: '0px',border: 1, height: '10px', width: '18%'}}>
                <Typography sx={{fontSize: '9px', lineHeight: '11px', paddingRight: '1px'}}>
                  CS
                </Typography>
              </Box>
              <Box sx={{display: 'block', position: 'relative', heigh: '15px', width: '25%', bottom:'3px'}}>
                <Typography sx={{fontSize: '13px', height: '15px'}}>
                  {player.TotalMinion}
                </Typography>
              </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    {expand?
      <Box sx={{height: '30px', borderBottom: 1 , backgroundColor: flag ? '#E0FFFF' : '#FFE4E1'}}>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{}}>
            <Box sx={{display: 'inline-block'}}>
              {/* <AiOutlineArrowRight size={18} color='black'/> */}
            </Box>
            <Box sx={{paddingTop: '3px',display: 'inline-block', backgroundColor: ''}}>
              <Box component="img" sx={{height: '21px', border: 1, borderColor: 'black'}} src={player.Item0 > 0 ? "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/" + player.Item0 + ".png" : "/images/empty.png"} />      
              <Box component="img" sx={{height: '21px', border: 1, borderColor: 'black'}} src={player.Item1 > 0 ? "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/" + player.Item1 + ".png" : "/images/empty.png"} />        
              <Box component="img" sx={{height: '21px', border: 1, borderColor: 'black'}} src={player.Item2 > 0 ? "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/" + player.Item2 + ".png" : "/images/empty.png"} />        
              <Box component="img" sx={{height: '21px', border: 1, borderColor: 'black'}} src={player.Item3 > 0 ? "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/" + player.Item3 + ".png" : "/images/empty.png"} />        
              <Box component="img" sx={{height: '21px', border: 1, borderColor: 'black'}} src={player.Item4 > 0 ? "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/" + player.Item4 + ".png" : "/images/empty.png"} />        
              <Box component="img" sx={{height: '21px', border: 1, borderColor: 'black'}} src={player.Item5 > 0 ? "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/" + player.Item5 + ".png" : "/images/empty.png"} />      
            </Box>  
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
          <Box sx={{marginTop: '3px', paddingLeft: "10px"}}>
              <TbSword size={18}  sx={{display: 'inline-block'}} />
              <Typography variant="p" component="p" sx={{display: 'inline-block', fontSize: '13px', marginRight: '20px', width: '40px'}}>
                {Math.floor(player.TotalDamage/100)/10 } k
              </Typography>
              <FaCoins size={16} sx={{display: 'inline-block'}} />
              <Typography variant="p" component="p" sx={{display: 'inline-block', fontSize: '13px'}}>
                {Math.floor(player.TotalGold/100)/10} k
              </Typography>
            </Box>
          </Grid>
        </Grid>
          
  

      </Box>
    :
    <></>
    }
    </>
  )
}

export default PlayerLeft