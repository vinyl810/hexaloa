import { type NextRequest } from 'next/server';
import { loaArmoryApi } from '../loaApi';
import { BaseResponse } from '../_types';

export type CharacterProfileResponse = BaseResponse<typeof loaArmoryApi.getProfiles>;

export async function GET(request: NextRequest) {
  const characterName = request.nextUrl.searchParams.get('charname');
  if (!characterName) {
    return Response.json({ data: null, status: 400, error: 'No character name provided' });
  }

  const data = await loaArmoryApi.getProfiles(characterName);
  if (!data) {
    return Response.json({ data: null, status: 401, error: 'No data found' });
  }
  return Response.json({ data, status: 200, error: null });
}