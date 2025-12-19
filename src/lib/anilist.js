export async function fetchAniList(query, variables = {}) {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    })
  });

  const json = await response.json();
  if(!response.ok){
    throw new Error( json.errors?.[0].message || 'Anilist API error');
  }
  return json.data;
}