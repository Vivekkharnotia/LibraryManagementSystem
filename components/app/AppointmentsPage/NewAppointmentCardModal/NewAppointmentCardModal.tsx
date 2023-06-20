import { Modal } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import NewAppointmentForm from "../NewAppointmentForm/NewAppointmentForm";

interface NewAppointmentCardModalProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  getAppointmentData: () => void
}

const NewAppointmentCardModal = ({
  modalOpen,
  handleModalClose,
  setSnackbarMessage,
  getAppointmentData
}: NewAppointmentCardModalProps) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[80%] mobile:w-[97%]  bg-[#fff] m-auto">
        <NewAppointmentForm
          handleClose={handleModalClose}
          setSnackbarMessage={setSnackbarMessage}
          getAppointmentData={getAppointmentData}
        />
      </div>
    </Modal>
  );
};

export default NewAppointmentCardModal;
