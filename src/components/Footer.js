import { faGithub, faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/fitra-nurakbar" target={"_blank"}>
        <Icon icon={faGithub} />
        fitra-nurakbar
      </Link>
    </footer>
  );
}
