import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, IconButton } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import GPBackdrop from "../../../general/GeneralPurpose/GPBackdrop";
import GPDialog from "../../../general/GeneralPurpose/GPDialog";
import GPSnackbar from "../../../general/GeneralPurpose/GPSnackbar";
import { db } from "../../../general/firebase-config";
import BuySessionsModal from "./BuySessionsModal";
import SlotBookingModal from "./SlotBookingModal";
import CurrentCaseContentModal from "./CurrentCaseContentModal";
import AppointmentCardPopover from "./AppointmentCardPopover";

interface AppointmentCardProps {
  number: number;
  id: string;
  name: string;
  time?: string;
  date?: string;
  setErrorDialog: Dispatch<SetStateAction<boolean>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  user: any;
  numberOfSessions: number;
  getAppointmentData: () => void;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  number,
  id,
  name,
  date,
  setErrorDialog,
  setErrorMsg,
  user,
  numberOfSessions,
  getAppointmentData,
}) => {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buy, setBuy] = useState(false);
  const toggleBuy = () => setBuy((prev) => !prev);
  const toggleSlot = () => setSlot((prev) => !prev);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  const handleCaseDelete = async () => {
    setAnchorEl(null);
    setLoading(true);
    setDialogOpen(false);
    try {
      await deleteDoc(doc(db, `Userdata/${user.uid}/cases`, id));
      await getAppointmentData();
    } catch (err: any) {
      setErrorMsg(err.message);
      setErrorDialog(true);
    }
    setLoading(false);
  };

  const handleDialogClose = () => {
    handlePopoverClose();
    setDialogOpen(false);
  };

  return (
    <>
      <GPBackdrop loading={loading} message="Deleting..." />

      <GPSnackbar message={snackbarMessage} />

      {/* delete confirm dialog */}
      <GPDialog
        open={dialogOpen}
        setOpen={handleDialogClose}
        title="Are you sure you want to delete this case?"
        contentText={`Delete case, ${name}?`}
        buttons={[
          {
            text: "Cancel",
            onClick: handleDialogClose,
          },
          {
            text: "Delete",
            onClick: handleCaseDelete,
            color: "error",
          },
        ]}
      />

      <div className="hover:outline hover:outline-[1px] transition ease-in-out flex flex-col w-[240px] min-h-[270px] border-[1px] border-[#000] rounded-[15px] cursor-pointer mr-6 px-5 py-5 relative justify-items-start">
        <IconButton
          onClick={handlePopoverClick}
          className="!absolute top-4 right-1 z-50"
        >
          <MoreVertIcon />
        </IconButton>

        {/* card popover will trigger the dialog on delete click */}
        <AppointmentCardPopover
          popoverId={popoverId}
          popoverOpen={popoverOpen}
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
          setDialogOpen={setDialogOpen}
        />

        <div onClick={handleOpen} style={{ position: "relative" }}>
          <div
            style={{
              marginBottom: "15px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span className="text-[20px] mr-2">{number}.</span>
            <span className="text-[26px] mr-2">{name}</span>
          </div>

          <div className="font-light mb-2">
            Sessions left: {numberOfSessions}
          </div>
          <div className="font-light mb-2">
            Created at:
            <span className="font-light">{date || "2nd of January, 2023"}</span>
          </div>
          <Image
            src="/appointmentCardBg.svg"
            alt="Three rows of three dots"
            width={60}
            height={60}
            className="absolute bottom-5 right-5"
          />
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e9ab02", marginTop: "1.5rem" }}
          onClick={toggleBuy}
        >
          Buy sessions
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e9ab02", marginTop: "10px" }}
          onClick={toggleSlot}
        >
          Book Slots
        </Button>
      </div>

      {/* current case content */}
      <CurrentCaseContentModal
        open={open}
        handleClose={handleClose}
        toggleSlot={toggleSlot}
        id={id}
      />

      {/* visible on clicking buy sessions button */}
      <BuySessionsModal
        buy={buy}
        toggleBuy={toggleBuy}
        setSnackbarMessage={setSnackbarMessage}
      />

      {/* to book time slot for case */}
      <SlotBookingModal
        slot={slot}
        toggleSlot={toggleSlot}
        id={id}
        setErrorMsg={setErrorMsg}
        setErrorDialog={setErrorDialog}
        setSnackbarMessage={setSnackbarMessage}
        setSlot={setSlot}
      />
    </>
  );
};

export default AppointmentCard;
