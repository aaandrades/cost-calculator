import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <section className={styles.container}>{children}</section>;
};

export default Card;
