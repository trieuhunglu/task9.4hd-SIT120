<script setup>
import cat1 from '../assets/cat-1.png'
import cat2 from '../assets/cat-2.png'
import cat3 from '../assets/cat-3.png'
import dog1 from '../assets/dog-1.png'

import { useFavouritesStore } from '../stores/favourites'

const favouritesStore = useFavouritesStore()

const pets = [
  {
    id: 1,
    name: 'Luna',
    type: 'Cat',
    age: '2 years old',
    description: 'Friendly, calm and affectionate.',
    image: cat1
  },
  {
    id: 2,
    name: 'Mochi',
    type: 'Cat',
    age: '3 years old',
    description: 'Playful, curious and enjoys attention.',
    image: cat2
  },
  {
    id: 3,
    name: 'Oliver',
    type: 'Cat',
    age: '3 months old',
    description: 'Gentle and enjoys relaxing with people.',
    image: cat3
  },
  {
    id: 4,
    name: 'Max',
    type: 'Dog',
    age: '4 years old',
    description: 'Active, friendly and loves outdoor walks.',
    image: dog1
  }
]
</script>

<template>
  <section class="pets-section">
    <div class="container">

      <div class="section-heading">
        <h1>Meet Our Pets</h1>

        <p>
          Explore some of the pets currently looking for a loving home.
          Found your perfect companion? Start an adoption enquiry today.
        </p>
      </div>

      <div class="pet-grid">

        <article
          v-for="pet in pets"
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
              <strong>Type:</strong> {{ pet.type }}
            </p>

            <p>
              <strong>Age:</strong> {{ pet.age }}
            </p>

            <p>
              {{ pet.description }}
            </p>

            <div class="pet-card-actions">
              <button
                v-if="!favouritesStore.items.some(item => item.id === pet.id)"
                type="button"
                class="favourite-btn"
                @click="favouritesStore.addItem(pet)"
              >
                Add to Favourites
              </button>

              <button
                v-else
                type="button"
                class="favourite-btn remove"
                @click="favouritesStore.removeItem(pet.id)"
              >
                Remove Favourite
              </button>

              <RouterLink
                to="/contact"
                class="adopt-pet-btn"
              >
                Adopt {{ pet.name }}
              </RouterLink>
            </div>
          </div>
        </article>

      </div>

      <section class="favourites-summary">
        <h2>Your Favourite Pets</h2>

        <p>
          {{ favouritesStore.formattedSummary }}
        </p>

        <p>
          Total selected: {{ favouritesStore.totalCount }}
        </p>

        <div class="favourites-summary-actions">
          <RouterLink
            v-if="favouritesStore.totalCount > 0"
            to="/favourites"
            class="view-favourites-btn"
          >
            View My Favourites
          </RouterLink>

          <button
            v-if="favouritesStore.totalCount > 0"
            type="button"
            class="clear-favourites-btn"
            @click="favouritesStore.resetStore"
          >
            Clear All Favourites
          </button>
        </div>
      </section>

    </div>
  </section>
</template>