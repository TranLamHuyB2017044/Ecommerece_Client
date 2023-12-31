import styles from "./Newsletter.module.scss";
import { Link } from "react-router-dom";
import {NewsletterIMG} from '../../data'

function Newsletter() {
  return (
    <div className={styles.Newsletter_container}>
        <div className={styles.Newsletter_content}>
          <p>Our Lowest Prices of the Season on Specials: 20-65% off. </p>
          <Link to="/products" onClick={() => window.scrollTo(0, 0)}>Shop all</Link>
        </div>
        
        <img loading="lazy" src={NewsletterIMG} alt="NewsletterIMG" />
          
    </div>
  );
}

export default Newsletter;
