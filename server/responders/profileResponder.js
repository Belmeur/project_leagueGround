import Profile from "../models/profileModel.js"
import 'dotenv/config';
import axios from "axios";
import { getDetailedProfile, getMatchInfo, getMatchList, getProfile, getProfile2} from "../api/riotApi.js";
import mongoose from "mongoose";
import { getQueue } from "../extras/queueIds.js";
import utf8 from 'utf8';

const RiotAPIKey = process.env.API_KEY;

async function timedData(matchList, x, y, puuid){
    const loop = async (list) =>{
      const promises = list.map(async (data,index) => {
        if(index < y){
          const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
          await waitFor(100*index);
        //   console.log('hi');
          return await axios.get("https://americas.api.riotgames.com/lol/match/v5/matches/" + data + "?api_key=" + RiotAPIKey).then((matchInfo) => {
            const tempGameInfo = {Players: []};
            tempGameInfo.GameId = matchInfo.data.metadata.matchId;
            tempGameInfo.LastUpdated = matchInfo.data.info.gameId;
            tempGameInfo.GameType = getQueue(matchInfo.data.info.queueId);
            tempGameInfo.PlayTime_Minute = Math.floor(matchInfo.data.info.gameDuration / 60);
            tempGameInfo.PlayTime_Second = matchInfo.data.info.gameDuration % 60;
            tempGameInfo.GameEndTime = matchInfo.data.info.gameEndTimestamp;
            matchInfo.data.info.participants.map((participant) => {
                const tempPlayer = {};
                tempPlayer.SummonerName = participant.summonerName;
                tempPlayer.Puuid = participant.puuid;
                tempPlayer.Champion = participant.championName;
                if(participant.championName === "FiddleSticks"){
                    tempPlayer.Champion = 'Fiddlesticks'
                }
                tempPlayer.ChampionLevel = participant.champLevel;
                tempPlayer.Win = participant.win;
                tempPlayer.Kill = participant.kills;
                tempPlayer.Death = participant.deaths;
                tempPlayer.Assist = participant.assists;
                tempPlayer.Searched =  false;
                tempPlayer.Item0 = participant.item0;
                    tempPlayer.Item1 = participant.item1;
                    tempPlayer.Item2 = participant.item2;
                    tempPlayer.Item3 = participant.item3;
                    tempPlayer.Item4 = participant.item4;
                    tempPlayer.Item5 = participant.item5;
                    tempPlayer.Item6 = participant.item6;
                    switch (participant.summoner1Id){   
                        case 1:
                            tempPlayer.SummonerSpell1 = "SummonerBoost";
                            break
                        case 21:
                            tempPlayer.SummonerSpell1 = "SummonerBarrier";
                                break
                        case 14:
                            tempPlayer.SummonerSpell1 = "SummonerDot";
                            break
                        case 3:
                            tempPlayer.SummonerSpell1 = "SummonerExhaust";
                            break
                        case 4:
                            tempPlayer.SummonerSpell1 = "SummonerFlash";
                            break
                        case 6:
                            tempPlayer.SummonerSpell1 = "SummonerHaste";
                            break
                        case 7:
                            tempPlayer.SummonerSpell1 = "SummonerHeal";
                            break
                        case 13:
                            tempPlayer.SummonerSpell1 = "SummonerMana";
                            break
                        case 30:
                            tempPlayer.SummonerSpell1 = "SummonerPoroRecall";
                            break
                        case 31:
                            tempPlayer.SummonerSpell1 = "SummonerPoroThrow";
                            break
                        case 11:
                            tempPlayer.SummonerSpell1 = "SummonerSmite";
                            break
                        case 39:
                            tempPlayer.SummonerSpell1 = "SummonerSnowURFSnowball_Mark";
                            break
                        case 12:
                            tempPlayer.SummonerSpell1 = "SummonerTeleport";
                            break
                        case 54:
                            tempPlayer.SummonerSpell1 = "Summoner_UltBookSmitePlaceholder";
                            break
                        case 31:
                            tempPlayer.SummonerSpell1 = "SummonerPoroThrow"
                            break
                        case 32:
                            tempPlayer.SummonerSpell1 = "SummonerSnowball"
                            break
                    }
                    switch (participant.summoner2Id){   
                        case 1:
                            tempPlayer.SummonerSpell2 = "SummonerBoost";
                            break
                        case 21:
                            tempPlayer.SummonerSpell2 = "SummonerBarrier";
                                break
                        case 14:
                            tempPlayer.SummonerSpell2 = "SummonerDot";
                            break
                        case 3:
                            tempPlayer.SummonerSpell2 = "SummonerExhaust";
                            break
                        case 4:
                            tempPlayer.SummonerSpell2 = "SummonerFlash";
                            break
                        case 6:
                            tempPlayer.SummonerSpell2 = "SummonerHaste";
                            break
                        case 7:
                            tempPlayer.SummonerSpell2 = "SummonerHeal";
                            break
                        case 13:
                            tempPlayer.SummonerSpell2 = "SummonerMana";
                            break
                        case 30:
                            tempPlayer.SummonerSpell2 = "SummonerPoroRecall";
                            break
                        case 31:
                            tempPlayer.SummonerSpell2 = "SummonerPoroThrow";
                            break
                        case 11:
                            tempPlayer.SummonerSpell2 = "SummonerSmite";
                            break
                        case 39:
                            tempPlayer.SummonerSpell2 = "SummonerSnowURFSnowball_Mark";
                            break
                        case 12:
                            tempPlayer.SummonerSpell2 = "SummonerTeleport";
                            break
                        case 54:
                            tempPlayer.SummonerSpell2 = "Summoner_UltBookSmitePlaceholder";
                            break
                        case 31:
                            tempPlayer.SummonerSpell2 = "SummonerPoroThrow"
                            break
                        case 32:
                            tempPlayer.SummonerSpell2 = "SummonerSnowball"
                            break

                    }

                    tempPlayer.TotalGold = participant.goldEarned;

                    tempPlayer.TotalDamage = participant.totalDamageDealtToChampions;

                    tempPlayer.TotalMinion = participant.totalMinionsKilled;
                

                if(puuid === participant.puuid){
                    tempGameInfo.Champion = participant.championName;
                    if(participant.championName === "FiddleSticks"){
                        tempPlayer.Champion = 'Fiddlesticks'
                    }
                    tempGameInfo.ChampionLevel = participant.champLevel;
                    tempGameInfo.ChampionId = participant.championId;
                    tempGameInfo.Win = participant.win;
                    tempGameInfo.Exist = true;
                    tempPlayer.Searched = true;
                }
                tempGameInfo.Players.push(tempPlayer);
            })
                  
          return tempGameInfo})
        }else{
          return
        }
      })
      const results = await Promise.all(promises);
      return results;
    }
    
    return await loop(matchList.slice(0, y));
}

