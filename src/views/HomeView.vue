<script setup>
import cat1 from '../assets/cat-1.png'
import cat2 from '../assets/cat-2.png'
import cat3 from '../assets/cat-3.png'
import dog1 from '../assets/dog-1.png'

const featuredPets = [
  {
    id: 1,
    name: 'Luna',
    description: 'Friendly and calm cat looking for a loving home.',
    image: cat1
  },
  {
    id: 2,
    name: 'Mochi',
    description: 'Playful cat who enjoys attention and quiet spaces.',
    image: cat2
  },
  {
    id: 3,
    name: 'Oliver',
    description: 'Gentle companion who enjoys relaxing with people.',
    image: cat3
  },
  {
    id: 4,
    name: 'Max',
    description: 'Active and friendly dog who loves outdoor walks.',
    image: dog1
  }
]
</script>

<template>
  <section class="hero-section">
    <div class="container hero-content">

      <div class="hero-text">
        <h1>Find Your New Best Friend</h1>

        <p>
          PawConnect helps people discover pets looking for loving homes
          and supports responsible pet adoption.
        </p>

        <RouterLink
          to="/pets"
          class="btn"
        >
          Find Your Companion
        </RouterLink>
      </div>

      <div class="hero-image">
        <img
          src="../assets/hero.png"
          alt="Pets waiting for adoption"
        >
      </div>

    </div>
  </section>

  <section class="mission-section">
    <div class="container">

      <h2>Our Mission</h2>

      <p>
        Our mission is to increase pet adoption and strengthen community
        engagement in taking care of pets. PawConnect makes it easier for
        people to explore available pets and begin their adoption journey.
      </p>

    </div>
  </section>

  <section class="featured-section">
    <div class="container">

      <h2>Featured Pets</h2>

      <div class="pet-grid">

        <article
          v-for="pet in featuredPets"
          :key="pet.id"
          class="pet-card"
        >
          <img
            :src="pet.image"
            :alt="pet.name"
            class="pet-image"
          >

          <div class="pet-card-content">
            <h3>{{ pet.name }}</h3>

            <p>
              {{ pet.description }}
            </p>
          </div>
        </article>

      </div>

    </div>
  </section>
</template>