import Service from "./Service";
import { services } from "./constants/services";
import styles from "./Services.module.css";

import React from "react";

const Services = () => {
  return (
    <div id="services" className={styles.container}>
      <div className={styles.title}>Services</div>
      <div className={styles.grid}>
        {services.map((service, index) => (
          <Service key={index} name={service.name} image={service.image} />
        ))}
      </div>
    </div>
  );
};

export default Services;
