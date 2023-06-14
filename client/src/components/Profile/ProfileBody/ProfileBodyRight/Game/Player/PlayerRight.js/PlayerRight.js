import React from 'react'
import {Grid, Typography, Box, Link} from '@mui/material'
import {TbSword } from 'react-icons/tb';
import {FaCoins } from 'react-icons/fa';

const PlayerRight = ({player, flag,expand}) => {
  return (
    <>
    <Grid container sx={{backgroundColor: flag?'#E0FFFF' : '#FFE4E1', borderBottom: expand? 0: 1}}>
      {/* kda */}
      <Grid item xs={5} sm={5} md={5} lg={5} sx={{textAlign: 'center', position: 'relative'}}>
        <Grid container>
          <Grid item xs={6} md={6} lg={6} sx={{textAlign:'center', position: 'relative', right: '-33%'}}>
            <Box sx={{display: 'block', position:'relative',backgroundColor: 'white', bottom: '1px', border: 1, height: '10px', width: '17%'}}>
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
          <Grid item xs={6} md={6} lg={6} sx={{position: 'relative', right: '-33%', textAlign:'center'}}>
          <Box sx={{display: 'block', position:'relative',backgroundColor: 'white', bottom: '1px', border: 1, height: '10px', width: '27%'}}>
                <Typography sx={{fontSize: '9px', lineHeight: '10px', paddingLeft: '1px'}}>
                  KDA
                </Typography>
              </Box>
            <Box sx={{display: 'block', position: 'relative',height: '15px', width: '25%', bottom:'3px'}}>
              <Typography sx={{fontSize: '13px', height: '15px'}}>{player.Kill + "/" + player.Death + "/" + player.Assist}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Summoner Name + Champion image level summoner spell iamges */}
      <Grid item xs={7} sm={7} md={7} lg={7}>
        <Box sx={{height: '30px', position: 'relative'}}>

          {/* Summoner Name + link */}
          <Link href={'/profile/' + player.SummonerName} sx={{textDecoration: 'none', position: 'relative', bottom: '10px', left: '10px'}}>
            <Typography sx={{width:'130px',fontSize: '11.5px', display: 'inline-block', position: 'relative', bottom: '0px', right: '0px', color: 'black', fontWeight: player.Searched? "bold": "normal", textDecoration: player.Searched?"underline":"none"}}>{player.SummonerName}</Typography>
          </Link>

          {/* Champion Level */}
          <Box sx={{position: 'relative', display:'inline-block', left: '15px', top: '-20px', backgroundColor: 'black', width: '15px'}}>
            <Typography sx={{color: 'white', fontSize: '10px'}}>
              {player.ChampionLevel}
            </Typography>
          </Box>

          {/* Champion Image + Summoner Spell Images */}
          <Box component="img" sx={{width: '30px'}} src={player.Champion === 'Belveth' ? "/images/empty.png" : "http://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/" + player.Champion + ".png"} />
          {/* Summoner Spell */}
          <Box sx={{height: '30px', position: 'relative', display: 'inline-block'}}>
            {/* Spell 1 */}
            <Box sx={{height: '15px'}}>
              <Box component="img" sx={{width: '15px'}} src={"http://ddragon.leagueoflegends.com/cdn/12.11.1/img/spell/" + player.SummonerSpell1 + ".png"} />
            </Box>
            {/* Spell2 */}
            <Box>
            <Box component="img" sx={{width: '15px'}} src={"http://ddragon.leagueoflegends.com/cdn/12.11.1/img/spell/" + player.SummonerSpell2 + ".png"} />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
    {expand?
      <Box sx={{height: '30px', borderBottom: 1 , backgroundColor: flag? '#E0FFFF': '#FFE4E1'}}>
        <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Box sx={{marginTop: '3px'}}>
              <FaCoins size={16} sx={{display: 'inline-block'}} />
              <Typography variant="p" component="p" sx={{display: 'inline-block', fontSize: '13px', marginRight: '24px'}}>
                {Math.floor(player.TotalGold/100)/10} k
              </Typography>
              <TbSword size={18}  sx={{display: 'inline-block'}} />
              <Typography variant="p" component="p" sx={{display: 'inline-block', fontSize: '13px', width: '40px', textAlign: 'left', marginRight: '15px'}}>
                {Math.floor(player.TotalDamage/100)/10 } k
              </Typography>
              
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{backgroundColor: ''}}>
            <Box sx={{display: 'inline-block'}}>
              {/* <BsArrowBarRight size={25} color='black'/> */}
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

          
        </Grid>
          
  

      </Box>
    :
    <></>
    }
    </>
  )
}

export default PlayerRight