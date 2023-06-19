import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import useDevice from "utils/useDevice";
import GPSnackbar from "components/general/GeneralPurpose/GPSnackbar";
import NewAppointmentCardModal from "../NewAppointmentCardModal/NewAppointmentCardModal";

const NewAppointmentCard = ({
  getAppointmentData,
}: {
  getAppointmentData: () => void;
}) => {
  const { isMobile } = useDevice();
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      {isMobile ? (
        <div
          className="fixed right-[24px] bottom-[72px] z-50 rounded-full bg-[#000] text-[#FFF] p-3"
          onClick={handleModalOpen}
        >
          <BsPlus className="w-8 h-8" />
        </div>
      ) : (
        <div
          className="hover:border-[2px] hover:border-solid flex flex-row items-center justify-center max-w-[240px] border-[1px] min-h-[250px] border-dashed border-[#000] rounded-[15px] cursor-pointer justify-self-center w-full md:justify-self-auto"
          onClick={handleModalOpen}
        >
          <BsPlus className="w-8 h-8" />
        </div>
      )}

      {/* modal to create a new appoinment */}
      <NewAppointmentCardModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        setSnackbarMessage={setSnackbarMessage}
        getAppointmentData={getAppointmentData}
      />

      {/* case creation success snackbar */}
      <GPSnackbar message={snackbarMessage} />
    </>
  );
};

export default NewAppointmentCard;
