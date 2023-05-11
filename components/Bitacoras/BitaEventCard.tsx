import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";import getBitaEventId from "../../services/getBitaEventId";
import dayjs from "dayjs";
import Interweave from "interweave";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

const convertDate = (date: any) => {
  var d = dayjs(date).format("DD-MM-YYYY");
  return d;
};
const convertDate1 = (date: any) => {
  var d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

const BitaEventCard = (props: any): JSX.Element => {
  const { bitacoraSelected } = props;
  const [bitacora_id, setBitacora_id] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [tipoevent, setTipoEvent] = useState("");
  const [event, setEvent] = useState("");

  console.log("bitacoraSelected", bitacoraSelected);
  useEffect(
    function () {
      getBitaEventId(bitacoraSelected.id).then((resp) => {
        console.log("resp", resp);
        setBitacora_id(resp.bitacora_id);
        setBitacoraDate(resp.event_date);
        setAuthor(resp.bitacora.author.name);
        setTipoEvent(resp.tipoEvent.description);
        setEvent(resp.event.description);
        setDescription(resp.description);
      });
    },
    [bitacoraSelected]
  );

  return (
    <Card
      sx={{
        display: "flex",
        width: ["70%", "70%", "30.33%"],
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h6" component="div">
            BitacoraID: {bitacora_id}, BitaEventID: {bitacoraSelected.id}
            {",  "}
            {convertDate1(bitacoraDate)}
          </Typography>
          <Typography variant="h6" component="div">
            Author: {author}
          </Typography>

          <Typography gutterBottom variant="h6" component="h2">
            Tipo Event: {tipoevent}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Event: {event}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary" component="div">
            <Interweave content={description} />
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }} />
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 30 }}
        image={"/static/images/" + `${bitacoraSelected.id}` + ".jpg"}
        alt="Live from space album cover"
      />
      <CardMedia
        component="img"
        sx={{ width: 30 }}
        image={"/static/images/" + `${bitacoraSelected.id}` + "_1.jpg"}
        alt="Live from space album cover"
      />
      <CardMedia
        component="img"
        sx={{ width: 30 }}
        image={"/static/images/" + `${bitacoraSelected.id}` + "_2.jpg"}
        alt="Live from space album cover"
      />
    </Card>
  );
};

BitaEventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitaEventCard);
