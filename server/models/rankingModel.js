import mongoose from 'mongoose';

const rankingSchema = {
  LastUpdated: Number,
  Players: [{
  SummonerName: String,
  LeaguePoints: Number,
  Wins: Number,
  Losses: Number
  }]
}

const Ranking = mongoose.model("ranking", rankingSchema);

export default Ranking;
