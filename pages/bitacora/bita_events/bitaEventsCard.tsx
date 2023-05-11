import { Fragment, useEffect, useState } from "react";
import type { NextPage } from "next";
import Container from "../../../components/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import Interweave from "interweave";
import { useInView } from "react-intersection-observer";
import useBitacoras, { Bitacora } from "../../../hooks/useBitacoras";
import BitacoraView from "../../../components/Bitacoras/BitacoraView";
import Link from "next/link";
import { CardHeader } from "@material-ui/core";

const convertDate = (date: any) => {
  return dayjs(date).format("DD/MM/YYYY hh:mm");
};
const convertDate1 = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD hh:mm");
};

const BitaEventsCard: NextPage = () => {
  const { ref, inView } = useInView();

  const url = `${process.env.NEXT_PUBLIC_API_URL}bitacora/events/bita_events_paginated`;

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    error,
    status,
    isLoading,
  } = useBitacoras();
  console.log("Datall", data);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="container max-w-4xl m-auto px-4 mt-20">
      <div className="container mx-auto px-20">
        <h1 className="text-gray-600 text-5xl font-bold">
          List Bitacoras Events.
        </h1>
      </div>
      {isLoading ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data &&
          data.pages.map((group, i) => (
            <Fragment key={i}>
              {group?.results.map((event) => (
                <Card
                  key={i}
                  sx={{
                    display: "flex",
                    width: ["70%", "70%", "20.33%"],
                    justifyContent: "space-between",
                  }}
                >
                  <CardHeader
                    subheader={
                      "TipoEvent: " +
                      `${event.tipoEvent.description}` +
                      ", Event: " +
                      `${event.event.description}`
                    }
                    title={
                      "ID:" +
                      `${event.id}` +
                      " " +
                      convertDate(event.bitacora.bitacora_date)
                    }
                  />
                  {event.image! ? (
                    <a
                      href={"/static/images/" + `${event.id}` + ".jpg"}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 30 }}
                        image={"/static/images/" + `${event.id}` + ".jpg"}
                        alt="Live from space album cover"
                        onClick={() => console.log("CardActionArea clicked")}
                      />
                    </a>
                  ) : (
                    <></>
                  )}
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography variant="h6" component="div">
                      <a
                        href={`/bitacora/view/${encodeURIComponent(
                          event.bitacora_id
                        )}`}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        BitacoraID: {event.bitacora_id}
                        {",  "}
                      </a>
                      {convertDate(event.bitacora.bitacora_date)}
                    </Typography>

                    <Typography>
                      BitacoraID:
                      <Link
                        href={`/bitacora/view/${encodeURIComponent(
                          event.bitacora_id
                        )}`}
                        passHref
                      >
                        {event.bitacora_id}
                      </Link>
                    </Typography>

                    <Typography variant="h6" component="div">
                      <a
                        href={`/bitacora/bita_event/${encodeURIComponent(
                          event.id
                        )}`}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        BitaEventID: {event.id}
                        {",  "}
                      </a>
                      {convertDate(event.event_date)}
                    </Typography>

                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="div"
                    >
                      <Interweave content={event.description} />
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Fragment>
          ))}
      </div>
      <div>
        <button
          ref={ref}
          className={
            "flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 my-8"
          }
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default BitaEventsCard;
