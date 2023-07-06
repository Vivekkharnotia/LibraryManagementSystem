import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import CurrentCaseContentModal from "./AppointmentCard/CurrentCaseContentModal";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EventCard({ event, open, setOpen }) {
  const [expanded, setExpanded] = React.useState(false);
  const date = new Date(event.createdAt.seconds * 1000);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [slot, setSlot] = useState(false);
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleClose = () => setOpen(false);
  const toggleSlot = () => setSlot((prev) => !prev);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              S
            </Avatar>
          }
          title={event.eventName}
          subheader={date.toDateString()}
        />
        <CardMedia component="img" height="250px" image="/eventImage.jfif" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {event.description ? event.description : "No description"}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Rules:</Typography>
            <Typography paragraph>
              1. Only original photographs taken by the entrant will be
              accepted. Entrants must be the sole owner of the copyright for the
              photographs they submit.
            </Typography>
            <Typography paragraph>
              2. Photographs must not violate any laws or infringe upon the
              rights of any third parties.
            </Typography>
            <Typography paragraph>
              3. Entrants must provide a valid email address and contact
              information in order to enter the contest.
            </Typography>
            <Typography paragraph>
              4. Photographs must be submitted in a specified format (e.g. JPEG,
              PNG) and size.
            </Typography>
            <Typography paragraph>
              5. Entrants may be required to pay a fee to enter the contest.
            </Typography>
            <Typography paragraph>
              6. Entrants must agree to allow the organizers to use their
              photographs for promotional purposes if they are selected as a
              winner.
            </Typography>
            <Typography paragraph>
              7. The judges' decisions are final and no correspondence will be
              entered into regarding the results of the contest.
            </Typography>
            <Typography paragraph>
              8. The organizers reserve the right to disqualify any entrant who
              does not comply with the rules or who engages in dishonest or
              unethical behavior.
            </Typography>
            <Typography paragraph>
              9. The contest is void where prohibited by law.
            </Typography>
          </CardContent>
        </Collapse>

        {router.pathname === "/app/myEvents" && (
          <span
            style={{
              backgroundColor: event.isPublished ? "green" : "red",
              color: "white",
              padding: "0.5rem",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          >
            {event.isPublished ? "Published" : "Not Published"}
          </span>
        )}
      </Card>

      <CurrentCaseContentModal
        open={open}
        handleClose={handleClose}
        toggleSlot={toggleSlot}
        id={event.eventId}
      />
    </>
  );
}
