import mongoose from 'mongoose';

const profileSchema = {
  SummonerName: {type: String},
  LastUpdated: {type: Number},
  Puuid: {type: String},
  Id: {type:String},
  AccountId: {type:String},
  RevisionDate: {type:Number},
  IconNumber: {type:Number},
  SummonerLevel: {type: Number},
  Rank: {type: String},
  Win: {type: Number},
  Loss: {type: Number},
  Tier: {type: String},
  Rank: {type: String},
  Winrate: {type: Number},
  GameList: [{
    GameId: String,
    QueueId: Number,
    GameType: String,
    PlayTime_Minute: Number, 
    PlayTime_Second: Number,
    GameEndTime: Number,
    Champion: String,
    ChampionLevel: Number,
    ChampionId: Number,
    ChampionURL: String,
    Win: Boolean,
    Exist: Boolean,
    Players: [{
            SummonerName: String,
            Puuid: String,
            Champion: String,
            ChampionLevel: Number,
            ChampionURL: String,
            Win: Boolean,
            Kill: Number,
            Death: Number,
            Assist: Number,
            Searched: Boolean,
            Item0: Number,
            Item1: Number,
            Item2: Number,
            Item3: Number,
            Item4: Number,
            Item5: Number,
            Item6: Number,
            SummonerSpell1: String,
            SummonerSpell2: String,
            TotalGold: Number,
            TotalDamage: Number,
            TotalMinion: Number
    }]
  }]
}


const Profile = mongoose.model("profile", profileSchema);

export default Profile;