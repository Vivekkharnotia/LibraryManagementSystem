import { Modal } from "@mui/material";
import React from "react";
import CurrentCaseContent from "../CurrentCaseContent/CurrentCaseContent";

interface CurrentCaseContentModalProps {
  open: boolean;
  handleClose: () => void;
  toggleSlot: () => void;
  id: string;
}

const CurrentCaseContentModal = ({
  open,
  handleClose,
  toggleSlot,
  id,
}: CurrentCaseContentModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[95%] bg-[#fff] m-auto md:w-[80%]">
        <CurrentCaseContent
          toggleSlot={toggleSlot}
          handleClose={handleClose}
          id={id}
        />
      </div>
    </Modal>
  );
};

export default CurrentCaseContentModal;
