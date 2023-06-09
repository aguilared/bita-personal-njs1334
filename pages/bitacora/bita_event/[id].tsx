import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import getBitacoraEvents from "../../../services/getBitacoraEvents";
import getBitaEventId from "../../../services/getBitaEventId";
import dayjs from "dayjs";
import Interweave from "interweave";

import { useRouter } from "next/router";
import Image from "next/image";

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

const BitaEventCard = (props: any): JSX.Element => {
  const { query } = useRouter();
  const [bitacora_id, setBitacora_id] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [tipoevent, setTipoEvent] = useState("");
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(false);

  //console.log("Query", query);
  //console.log("QueryId", query.id);
  useEffect(
    function () {
      setLoading(true);
      getBitaEventId(query.id).then((resp) => {
        console.log("resp", resp);
        setBitacora_id(resp.bitacora_id);
        setBitacoraDate(resp.event_date);
        setAuthor(resp.bitacora.author.name);
        setTipoEvent(resp.tipoEvent.description);
        setEvent(resp.event.description);
        setDescription(resp.description);
        setLoading(false);
      });
    },
    [query]
  );

  if (loading) {
    return <span>Loading...</span>;
  }

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
            ID Bitacora: {bitacora_id}, ID BitaEvent: {query.id}, Fecha:{" "}
            {convertDate1(bitacoraDate)}
          </Typography>{" "}
          <Typography variant="h6" component="div">
            Author: {author}
          </Typography>
        </CardContent>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src={"/static/images/" + `${query.id}` + ".jpg"}
            alt="Image"
            width={1920 / 2}
            height={1280 / 2}
          />
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src={"/static/images/" + `${query.id}` + "_1.jpg"}
            alt="Image"
            width={1920 / 2}
            height={1280 / 2}
          />
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src={"/static/images/" + `${query.id}` + "_2.jpg"}
            alt="Image"
            width={1920 / 2}
            height={1280 / 2}
          />
        </div>
      </Card>
    </div>
  );
};

BitaEventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitaEventCard);
