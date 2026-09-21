<script setup>
import { useFavouritesStore } from '../stores/favourites'

const favouritesStore = useFavouritesStore()
</script>

<template>
  <section class="pets-section">
    <div class="container">

      <div class="section-heading">
        <h1>My Favourite Pets</h1>

        <p>
          View the pets you have saved and learn more about them
          before starting your adoption enquiry.
        </p>
      </div>

      <!-- No favourites -->
      <div
        v-if="favouritesStore.totalCount === 0"
        class="favourites-summary"
      >
        <h2>No Favourite Pets Yet</h2>

        <p>
          You have not saved any pets yet.
          Visit Meet Our Pets to find your future companion.
        </p>

        <RouterLink
          to="/pets"
          class="favourites-page-link"
        >
          Meet Our Pets
        </RouterLink>
      </div>

      <!-- Favourite pet cards -->
      <div
        v-else
        class="pet-grid"
      >
        <article
          v-for="pet in favouritesStore.items"
          :key="pet.id"
          class="pet-card"
        >
          <img
            :src="pet.image"
            :alt="pet.name"
            class="pet-image"
          >

          <div class="pet-card-content">
            <h2>{{ pet.name }}</h2>

            <p>
              <strong>Type:</strong>
              {{ pet.type }}
            </p>

            <p v-if="pet.breed">
              <strong>Breed:</strong>
              {{ pet.breed }}
            </p>

            <p v-if="pet.age">
              <strong>Age:</strong>
              {{ pet.age }}
            </p>

            <p v-if="pet.location">
              <strong>Location:</strong>
              {{ pet.location }}
            </p>

            <p
              v-if="pet.description"
              class="pet-description"
            >
              {{ pet.description }}
            </p>

            <button
              type="button"
              class="favourite-btn remove"
              @click="favouritesStore.removeItem(pet.id)"
            >
              Remove from Favourites
            </button>
          </div>
        </article>
      </div>

      <!-- Favourites actions -->
      <div
        v-if="favouritesStore.totalCount > 0"
        class="favourites-page-actions"
      >
        <RouterLink
          to="/contact"
          class="adopt-favourite-btn"
        >
          Start Adoption Enquiry
        </RouterLink>

        <button
          type="button"
          class="clear-favourites-btn"
          @click="favouritesStore.resetStore()"
        >
          Clear All Favourites
        </button>
      </div>

    </div>
  </section>
</template>