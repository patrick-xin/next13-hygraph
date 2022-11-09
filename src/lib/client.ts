const endpoint = `${process.env.NEXT_PUBLIC_GRAPHCMS_ENV}`;

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
