<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores/theme'

import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const submittedData = ref(null)

const themeStore = useThemeStore()
const route = useRoute()

function handleFormSubmit(data) {
  submittedData.value = data
}
</script>

<template>
  <div
    class="app-shell"
    :class="themeStore.currentThemeClass"
  >
    <AppHeader />

    <main>
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          v-bind="
            route.path === '/contact'
              ? { onSubmitForm: handleFormSubmit }
              : {}
          "
        />
      </RouterView>

      <!-- Customer Acknowledgement -->
      <section
        v-if="submittedData && route.path === '/contact'"
        class="acknowledgement-card"
      >
        <h3>
          Customer Acknowledgement
        </h3>

        <p>
          Thank you, {{ submittedData.fullName }}.
          Your adoption enquiry has been received.
        </p>

        <ul>
          <li>
            Email: {{ submittedData.email }}
          </li>

          <li>
            Age: {{ submittedData.age }}
          </li>

          <!-- All Selected Pets -->
          <li>
            Selected Pets:
            {{ submittedData.selectedPet }}

            <template
              v-for="(additionalPet, index) in submittedData.additionalPets"
              :key="`pet-${index}`"
            >
              <span v-if="additionalPet.pet">
                , {{ additionalPet.pet }}
              </span>
            </template>
          </li>

          <!-- All Pet Types -->
          <li>
            Pet Types:
            {{ submittedData.petType }}

            <template
              v-for="(additionalPet, index) in submittedData.additionalPets"
              :key="`type-${index}`"
            >
              <span v-if="additionalPet.pet">
                , {{ additionalPet.type }}
              </span>
            </template>
          </li>

          <li>
            Preferences:
            {{ submittedData.preferences.join(', ') }}
          </li>
        </ul>
      </section>
    </main>

    <AppFooter />
  </div>
</template>