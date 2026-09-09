<script setup>
import { ref } from 'vue'

import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ContactForm from './components/ContactForm.vue'

import HomeView from './views/HomeView.vue'
import PetsView from './views/PetsView.vue'
import PetCareView from './views/PetCareView.vue'


// ===========================
// VIEW MANAGEMENT
// ===========================

const currentView = ref('home')

function changeView(view) {
  currentView.value = view
}


// ===========================
// FORM SUBMISSION DATA
// ===========================

const submittedData = ref(null)

function handleFormSubmit(data) {
  submittedData.value = data
}
</script>


<template>

  <!-- Header -->
  <AppHeader
    :currentView="currentView"
    @change-view="changeView"
  />


  <!-- Main Content -->
  <main>

    <!-- Page Views -->
    <HomeView
  v-if="currentView === 'home'"
  @view-pets="changeView('pets')"
/>

<PetsView
  v-else-if="currentView === 'pets'"
/>

<PetCareView
  v-else-if="currentView === 'care'"
/>

<ContactForm
  v-else-if="currentView === 'contact'"
  formTitle="Adoption Enquiry"
  @submit-form="handleFormSubmit"
/>


    <!-- Customer Acknowledgement -->
    <section
      v-if="submittedData && currentView === 'contact'"
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


  <!-- Footer -->
  <AppFooter />

</template>