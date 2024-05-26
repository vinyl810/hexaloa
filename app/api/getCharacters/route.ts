import { type NextRequest } from 'next/server';

export type CharacterInfo = {
  ServerName: String
  CharacterName: String
  CharacterLevel: Number
  CharacterClassName: String
  ItemAvgLevel: String
  ItemMaxLevel: String
};

export async function GET(request: NextRequest) {
  const characterName = request.nextUrl.searchParams.get('query');
  const res = await fetch('https://developer-lostark.game.onstove.com/characters/' + characterName + '/siblings', { headers: {
    'accept' : 'application/json',
    'authorization' : `bearer ${ process.env.LOA_API_KEY }`,
    'cache-control' : 'no-cache no-store',
  } });

  if (!res.ok) {
    return Response.error();
  } else {
    const data: CharacterInfo[] = await res.json();
    const charactarData = data.find((character) => character.CharacterName === characterName);
    return Response.json({ data: charactarData });
  }
}