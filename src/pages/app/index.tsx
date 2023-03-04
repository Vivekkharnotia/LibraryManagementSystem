import AppointmentHeroImage from "components/general/Appointments/AppointmentHeroImage/AppointmentHeroImage";
import Appointments from "components/general/Appointments/Appointments";
import React from "react";
import VisitBlog from '../../../components/general/VisitBlog/VisitBlog';

const app = () => {
  return (
    <>
      <AppointmentHeroImage />
      <Appointments />
    </>
  );
};

export default app;
