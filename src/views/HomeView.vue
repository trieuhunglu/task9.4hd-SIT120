<script setup>
const emit = defineEmits(['view-pets'])

function goToPets() {
  emit('view-pets')
}
</script>

<template>
  <section class="hero-section">
    <div class="container hero-content">

      <div class="hero-text">
        <h1>Find Your New Best Friend</h1>

        <p>
          PawConnect helps people discover pets that are waiting
          for a loving and responsible home.
        </p>

        <button
          type="button"
          class="btn"
          @click="goToPets"
        >
          Meet Our Pets
        </button>
      </div>

      <div class="hero-image">
        <img
          src="../assets/hero.png"
          alt="Happy adopted pets"
        >
      </div>

    </div>
  </section>

  <section class="mission-section">
    <div class="container">

      <h2>Our Mission</h2>

      <p>
        Our mission is to increase pet adoption and strengthen
        community engagement in responsible pet care.
      </p>

    </div>
  </section>

  <section class="featured-section">
    <div class="container">

      <h2>Featured Pets</h2>

      <div class="pet-grid">

        <article class="pet-card">
          <h3>Luna</h3>
          <p>Friendly and calm cat looking for a loving home.</p>
        </article>

        <article class="pet-card">
          <h3>Mochi</h3>
          <p>Playful cat who enjoys attention and quiet spaces.</p>
        </article>

        <article class="pet-card">
          <h3>Oliver</h3>
          <p>Gentle companion who enjoys relaxing with people.</p>
        </article>

      </div>

    </div>
  </section>
</template>