const queueTypes = new Map([[0, "null"],
[2, "Blind Pick"],
[4, "Ranked Solo"],
[6, "Ranked Premade"],
[7, "AI game"],
[8, "3v3 Normal"],
[9, "3v3 Ranked"],
[14, "Draft Pick"],
[16, "Dominion Blind Pick"],
[17, "Dominion Draft Pick"],
[25, "Dominion Co-op vs AI"],
[31, "Co-op vs AI Intro Bot"],
[32, "Co-op vs AI Beginner Bot"],
[33, "Co-op vs AI Intermediate Bot"],
[41, "3v3 Ranked Team "],
[42, " Ranked Team "],
[52, "Co-op vs AI "],
[61, " Team Builder "],
[65, " ARAM "],
[67, "ARAM Co-op vs AI "],
[70, "One for All "],
[72, "1v1 Snowdown Showdown "],
[73, "2v2 Snowdown Showdown "],
[75, "6v6 Hexakill "],
[76, "Ultra Rapid Fire "],
[78, "One For All: Mirror Mode "],
[83, "Co-op vs AI Ultra Rapid Fire "],
[91, "Doom Bots Rank 1 "],
[92, "Doom Bots Rank 2 "],
[93, "Doom Bots Rank 5 "],
[96, "Ascension "],
[98, "6v6 Hexakill "],
[100, "ARAM"],
[300, "Legend of the Poro King "],
[310, "Nemesis "],
[313, "Black Market Brawlers "],
[315, "Nexus Siege "],
[317, "Definitely Not Dominion "],
[318, "ARURF "],
[325, "All Random"],
[400, "Draft Pick"],
[410, "Ranked Dynamic"],
[420, "Ranked Solo"],
[430, "Blind Pick"],
[440, "Ranked Flex"],
[450, "ARAM"],
[460, "3v3 Blind"],
[470, "3v3 Ranked"],
[600, "Blood Hunt Assassin "],
[610, "Dark Star: Singularity "],
[700, "Clash "],
[800, "AI Intermediate"],
[810, "AI Intro"],
[820, "AI Beginner"],
[830, "AI Intro"],
[840, "AI Beginner"],
[850, "Intermediate"],
[900, "ARURF"],
[910, "Ascension"],
[920, "Poro King"],
[940, "Nexus Siege"],
[950, "Doom Bots Voting"],
[960, "Doom Bots Standard"],
[980, "Star Guardian Invasion: Normal "],
[990, "Star Guardian Invasion: Onslaught "],
[1000, "PROJECT: Hunters "],
[1010, "Snow ARURF"],
[1020, "One for All"],
[1030, "Odyssey Extraction: Intro "],
[1040, "Odyssey Extraction: Cadet "],
[1050, "Odyssey Extraction: Crewmember "],
[1060, "Odyssey Extraction: Captain "],
[1070, "Odyssey Extraction: Onslaught "],
[1090, "Teamfight Tactics"],
[1100, "Ranked Teamfight Tactics "],
[1110, "Teamfight Tactics Tutorial "],
[1111, "Teamfight Tactics test "],
[1200, "Nexus Blitz "],
[1300, "Nexus Blitz "],
[1400, "Ultimate Spellbook "],
[1900, "URF"],
[2000, "Tutorial 1"],
[2010, "Tutorial 2"],
[2020, "Tutorial 3"]])


export const getQueue = function(queueId){
  return queueTypes.get(queueId);
}