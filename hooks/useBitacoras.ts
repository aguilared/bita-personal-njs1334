import { useInfiniteQuery } from "@tanstack/react-query";

import fetchClient from "../services/fetchClient1";

type ResultData = {
  count: number;
  next: number;
  previous: number;
  results: Bitacora[];
};
export type Bitacora = {
  name: string;
  url: string;
};

async function fetchBitacoras({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<ResultData> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}bitacora/events/bita_events_paginated?offset=${pageParam}&limit=9`;
  const url1 = `http://localhost:3000/api/bitacora/events/bita_events_paginated?offset=${pageParam}&limit=9`;
  console.log("URL", url);

  const request = await fetchClient.get<ResultData>(url);

  return request.data;
}
function useBitacoras() {
  return useInfiniteQuery(
    ["bitacorasList"],
    async ({ pageParam }) => {
      const data = await fetchBitacoras({ pageParam });
      console.log("DATA", data);
      return data;
    },
    {
      getNextPageParam: (lastPage) => lastPage?.next,
      getPreviousPageParam: (firstPage) => firstPage?.previous,
    }
  );
}

export default useBitacoras;
