<template>
  <footer class="site-footer">
    <div class="container footer-container">

      <div class="footer-about">
        <h2>PawConnect</h2>

        <p>
          Helping people connect with pets and supporting responsible adoption.
        </p>
      </div>

      <div class="footer-links">
        <h3>Quick Links</h3>

        <ul>
          <li>
            <RouterLink to="/">
              Home
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/pets">
              Meet Our Pets
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/care">
              Pet Care
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/contact">
              Contact
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="footer-contact">
        <h3>Contact</h3>

        <p>
          Email:
          <a href="mailto:pawconnect@gmail.com">
            pawconnect@gmail.com
          </a>
        </p>

        <p>
          Phone:
          <a href="tel:0390000000">
            03 9000 0000
          </a>
        </p>
      </div>

    </div>

    <p class="copyright">
      © 2026 PawConnect. All rights reserved.
    </p>
  </footer>
</template>