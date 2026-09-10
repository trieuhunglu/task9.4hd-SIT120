<script setup>
import { useThemeStore } from '../stores/theme'
import { useFavouritesStore } from '../stores/favourites'

const themeStore = useThemeStore()
const favouritesStore = useFavouritesStore()
</script>

<template>
  <header class="site-header">
    <div class="container header-container">

      <div class="logo">
        <RouterLink to="/">
          <img
            src="../assets/logo.png"
            alt="PawConnect Logo"
          >
        </RouterLink>
      </div>

      <nav aria-label="Main navigation">
        <ul>

          <li>
            <RouterLink
              to="/"
              class="nav-link"
            >
              Home
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/pets"
              class="nav-link"
            >
              Meet Our Pets
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/care"
              class="nav-link"
            >
              Pet Care
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/contact"
              class="nav-link"
            >
              Contact
            </RouterLink>
          </li>
          <li>
            <span class="favourites-badge">
            Favourites: {{ favouritesStore.totalCount }}
            </span>
          </li>
          <li>
            <button
              class="theme-toggle"
              @click="themeStore.toggleDarkMode"
            >
              {{ themeStore.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
            </button>
          </li>

        </ul>
      </nav>

    </div>
  </header>
</template>