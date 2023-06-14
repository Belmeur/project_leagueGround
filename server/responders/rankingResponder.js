import {getRankingList} from "../api/riotApi.js";
import Ranking from "../models/rankingModel.js";


export const updateRankingResponder = async (req, res) => {
    console.log("-------- Ranking update initiated--------")
  try {
      const result = await Ranking.find({});
      if(result.length < 1){
        console.log("Very first initiation for ranking... obtaining new data")
          const tempRanking = new Ranking;
          tempRanking.LastUpdated = 0;
          await tempRanking.save();
          res.redirect("/ranking");
      }else{
    //   console.log(result[0].LastUpdated);
      if(Date.now() - result[0].LastUpdated > 600000){
        console.log("Last updated LONGER than 10 minutes ago... Obtaining Fresh data");
        result[0].Players = [];
          //if last ranking data was updated more than 10 minutes ago, get new data
          try {
              const riot_rankingData_raw = await getRankingList();
              var riot_rankingData = riot_rankingData_raw.data.entries;
            //   console.log(riot_rankingData)
            //   console.log(riot_rankingData.length);
              function compare( a, b ) {
                  if ( a.leaguePoints > b.leaguePoints ){
                      return -1;
                  }
                  if ( a.leaguePoints < b.leaguePoints ){
                      return 1;
                  }
                  return 0;
              }
              riot_rankingData.sort(compare);
  
              result[0].LastUpdated = Date.now()
              riot_rankingData.map((ranker) => {
                  const tempRanker = {
                      SummonerName: ranker.summonerName,
                      LeaguePoints: ranker.leaguePoints,
                      Wins: ranker.wins,
                      Losses: ranker.losses
                  }
                  result[0].Players.push(tempRanker);
              })
  
              await result[0].save();
              res.status(200).json(result[0].Players);
              
          } catch (error) {
              res.status(riot_rankingData.request.res.statusCode).json({message: riot_rankingData.message, entity: 'riot'});
          }
      }else{
          //if refreshed less than 10 min ago. just give current data
          console.log("Last updated LESS than 10 minutes ago... returning current data");
          res.status(200).json(result[0]);
      }
  }
  } catch (error) {
      res.status(404).json({status: "Mongoose Error"});
  }    
}