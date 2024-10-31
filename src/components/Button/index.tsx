import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick: () => void;
  disabled?: boolean;
  title?: string;
}

const Button = ({
  children,
  type,
  onClick,
  disabled = false,
  title = "Button",
}: ButtonProps) => {
  return (
    <button
      className={styles.container}
      type={type}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
