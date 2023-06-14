import axios from 'axios';
import 'dotenv/config';

const RiotAPIKey = process.env.API_KEY;

export const getProfile = async (userName) => {
  try {
    return await axios.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + userName + "?api_key=" + RiotAPIKey);
  } catch (error) {
    return (error);
  }
}

export const getProfile2 = async (puuid) => {
  try {
    return await axios.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key=" + RiotAPIKey);  
  } catch (error) {
    return (error);
  }
}

export const getDetailedProfile = async(id) => {
  try {
    return await axios.get("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"+ id  + "?api_key="  + RiotAPIKey);
  } catch (error) {
    return (error);
  }
}

export const getMatchList = async(puuid) => {
  try {
    return await axios.get("https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=100&api_key=" + RiotAPIKey);
  } catch (error) {
    return(error);
  }
}

export const getMatchInfo = async(matchId) => {
  try {
    return await axios.get("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchId + "?api_key=" + RiotAPIKey);
  } catch (error) {
    return(error);
  }
}

export const getRankingList = async() => {
  try {
    return await axios.get("https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=" + RiotAPIKey);
  } catch (error) {
    return error;
  }
}