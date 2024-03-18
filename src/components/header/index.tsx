import { Link } from "react-router-dom";
import styles from "./header.module.css";

import logoimg from "../../assets/logo.svg";
import logoimg2 from "../../assets/dev_davi.jpg";
import logoimg3 from "../../assets/Davi.mp4";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logoimg2} width="100px" alt="Logo Cripto" />
        </Link>
      </div>
    </header>
  );
}
