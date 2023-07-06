import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import EventCard from "./EventCard";

export default function MainContent() {
  return (
    <>
      <Typography paragraph sx={{fontSize: '20px'}}>Choose a contest to begin your adventure</Typography>
      <Box sx={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem" }}>
        <EventCard />
        <EventCard />
        <EventCard />
      </Box>
    </>
  );
}
