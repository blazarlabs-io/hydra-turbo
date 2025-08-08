export const getAdaToUsd = async () => {
  const response = await fetch(
    new Request("https://api.livecoinwatch.com/coins/single"),
    {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_LIVE_COIN_WATCH_API_KEY as string,
      }),
      body: JSON.stringify({
        currency: "USD",
        code: "ADA",
        meta: true,
      }),
    },
  );
  const data = await response.json();
  console.log(data);
  return data.rate;
};

export const getWbtcToUsd = async () => {
  const response = await fetch(
    new Request("https://api.livecoinwatch.com/coins/single"),
    {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_LIVE_COIN_WATCH_API_KEY as string,
      }),
      body: JSON.stringify({
        currency: "USD",
        code: "WBTC",
        meta: true,
      }),
    },
  );
  const data = await response.json();
  console.log(data);
  return data.rate;
};
