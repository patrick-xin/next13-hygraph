export const endpoint = `https://api-us-west-2.hygraph.com/v2/cl5qsnuhv0gqn01uf824t01tt/master`;
export const client = async (query: string, variables?: {}) => {
  const data = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await data.json();

  return json.data;
};