var Player = {
            SummonerName: String,
            Puuid: String,
            Champion: String,
            ChampionLevel: Number,
            ChampionURL: String,
            Win: Boolean,
            Kill: Number,
            Death: Number,
            Assist: Number,
            Searched: Boolean
    }


var GameInfo = {
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
            Searched: Boolean
        }]
}


export const getProfileResponder = async(req, res) => {
    let {userName} = req.params;
    console.log("----------- User Search Initiated ----------------\nUsername: " + userName);
    userName = (userName.toLowerCase()).replace(/\s/g, '');
    if(mongoose.connection.readyState === 1){
    try {
        const searchedProfiles = await Profile.find({SummonerName: userName});
        if(searchedProfiles.length === 1){
            console.log("One User Found. Importing Data and Displaying...")
            // console.log(searchedProfiles[0].Puuid)
            if(searchedProfiles[0].GameList.length === 0){
                // console.log('1');
                res.status(200).json(searchedProfiles[0]);
            
            }else{
                if((Date.now() - searchedProfiles[0].LastUpdated) > 604800000 && (Date.now() - searchedProfiles[0].GameList[0].GameEndTime) > 604800000){
                    const updated = await Profile.findOneAndUpdate({SummonerName: userName}, {GameList: []});
                    // console.log('2');
                    res.status(200).json(updated);
                }else{
                    // console.log('3');
                    res.status(200).json(searchedProfiles[0]);
                }
            }
        }else if(searchedProfiles.length > 1){
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            //Will this ever happen???
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            for (const prof of searchedProfiles){
                const tempProf = await getProfile(prof.SummonerName);
            }
            console.log("More Than One User Found. Cross Checking With Riot DB...");
        }else if(searchedProfiles.length < 1){
            const tempProfile = new Profile();
            console.log("Unable To Find User In DB. Requesting To Riot, Saving and Returning...");
            const defaultProfile = await getProfile(utf8.encode(userName));
            // console.log(defaultProfile);
            // console.log(defaultProfile.request.socket.servername);
            if(defaultProfile.request.res.statusCode === 200){
                tempProfile.SummonerName = userName;
                tempProfile.AccountId = defaultProfile.data.accountId;
                tempProfile.Puuid = defaultProfile.data.puuid;
                tempProfile.IconNumber = defaultProfile.data.profileIconId;
                tempProfile.SummonerLevel = defaultProfile.data.summonerLevel;
                tempProfile.LastUpdated = 0;
                tempProfile.Id = defaultProfile.data.id;
                console.log("NameChange Search::: checking if someone with same puuid exists...");
                const searchedPuuidProfile = await Profile.find({Puuid: defaultProfile.data.puuid});
                if(searchedPuuidProfile.length < 1){
                    console.log("Noone in mongodb has Puuid of " + defaultProfile.data.puuid +". \n Safely saving the user to mongoDB");
                    await tempProfile.save();
                    // console.log(tempProfile)
                     res.status(200).json([tempProfile]);
                }else if(searchedPuuidProfile.length > 0){
                    console.log("NameChange detected. **Someone in Mongodb has same Puuid. Using this profile and refreshing the page...");
                    const newSummonerName = userName;
                    searchedPuuidProfile[0].SummonerName = userName;
                    if((Date.now() - searchedPuuidProfile[0].LastUpdated) > 604800000 && (Date.now() - searchedPuuidProfile[0].GameList[0].GameEndTime) > 604800000){
                        searchedPuuidProfile[0].GameList = [];
                        // console.log('2');
                        await searchedPuuidProfile[0].save()
                        res.status(200).json(searchedPuuidProfile[0]);
                    }else{
                        // console.log('3');
                        await searchedPuuidProfile[0].save()
                        res.status(200).json(searchedPuuidProfile[0]);
                    }
                }

            }else{
                res.status(defaultProfile.request.res.statusCode).json({message: defaultProfile.message, entity: 'riot'})
            }
            // console.log(mongoose.connection.readyState);
            // res.status(404).json("what");
        }   
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}else{
    res.status(404).json({status: 'Mongoose Disconnected'})
}}  


export const updateProfileResponder = async(req, res) => {
    let {userName} = req.params;
    userName = (userName.toLowerCase()).replace(/\s/g, '');
    console.log('-------- Update Initiated ---------');
    console.log("Username: " + userName);
    console.log("1) Obtaining basic profile data from our db...")
    const mongo_profile = await Profile.find({SummonerName: userName});

    console.log("2) Matching data with riot db...")
    const riot_receivedInfo = await getProfile(utf8.encode(userName));
    if(riot_receivedInfo.request.res.statusCode === 200){
        console.log("Riot db: user with such name still exists.. checking if it is the same user that is in mongodb...")
        if(mongo_profile[0].Puuid === riot_receivedInfo.data.puuid){
            console.log("3) Same user... No name change detected... Obtaining Detailed (Rank) Info...")
            mongo_profile[0].LastUpdated = Date.now();
            const detailedInfo = await getDetailedProfile(mongo_profile[0].Id);
            // console.log(detailedInfo)
            if(detailedInfo.data.length > 0){
                mongo_profile[0].Tier = "UNRANKED";
                mongo_profile[0].Rank = "-";
                mongo_profile[0].Win = 0;
                mongo_profile[0].Loss = 0;
                mongo_profile[0].Winrate = 0;
                detailedInfo.data.forEach((block, index) => {
                    if(block.queueType === "RANKED_SOLO_5x5"){
                        mongo_profile[0].Tier = block.tier;
                        mongo_profile[0].Rank = block.rank;
                        mongo_profile[0].Win = block.wins;
                        mongo_profile[0].Loss = block.losses;
                        mongo_profile[0].Winrate = Math.floor(((block.wins/(block.wins + block.losses)) * 100));
                        // console.log(mongo_profile[0]);
                    }
                })

                // console.log(mongo_profile[0]);
            }else if(detailedInfo.data.length === 0){
            mongo_profile[0].Tier = "UNRANKED";
                            mongo_profile[0].Rank = "-";
                            mongo_profile[0].Win = 0;
                            mongo_profile[0].Loss = 0;
                            mongo_profile[0].Winrate = 0;
            }

            console.log("Obtaining game data...")

            const matchList = await getMatchList(mongo_profile[0].Puuid);
            // console.log(matchList.data)
            if(mongo_profile[0].GameList.length > 0){
                // console.log(matchList.data)
                console.log("4) Game Found in mongodb... Checking for & Importing new games played.")
                var c = 0;
                for (const match of matchList.data) {
                    const matchInfo = await getMatchInfo(match);

                    // console.log(matchInfo.data.metadata.matchId)
                    // console.log(mongo_profile[0].GameList[c].GameId)
                    if(mongo_profile[0].GameList[c].GameId !== matchInfo.data.metadata.matchId){
                        const tempGameInfo = {Players: []};
                        tempGameInfo.GameId = matchInfo.data.metadata.matchId;
                        tempGameInfo.LastUpdated = matchInfo.data.info.gameId;
                        tempGameInfo.GameType = getQueue(matchInfo.data.info.queueId);
                        tempGameInfo.PlayTime_Minute = Math.floor(matchInfo.data.info.gameDuration / 60);
                        tempGameInfo.PlayTime_Second = matchInfo.data.info.gameDuration % 60;
                        tempGameInfo.GameEndTime = matchInfo.data.info.gameEndTimestamp;
                        matchInfo.data.info.participants.map((participant) => {
                            const tempPlayer = {};
                            tempPlayer.SummonerName = participant.summonerName;
                            tempPlayer.Puuid = participant.puuid;
                            tempPlayer.Champion = participant.championName;
                            if(participant.championName === "FiddleSticks"){
                                tempPlayer.Champion = 'Fiddlesticks'
                            }
                            tempPlayer.ChampionLevel = participant.champLevel;
                            tempPlayer.Win = participant.win;
                            tempPlayer.Kill = participant.kills;
                            tempPlayer.Death = participant.deaths;
                            tempPlayer.Assist = participant.assists;
                            tempPlayer.Searched =  false;
                            tempPlayer.Item0 = participant.item0;
                                tempPlayer.Item1 = participant.item1;
                                tempPlayer.Item2 = participant.item2;
                                tempPlayer.Item3 = participant.item3;
                                tempPlayer.Item4 = participant.item4;
                                tempPlayer.Item5 = participant.item5;
                                tempPlayer.Item6 = participant.item6;
                                switch (participant.summoner1Id){   
                                    case 1:
                                        tempPlayer.SummonerSpell1 = "SummonerBoost";
                                        break
                                    case 21:
                                        tempPlayer.SummonerSpell1 = "SummonerBarrier";
                                         break
                                    case 14:
                                        tempPlayer.SummonerSpell1 = "SummonerDot";
                                        break
                                    case 3:
                                        tempPlayer.SummonerSpell1 = "SummonerExhaust";
                                        break
                                    case 4:
                                        tempPlayer.SummonerSpell1 = "SummonerFlash";
                                        break
                                    case 6:
                                        tempPlayer.SummonerSpell1 = "SummonerHaste";
                                        break
                                    case 7:
                                        tempPlayer.SummonerSpell1 = "SummonerHeal";
                                        break
                                    case 13:
                                        tempPlayer.SummonerSpell1 = "SummonerMana";
                                        break
                                    case 30:
                                        tempPlayer.SummonerSpell1 = "SummonerPoroRecall";
                                        break
                                    case 31:
                                        tempPlayer.SummonerSpell1 = "SummonerPoroThrow";
                                        break
                                    case 11:
                                        tempPlayer.SummonerSpell1 = "SummonerSmite";
                                        break
                                    case 39:
                                        tempPlayer.SummonerSpell1 = "SummonerSnowURFSnowball_Mark";
                                        break
                                    case 12:
                                        tempPlayer.SummonerSpell1 = "SummonerTeleport";
                                        break
                                    case 54:
                                        tempPlayer.SummonerSpell1 = "Summoner_UltBookSmitePlaceholder";
                                        break
                                    case 31:
                                        tempPlayer.SummonerSpell1 = "SummonerPoroThrow"
                                        break
                                    case 32:
                                        tempPlayer.SummonerSpell1 = "SummonerSnowball"
                                        break
                
                                }
                                switch (participant.summoner2Id){   
                                    case 1:
                                        tempPlayer.SummonerSpell2 = "SummonerBoost";
                                        break
                                    case 21:
                                        tempPlayer.SummonerSpell2 = "SummonerBarrier";
                                         break
                                    case 14:
                                        tempPlayer.SummonerSpell2 = "SummonerDot";
                                        break
                                    case 3:
                                        tempPlayer.SummonerSpell2 = "SummonerExhaust";
                                        break
                                    case 4:
                                        tempPlayer.SummonerSpell2 = "SummonerFlash";
                                        break
                                    case 6:
                                        tempPlayer.SummonerSpell2 = "SummonerHaste";
                                        break
                                    case 7:
                                        tempPlayer.SummonerSpell2 = "SummonerHeal";
                                        break
                                    case 13:
                                        tempPlayer.SummonerSpell2 = "SummonerMana";
                                        break
                                    case 30:
                                        tempPlayer.SummonerSpell2 = "SummonerPoroRecall";
                                        break
                                    case 31:
                                        tempPlayer.SummonerSpell2 = "SummonerPoroThrow";
                                        break
                                    case 11:
                                        tempPlayer.SummonerSpell2 = "SummonerSmite";
                                        break
                                    case 39:
                                        tempPlayer.SummonerSpell2 = "SummonerSnowURFSnowball_Mark";
                                        break
                                    case 12:
                                        tempPlayer.SummonerSpell2 = "SummonerTeleport";
                                        break
                                    case 54:
                                        tempPlayer.SummonerSpell2 = "Summoner_UltBookSmitePlaceholder";
                                        break
                                    case 31:
                                        tempPlayer.SummonerSpell2 = "SummonerPoroThrow"
                                        break
                                    case 32:
                                        tempPlayer.SummonerSpell2 = "SummonerSnowball"
                                        break
                
                                }

                                tempPlayer.TotalGold = participant.goldEarned;

                                tempPlayer.TotalDamage = participant.totalDamageDealtToChampions;

                                tempPlayer.TotalMinion = participant.totalMinionsKilled;


                            if(mongo_profile[0].Puuid === (participant.puuid)){
                                tempGameInfo.Champion = participant.championName;
                                if(participant.championName === "FiddleSticks"){
                                    tempPlayer.Champion = 'Fiddlesticks'
                                }
                                tempGameInfo.ChampionLevel = participant.champLevel;
                                tempGameInfo.ChampionId = participant.championId;
                                tempGameInfo.Win = participant.win;
                                tempGameInfo.Exist = true;
                                tempPlayer.Searched = true;
                            }

                            tempGameInfo.Players.push(tempPlayer);
                        })
                        mongo_profile[0].GameList.splice(c,0,tempGameInfo);
                        c++;
                    }else if (mongo_profile[0].GameList[c].GameId === matchInfo.data.metadata.matchId) {
                        break;
                    }
                }
                await mongo_profile[0].save();
                console.log("5) MongoDB Update Completed")
            }else{
                const lastGameData = await getMatchInfo(matchList.data[0]);
                // console.log(matchList.data[0]);
                // console.log(lastGameData.data.info.gameEndTimestamp);
                console.log("4) No games found.. Importing last 30 games if very last game was played less than a week ago..")
                try {
                    if(Date.now() - lastGameData.data.info.gameEndTimestamp < 604800000){
                        console.log("5) Last game was played less than a week ago. Importing 30 games.")
                        // console.log(matchList.data)
                        // var i = 0
    
                        const tempGameList = await timedData(matchList.data, 0, 30, mongo_profile[0].Puuid);
                        // console.log(tempGameList);
                        mongo_profile[0].GameList = tempGameList;
                    }
    
                } catch (error) {
                    console.log("5) Very inactive User.. no game history found from riot server.. returning nothing ")
                }
                await mongo_profile[0].save();
                console.log("6) MongoDB update Complete")
            }
            console.log("Final: Sending data to client..")
            res.status(200).json(mongo_profile[0]);
            
        }else{
            console.log("3) Namechange detected... correcting data... (Original user in our db changed name, and someone else took the name.)");
            const profile2 = await getProfile2(mongo_profile[0].Puuid);
            mongo_profile[0].SummonerName = profile2.name;
            console.log("4) Previous user with name " + userName + " changed to " + profile2.name);
            await mongo_profile[0].save();
            console.log("5) Checking if someone that took the searched userName was previously stored in mongodb...")
            const mongo_profile_new = Profile.find({Puuid: riot_receivedInfo.data.puuid});
            if(mongo_profile_new.length > 0){
                console.log('6) Someone that took the searched name was actually stored inside the db...')
                //////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////
            }else{
                console.log("6) Someone that took the searched name was not in the mongodb.. creating new profile and storing...")
                const tempProfile = new Profile();
                tempProfile.SummonerName = userName;
                tempProfile.AccountId = riot_receivedInfo.data.accountId;
                tempProfile.Puuid = riot_receivedInfo.data.puuid;
                tempProfile.IconNumber = riot_receivedInfo.data.profileIconId;
                tempProfile.SummonerLevel = riot_receivedInfo.data.summonerLevel;
                tempProfile.LastUpdated = date.now();
                tempProfile.Id = defaultProfile.data.id;
                await tempProfile.save();
                console.log("7) Basic info updated... obtaining detailed data...");
                const detailedInfo = await getDetailedProfile(tempProfile.Id);
                if(detailedInfo.data.length > 0){
                    detailedInfo.data.forEach((block, index) => {
                        if(block.queueType === "RANKED_SOLO_5x5"){
                            tempProfile.Tier = block.tier;
                            tempProfile.Rank = block.rank;
                            tempProfile.Win = block.wins;
                            tempProfile.Loss = block.losses;
                            tempProfile.Winrate = Math.floor(((block.wins/(block.wins + block.losses)) * 100));
                            // console.log(tempProfile);
                        }else{
                            if(index + 1 === detailedInfo.data.length){
                                tempProfile.Tier = "UNRANKED";
                                tempProfile.Rank = "-";
                                tempProfile.Win = "-";
                                tempProfile.Loss = "-";
                                tempProfile.Winrate = 0;
                            }
                        }
                    })
                    // console.log(tempProfile);
                }else if(detailedInfo.data.length === 0){
                    tempProfile.Tier = "UNRANKED";
                    tempProfile.Rank = "-";
                    tempProfile.Win = "-";
                    tempProfile.Loss = "-";
                    tempProfile.Winrate = 0;
                }
                console.log('Detailed Data Updated... Obtaining Match Data...')
                const matchList = await getMatchList(tempProfile.Puuid);
                const lastGameData = await getMatchInfo(matchList.data[0]);
                if(date.now() - lastGameData.data.info.gameEndTimeStamp < 604800000){
                    for(const [match, index] of matchList.data){
                        if(index === 20){
                            break;
                        }else{
                            const matchInfo = await getMatchInfo(match);
                            const tempGameInfo = {Players: []};
                            tempGameInfo.GameId = matchInfo.data.metadata.matchId;
                            tempGameInfo.LastUpdated = matchInfo.data.info.gameId;
                            tempGameInfo.GameType = getQueue(matchInfo.data.info.queueId);
                            tempGameInfo.PlayTime_Minute = Math.floor(matchInfo.data.info.gameDuration / 60);
                            tempGameInfo.PlayTime_Second = matchInfo.data.info.gameDuration % 60;
                            tempGameInfo.GameEndTime = matchInfo.data.info.gameEndTimestamp;
                            matchInfo.data.info.participants.map((participant) => {
                                const tempPlayer = {};
                                tempPlayer.SummonerName = participant.summonerName;
                                tempPlayer.Puuid = participant.puuid;
                                tempPlayer.Champion = participant.championName;
                                if(participant.championName === "FiddleSticks"){
                                    tempPlayer.Champion = 'Fiddlesticks'
                                }
                                tempPlayer.ChampionLevel = participant.champLevel;
                                tempPlayer.Win = participant.win;
                                tempPlayer.Kill = participant.kills;
                                tempPlayer.Death = participant.deaths;
                                tempPlayer.Assist = participant.assists;
                                tempPlayer.Searched =  false;
                                tempPlayer.Item0 = participant.item0;
                                tempPlayer.Item1 = participant.item1;
                                tempPlayer.Item2 = participant.item2;
                                tempPlayer.Item3 = participant.item3;
                                tempPlayer.Item4 = participant.item4;
                                tempPlayer.Item5 = participant.item5;
                                tempPlayer.Item6 = participant.item6;
                                switch (participant.summoner1Id){   
                                    case 1:
                                        tempPlayer.SummonerSpell1 = "SummonerBoost";
                                        break
                                    case 21:
                                        tempPlayer.SummonerSpell1 = "SummonerBarrier";
                                         break
                                    case 14:
                                        tempPlayer.SummonerSpell1 = "SummonerDot";
                                        break
                                    case 3:
                                        tempPlayer.SummonerSpell1 = "SummonerExhaust";
                                        break
                                    case 4:
                                        tempPlayer.SummonerSpell1 = "SummonerFlash";
                                        break
                                    case 6:
                                        tempPlayer.SummonerSpell1 = "SummonerHaste";
                                        break
                                    case 7:
                                        tempPlayer.SummonerSpell1 = "SummonerHeal";
                                        break
                                    case 13:
                                        tempPlayer.SummonerSpell1 = "SummonerMana";
                                        break
                                    case 30:
                                        tempPlayer.SummonerSpell1 = "SummonerPoroRecall";
                                        break
                                    case 31:
                                        tempPlayer.SummonerSpell1 = "SummonerPoroThrow";
                                        break
                                    case 11:
                                        tempPlayer.SummonerSpell1 = "SummonerSmite";
                                        break
                                    case 39:
                                        tempPlayer.SummonerSpell1 = "SummonerSnowURFSnowball_Mark";
                                        break
                                    case 12:
                                        tempPlayer.SummonerSpell1 = "SummonerTeleport";
                                        break
                                    case 54:
                                        tempPlayer.SummonerSpell1 = "Summoner_UltBookSmitePlaceholder";
                                        break
                                    case 31:
                                        tempPlayer.SummonerSpell1 = "SummonerPoroThrow"
                                        break
                                    case 32:
                                        tempPlayer.SummonerSpell1 = "SummonerSnowball"
                                        break
                
                                }
                                switch (participant.summoner2Id){   
                                    case 1:
                                        tempPlayer.SummonerSpell2 = "SummonerBoost";
                                        break
                                    case 21:
                                        tempPlayer.SummonerSpell2 = "SummonerBarrier";
                                         break
                                    case 14:
                                        tempPlayer.SummonerSpell2 = "SummonerDot";
                                        break
                                    case 3:
                                        tempPlayer.SummonerSpell2 = "SummonerExhaust";
                                        break
                                    case 4:
                                        tempPlayer.SummonerSpell2 = "SummonerFlash";
                                        break
                                    case 6:
                                        tempPlayer.SummonerSpell2 = "SummonerHaste";
                                        break
                                    case 7:
                                        tempPlayer.SummonerSpell2 = "SummonerHeal";
                                        break
                                    case 13:
                                        tempPlayer.SummonerSpell2 = "SummonerMana";
                                        break
                                    case 30:
                                        tempPlayer.SummonerSpell2 = "SummonerPoroRecall";
                                        break
                                    case 31:
                                        tempPlayer.SummonerSpell2 = "SummonerPoroThrow";
                                        break
                                    case 11:
                                        tempPlayer.SummonerSpell2 = "SummonerSmite";
                                        break
                                    case 39:
                                        tempPlayer.SummonerSpell2 = "SummonerSnowURFSnowball_Mark";
                                        break
                                    case 12:
                                        tempPlayer.SummonerSpell2 = "SummonerTeleport";
                                        break
                                    case 54:
                                        tempPlayer.SummonerSpell2 = "Summoner_UltBookSmitePlaceholder";
                                        break
                                    case 31:
                                        tempPlayer.SummonerSpell2 = "SummonerPoroThrow"
                                        break
                                    case 32:
                                        tempPlayer.SummonerSpell2 = "SummonerSnowball"
                                        break
                
                                }

                                tempPlayer.TotalGold = participant.goldEarned;

                                tempPlayer.TotalDamage = participant.totalDamageDealtToChampions;

                                tempPlayer.TotalMinion = participant.totalMinionsKilled;


                                if(mongo_profile[0].Puuid === (participant.puuid)){
                                    tempGameInfo.Champion = participant.championName;
                                    if(participant.championName === "FiddleSticks"){
                                        tempPlayer.Champion = 'Fiddlesticks'
                                    }
                                    tempGameInfo.ChampionLevel = participant.champLevel;
                                    tempGameInfo.ChampionId = participant.championId;
                                    tempGameInfo.Win = participant.win;
                                    tempGameInfo.Exist = true;
                                    tempPlayer.Searched = true;
                                }

                                tempGameInfo.Players.push(tempPlayer);
                            })
                            tempProfile.GameList.push(tempGameInfo);
                        }
                        
                    }
                }
                await tempProfile.save();
            }
            console.log('4) Update Complete..');
            res.status(200).json(tempProfile)
        }
        
    }else{
        console.log('Namechange detected... Searched username does not exist in riot server...')
        console.log('Checking Puuid...')
        const matchList = await getMatchList(mongo_profile[0].Puuid);
        // console.log(mongo_profile);
        const profile2 = await getProfile2(mongo_profile[0].Puuid);
        // console.log(profile2.data);
        const newSummonerName = (profile2.data.name.toLowerCase()).replace(/\s/g,'');
        mongo_profile[0].SummonerName = newSummonerName;

        var c = 0;
        for (const match of matchList.data) {
            const matchInfo = await getMatchInfo(match);

            // console.log(matchInfo.data.metadata.matchId)
            // console.log(mongo_profile[0].GameList[c].GameId)
            if(mongo_profile[0].GameList[c].GameId !== matchInfo.data.metadata.matchId){
                const tempGameInfo = {Players: []};
                tempGameInfo.GameId = matchInfo.data.metadata.matchId;
                tempGameInfo.LastUpdated = matchInfo.data.info.gameId;
                tempGameInfo.GameType = getQueue(matchInfo.data.info.queueId);
                tempGameInfo.PlayTime_Minute = Math.floor(matchInfo.data.info.gameDuration / 60);
                tempGameInfo.PlayTime_Second = matchInfo.data.info.gameDuration % 60;
                tempGameInfo.GameEndTime = matchInfo.data.info.gameEndTimestamp;
                matchInfo.data.info.participants.map((participant) => {
                    const tempPlayer = {};
                    tempPlayer.SummonerName = participant.summonerName;
                    tempPlayer.Puuid = participant.puuid;
                    tempPlayer.Champion = participant.championName;
                    if(participant.championName === "FiddleSticks"){
                        tempPlayer.Champion = 'Fiddlesticks'
                    }
                    tempPlayer.ChampionLevel = participant.champLevel;
                    tempPlayer.Win = participant.win;
                    tempPlayer.Kill = participant.kills;
                    tempPlayer.Death = participant.deaths;
                    tempPlayer.Assist = participant.assists;
                    tempPlayer.Searched =  false;
                    tempPlayer.Item0 = participant.item0;
                        tempPlayer.Item1 = participant.item1;
                        tempPlayer.Item2 = participant.item2;
                        tempPlayer.Item3 = participant.item3;
                        tempPlayer.Item4 = participant.item4;
                        tempPlayer.Item5 = participant.item5;
                        tempPlayer.Item6 = participant.item6;
                        switch (participant.summoner1Id){   
                            case 1:
                                tempPlayer.SummonerSpell1 = "SummonerBoost";
                                break
                            case 21:
                                tempPlayer.SummonerSpell1 = "SummonerBarrier";
                                 break
                            case 14:
                                tempPlayer.SummonerSpell1 = "SummonerDot";
                                break
                            case 3:
                                tempPlayer.SummonerSpell1 = "SummonerExhaust";
                                break
                            case 4:
                                tempPlayer.SummonerSpell1 = "SummonerFlash";
                                break
                            case 6:
                                tempPlayer.SummonerSpell1 = "SummonerHaste";
                                break
                            case 7:
                                tempPlayer.SummonerSpell1 = "SummonerHeal";
                                break
                            case 13:
                                tempPlayer.SummonerSpell1 = "SummonerMana";
                                break
                            case 30:
                                tempPlayer.SummonerSpell1 = "SummonerPoroRecall";
                                break
                            case 31:
                                tempPlayer.SummonerSpell1 = "SummonerPoroThrow";
                                break
                            case 11:
                                tempPlayer.SummonerSpell1 = "SummonerSmite";
                                break
                            case 39:
                                tempPlayer.SummonerSpell1 = "SummonerSnowURFSnowball_Mark";
                                break
                            case 12:
                                tempPlayer.SummonerSpell1 = "SummonerTeleport";
                                break
                            case 54:
                                tempPlayer.SummonerSpell1 = "Summoner_UltBookSmitePlaceholder";
                                break
                            case 31:
                                tempPlayer.SummonerSpell1 = "SummonerPoroThrow"
                                break
                            case 32:
                                tempPlayer.SummonerSpell1 = "SummonerSnowball"
                                break
                                
        
                        }
                        switch (participant.summoner2Id){   
                            case 1:
                                tempPlayer.SummonerSpell2 = "SummonerBoost";
                                break
                            case 21:
                                tempPlayer.SummonerSpell2 = "SummonerBarrier";
                                 break
                            case 14:
                                tempPlayer.SummonerSpell2 = "SummonerDot";
                                break
                            case 3:
                                tempPlayer.SummonerSpell2 = "SummonerExhaust";
                                break
                            case 4:
                                tempPlayer.SummonerSpell2 = "SummonerFlash";
                                break
                            case 6:
                                tempPlayer.SummonerSpell2 = "SummonerHaste";
                                break
                            case 7:
                                tempPlayer.SummonerSpell2 = "SummonerHeal";
                                break
                            case 13:
                                tempPlayer.SummonerSpell2 = "SummonerMana";
                                break
                            case 30:
                                tempPlayer.SummonerSpell2 = "SummonerPoroRecall";
                                break
                            case 31:
                                tempPlayer.SummonerSpell2 = "SummonerPoroThrow";
                                break
                            case 11:
                                tempPlayer.SummonerSpell2 = "SummonerSmite";
                                break
                            case 39:
                                tempPlayer.SummonerSpell2 = "SummonerSnowURFSnowball_Mark";
                                break
                            case 12:
                                tempPlayer.SummonerSpell2 = "SummonerTeleport";
                                break
                            case 54:
                                tempPlayer.SummonerSpell2 = "Summoner_UltBookSmitePlaceholder";
                                break
                            case 31:
                                tempPlayer.SummonerSpell2 = "SummonerPoroThrow"
                                break
                            case 32:
                                tempPlayer.SummonerSpell2 = "SummonerSnowball"
                                break
        
                        }

                        tempPlayer.TotalGold = participant.goldEarned;

                        tempPlayer.TotalDamage = participant.totalDamageDealtToChampions;

                        tempPlayer.TotalMinion = participant.totalMinionsKilled;


                    if(mongo_profile[0].Puuid === (participant.puuid)){
                        tempGameInfo.Champion = participant.championName;
                        if(participant.championName === "FiddleSticks"){
                            tempPlayer.Champion = 'Fiddlesticks'
                        }
                        tempGameInfo.ChampionLevel = participant.champLevel;
                        tempGameInfo.ChampionId = participant.championId;
                        tempGameInfo.Win = participant.win;
                        tempGameInfo.Exist = true;
                        tempPlayer.Searched = true;
                    }

                    tempGameInfo.Players.push(tempPlayer);
                })
                mongo_profile[0].GameList.splice(c,0,tempGameInfo);
                c++;
            }else if (mongo_profile[0].GameList[c].GameId === matchInfo.data.metadata.matchId) {
                break;
            }
        }
        mongo_profile[0].LastUpdated = Date.now();

        console.log("Previous user with name " + userName + " changed to " + profile2.data.name);

        await mongo_profile[0].save();
        res.redirect('/profile/' + newSummonerName);
    }
}

