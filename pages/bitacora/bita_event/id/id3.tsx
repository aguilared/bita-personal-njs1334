import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import getBitaEventId from "../../../services/getBitaEventId";
import dayjs from "dayjs";
import Interweave from "interweave";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "../../../components/Container";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";

const styles = {
  card: {
    maxWidth: 645,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },

  avatar: {
    backgroundColor: red[500],
  },
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const convertDate1 = (date: any) => {
  var d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

const IdbitaEvent = () => {
  const { query } = useRouter();

  console.log("Query", query);
  console.log("QueryId", query.id);

  const ENDPOINT =
    process.env.NEXT_PUBLIC_API_URL + "bitacora/event_id/" + query.id;
  console.log("ENDPOINT", ENDPOINT);
  const { isLoading, isError, data, error } = useQuery(
    "BitaEvent",
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      console.log("RESP11", res);
      return res.data[0];
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Errorrr: {error.message}</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log("DATA", data);
  console.log("ERROR", error);

  return (
    <div className="container max-w-4xl m-auto px-4 mt-20">
      <Card
        sx={{
          display: "flex",
          width: ["70%", "70%", "30.33%"],
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <div>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              Reporte de un evento especifico de una Bitacora.
            </h3>
          </div>
          <Typography variant="h6" component="div">
            ID Bitacora: {data.bitacora_id}
          </Typography>
          <Typography variant="h6" component="div">
            ID BitaEvent: {query.id}
          </Typography>
          <Typography variant="h6" component="div">
            Author: {data.bitacora.author.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Fecha: {convertDate1(data.bitacoraDate)}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Tipo Event: {data.tipoEvent.description}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Event: {data.event.description}
          </Typography>

          <Typography variant="h6" color="textSecondary" component="h2">
            <Interweave content={data.description} />
          </Typography>
        </CardContent>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src={"/static/images/" + `${query.id}` + ".jpg"}
            alt="Image"
            width={1920 / 3}
            height={1280 / 3}
          />
        </div>
      </Card>
    </div>
  );
};

export default IdbitaEvent;
