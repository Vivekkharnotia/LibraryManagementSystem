import React from "react";
import AppointmentCard from "./AppointmentCard";
import NewAppointmentCard from "./NewAppointmentCard";

const appointmentsData = [
  { number: 1, name: "Dr. Piyush Goyel", time: "", date: "" },
  { number: 2, name: "Dr. Piyush Goyel", time: "", date: "" },
  { number: 3, name: "Dr. Piyush Goyel", time: "", date: "" },
  { number: 4, name: "Dr. Piyush Goyel", time: "", date: "" },
];

const Appointments = () => {
  return (
    <div
      className={`flex flex-row flex-wrap justify-center md:justify-start gap-8 text-[#000] px-8 py-8`}
    >
      {appointmentsData?.map((appointment) => {
        return (
          <AppointmentCard
            key={appointment.number}
            name={appointment.name}
            number={appointment.number}
          />
        );
      })}
      <NewAppointmentCard />
    </div>
  );
};

export default Appointments;
