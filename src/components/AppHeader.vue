<script setup>
defineProps({
  currentView: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['change-view'])

function changeView(view) {
  emit('change-view', view)
}
</script>

<template>
  <header class="site-header">
    <div class="container header-container">

      <div class="logo">
        <img src="../assets/logo.png" alt="PawConnect Logo">
      </div>

      <nav aria-label="Main navigation">
        <ul>
          <li>
            <button
              type="button"
              :class="{ active: currentView === 'home' }"
              @click="changeView('home')"
            >
              Home
            </button>
          </li>

          <li>
            <button
              type="button"
              :class="{ active: currentView === 'pets' }"
              @click="changeView('pets')"
            >
              Meet Our Pets
            </button>
          </li>

          <li>
            <button
              type="button"
              :class="{ active: currentView === 'care' }"
              @click="changeView('care')"
            >
              Pet Care
            </button>
          </li>
          <li>
            <button
            type="button"
            :class="{ active: currentView === 'contact' }"
            @click="changeView('contact')"
        >
            Contact
            </button>
        </li>
        </ul>
      </nav>

    </div>
  </header>
</template>