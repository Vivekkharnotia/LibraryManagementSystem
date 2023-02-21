import { Modal } from '@mui/material';
import React from 'react'
import { BsPlus } from 'react-icons/bs';
import useDevice from 'utils/useDevice';

const NewAppointmentCard = () => {
    const [newOpen, setNewOpen] = React.useState(false);
    const handleNewOpen = () => setNewOpen(true);
    const handleNewClose = () => setNewOpen(false);
    const { isMobile } = useDevice();
  
    return (
      <>
        {isMobile ? (
          <div
            className="fixed right-[24px] bottom-[72px] z-50 rounded-full bg-[#000] text-[#FFF] p-3"
            onClick={handleNewOpen}
          >
            <BsPlus className="w-8 h-8" />
          </div>
        ) : (
          <div
            className="flex flex-row items-center justify-center max-w-[240px] h-[180px] border-[1px] border-dashed border-[#000] rounded-[15px] cursor-pointer justify-self-center w-full md:justify-self-auto"
            onClick={handleNewOpen}
          >
            <BsPlus className="w-8 h-8" />
          </div>
        )}
        <Modal
          open={newOpen}
          onClose={handleNewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[80%] bg-[#fff] m-auto"></div>
        </Modal>
      </>
    );
  };

export default NewAppointmentCard