import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { useMeeting } from "components/MeetingContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createMeeting, getToken } from "../../../../../controllers/meeting";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "components/general/firebase-config";
import { useUser } from "components/UserContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const Container = styled("div")(({ theme }) => ({
  border: "1px solid #B4B4B4",
  padding: "1rem",
  borderRadius: "10px",
  marginTop: "2rem",
  whiteSpace: "nowrap",
  flexShrink: 0,
}));

function Session({ slot, index }: { slot: string; index: number }) {
  const [date, time] = slot.split(" ");
  const { token, meetingId, updateToken, updateMeetingId } = useMeeting();
  const router = useRouter();
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeMeetingId, setActiveMeetingId] = useState<string>("");
  const [meetId, setMeetId] = useState<string>("");

  useEffect(() => {
    // get the activeMeetingId from firebase
    getActiveMeetingId();
  }, [meetingId]);

  const getActiveMeetingId = async () => {
    const docRef = doc(db, "Userdata", user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      setActiveMeetingId(userData.activeMeetingId);
    } else {
      console.log("No such document!");
    }
  };

  const handleMeetingJoin = async () => {
    const token = await getToken();
    const _meetingId = await createMeeting({ token });
    updateToken(token);
    updateMeetingId(_meetingId);
    setMeetId(_meetingId);
    router.push("/meeting");
  };

  useEffect(() => {
    if (meetId) {
      updateMeetingsData();
    }
  }, [meetId]);

  const updateMeetingsData = async () => {
    // get the current user data and set as a field in the meeting document
    const docRef = doc(db, "Userdata", user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // store the active meeting id in the user data
      await setDoc(docRef, { activeMeetingId: meetingId }, { merge: true });

      // only storing the user id in the meeting document
      await setDoc(doc(db, "Meetings", meetingId), { userId: user?.uid });
    } else {
      console.log("No such document!");
    }
  const handleCopy = () => {
    navigator.clipboard.writeText(activeMeetingId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <Container>

          <h5 style={{ marginBottom: "1rem" }}>Meeting {index + 1}</h5>
          <div style={{ marginBottom: "0.5rem", whiteSpace: "normal" }}>
            Date of meeting: <b style={{ whiteSpace: "nowrap" }}>{date}</b>
          </div>
          <div style={{ marginBottom: "1.2rem", whiteSpace: "normal" }}>
            Time of meeting: <b style={{ whiteSpace: "nowrap" }}>{time}</b>
          </div>

          <Button
            disableElevation
            variant="contained"
            onClick={handleMeetingJoin}
            sx={{
              backgroundColor: "hsl(44, 100%, 49%)!important",
              "&:hover": { backgroundColor: "hsl(44, 100%, 45%)!important" },
            }}
          >
            Join Meeting
          </Button>

          {activeMeetingId && (
            <Typography sx={{ marginTop: "1rem" }}>
              Meeting id: <strong>{activeMeetingId}</strong>
              <IconButton>
                {!copied ? (
                  <Tooltip title="Copy to clipboard" arrow>
                    <ContentCopyIcon fontSize="small" onClick={handleCopy} />
                  </Tooltip>
                ) : (
                  <Tooltip title="Copied" arrow>
                    <DoneAllIcon fontSize="small" color="success" />
                  </Tooltip>
                )}
              </IconButton>
            </Typography>
          )}

      </Container>
    </>
  );
}

export default Session;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
}
