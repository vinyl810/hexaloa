export async function GET() {
  const res = await fetch('https://developer-lostark.game.onstove.com/armories/characters/' + '칼하이드', { headers: {
    'accept' : 'application/json',
    'authorization' : `bearer ${ process.env.LOA_API_KEY }`,
  } });
  const data = await res.json();
  return Response.json({ data });
}