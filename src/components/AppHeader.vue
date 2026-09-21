<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { useThemeStore } from '../stores/theme'
import { useFavouritesStore } from '../stores/favourites'

const themeStore = useThemeStore()
const favouritesStore = useFavouritesStore()

const isScrolled = ref(false)
const isMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 80
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleTheme() {
  themeStore.toggleDarkMode()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'header-scrolled': isScrolled }"
  >
    <div class="container header-container">

      <!-- Logo + Mobile Menu Button -->
      <div class="mobile-header-row">

        <div class="logo">
          <RouterLink
            to="/"
            @click="closeMenu"
          >
            <img
              src="../assets/logo.png"
              alt="PawConnect Logo"
            >
          </RouterLink>
        </div>

        <!-- Only displayed on mobile through CSS -->
        <button
          type="button"
          class="mobile-menu-toggle"
          :aria-expanded="isMenuOpen"
          aria-controls="main-navigation"
          aria-label="Toggle navigation menu"
          @click="toggleMenu"
        >
          {{ isMenuOpen ? '✕ Close' : '☰ Menu' }}
        </button>

      </div>

      <!-- Main Navigation -->
      <nav
        id="main-navigation"
        :class="{ 'mobile-menu-open': isMenuOpen }"
        aria-label="Main navigation"
      >
        <ul>

          <li>
            <RouterLink
              to="/"
              class="nav-link"
              @click="closeMenu"
            >
              Home
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/pets"
              class="nav-link"
              @click="closeMenu"
            >
              Meet Our Pets
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/care"
              class="nav-link"
              @click="closeMenu"
            >
              Pet Care
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/contact"
              class="nav-link"
              @click="closeMenu"
            >
              Contact
            </RouterLink>
          </li>

          <!-- Clickable Favourites -->
          <li>
            <RouterLink
              to="/favourites"
              class="favourites-badge"
              @click="closeMenu"
            >
              Favourites: {{ favouritesStore.totalCount }}
            </RouterLink>
          </li>

          <!-- Pinia Theme Toggle -->
          <li>
            <button
              type="button"
              class="theme-toggle"
              @click="toggleTheme"
            >
              {{
                themeStore.isDarkMode
                  ? '☀️ Light Mode'
                  : '🌙 Dark Mode'
              }}
            </button>
          </li>

        </ul>
      </nav>

    </div>
  </header>
</template>