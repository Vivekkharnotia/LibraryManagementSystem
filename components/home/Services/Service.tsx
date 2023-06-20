import styles from "./Services.module.css";

interface ServiceProps {
  image: string;
  name: string;
}

export default function Service({ image, name }: ServiceProps) {
  return (
    <div className={styles.service}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.name}>{name}</div>
    </div>
  );
}
