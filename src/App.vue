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
            Email:
            {{ submittedData.email }}
          </li>

          <li>
            Age:
            {{ submittedData.age }}
          </li>

          <li>
            Selected Pet:
            {{ submittedData.selectedPet }}
          </li>

          <li>
            Pet Type:
            {{ submittedData.petType }}
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