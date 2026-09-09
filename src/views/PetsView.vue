<script setup>
import cat1 from '../assets/cat-1.png'
import cat2 from '../assets/cat-2.png'
import cat3 from '../assets/cat-3.png'
import dog1 from '../assets/dog-1.png'

const pets = [
  {
    name: 'Luna',
    type: 'Cat',
    age: '2 years old',
    description: 'Friendly, calm and affectionate.',
    image: cat1
  },
  {
    name: 'Mochi',
    type: 'Cat',
    age: '1 year old',
    description: 'Playful, curious and enjoys attention.',
    image: cat2
  },
  {
    name: 'Oliver',
    type: 'Cat',
    age: '3 years old',
    description: 'Gentle and enjoys relaxing with people.',
    image: cat3
  },
  {
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
        </p>
      </div>

      <div class="pet-grid">

        <article
          v-for="pet in pets"
          :key="pet.name"
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
              {{ pet.type }} • {{ pet.age }}
            </p>

            <p>
              {{ pet.description }}
            </p>
          </div>
        </article>

      </div>

    </div>
  </section>
</template>