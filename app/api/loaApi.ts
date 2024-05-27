import { ArmoryAvatar, ArmoryCard, ArmoryEngraving, ArmoryEquipment, ArmoryGem, ArmoryProfile, ArmorySkill, ChallengeAbyssDungeon, ChallengeGuardianRaid, CharacterInfo, Collectible, ColosseumInfo, ContentsCalendar } from './_types';

const loaFetch = async <T>(url: string) => {
  const res = await fetch(url, { headers: {
    'accept' : 'application/json',
    'authorization': `bearer ${ process.env.LOA_API_KEY }`,
  } });
  const data: T | null = await res.json();
  return data;
};

class LoaArmoryApi {
  async getProfiles(characterName: string) {
    return loaFetch<ArmoryProfile>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/profiles`);
  }

  async getEquipment(characterName: string) {
    return loaFetch<ArmoryEquipment[]>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/equipment`);
  }

  async getAvatars(characterName: string) {
    return loaFetch<ArmoryAvatar[]>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/avatars`);
  }

  async getCombatSkills(characterName: string) {
    return loaFetch<ArmorySkill[]>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/combat-skills`);
  }

  async getEngravings(characterName: string) {
    return loaFetch<ArmoryEngraving[]>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/engravings`);
  }

  async getCards(characterName: string) {
    return loaFetch<ArmoryCard[]>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/cards`);
  }

  async getGems(characterName: string) {
    return loaFetch<ArmoryGem[]>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/gems`);
  }

  async getColosseums(characterName: string) {
    return loaFetch<ColosseumInfo>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/colosseums`);
  }

  async getCollectibles(characterName: string) {
    return loaFetch<Collectible[]>(`https://developer-lostark.game.onstove.com/armories/characters/${ characterName }/collectibles`);
  }
}

class LoaCharacterApi {
  async getSiblings(characterName: string) {
    return loaFetch<CharacterInfo[]>(`https://developer-lostark.game.onstove.com/characters/${ characterName }/siblings`);
  }
}

class LoaGameContentApi {
  async getChallengeAbyssDungeons() {
    return loaFetch<ChallengeAbyssDungeon[]>('https://developer-lostark.game.onstove.com/gamecontents/challenge-abyss-dungeons');
  }

  async getChallengeGuardianRaids() {
    return loaFetch<ChallengeGuardianRaid[]>('https://developer-lostark.game.onstove.com/gamecontents/challenge-guardian-raids');
  }

  async getContentsCalendars() {
    return loaFetch<ContentsCalendar[]>('https://developer-lostark.game.onstove.com/gamecontents/contents-calendars');
  }
}

export const loaArmoryApi = new LoaArmoryApi();
export const loaCharacterApi = new LoaCharacterApi();
export const loaGameContentApi = new LoaGameContentApi();