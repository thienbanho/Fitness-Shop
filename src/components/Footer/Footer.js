import React from "react";
import "./Footer.css"

function Footer() {
  return (
    <footer>
      <section class="footer">
        <div class="footer-row">
          <div class="footer-col"></div>

          <div class="footer-col">
            <h3>Store Information</h3>
            <ul class="links">
              <li>
                <a href="#">227 NVC, Quan 5, HCM</a>
              </li>
              <li>
                <a href="#">0582079324</a>
              </li>
              <li>
                <a href="#">fitnessstore@gmail.com</a>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>About us</h4>
            <ul class="links">
              <li>
                <a href="#">Search</a>
              </li>
              <li>
                <a href="#">Introduction</a>
              </li>
              <li>
                <a href="#">Payment Change Policy</a>
              </li>
              <li>
                <a href="#">Main Delivery</a>
              </li>
              <li>
                <a href="#">Policy Payment</a>
              </li>
              <li>
                <a href="#">Buying Guide</a>
              </li>
              <li>
                <a href="#">Service Account</a>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Sign up to receive promotions</h4>
            <form action="#">
              <input type="text" placeholder="Your email" required />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
