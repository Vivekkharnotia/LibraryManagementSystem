import { Modal } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import SlotBooking from "../SlotBooking/SlotBooking";

interface SlotBookingModalProps {
  slot: boolean;
  toggleSlot: Dispatch<SetStateAction<boolean>>;
  id: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  setErrorDialog: Dispatch<SetStateAction<boolean>>;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  setSlot: Dispatch<SetStateAction<boolean>>;
}

const SlotBookingModal = ({
  slot,
  toggleSlot,
  id,
  setErrorMsg,
  setErrorDialog,
  setSnackbarMessage,
  setSlot,
}: SlotBookingModalProps) => {
  return (
    <Modal
      open={slot}
      onClose={toggleSlot}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[97%] bg-[#fff] m-auto sm:w-[80%]">
        <SlotBooking
          id={id}
          setErrorMsg={setErrorMsg}
          setErrorDialog={setErrorDialog}
          setSnackbarMessage={setSnackbarMessage}
          setSlot={setSlot}
        />
      </div>
    </Modal>
  );
};

export default SlotBookingModal;
