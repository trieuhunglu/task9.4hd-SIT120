<script setup>
import { ref } from 'vue'

defineProps({
  formTitle: {
    type: String,
    default: 'Adoption Enquiry'
  }
})

const emit = defineEmits(['submit-form'])

const pets = [
  'Luna',
  'Mochi',
  'Oliver',
  'Max'
]

const form = ref({
  fullName: '',
  email: '',
  age: null,
  petType: '',
  selectedPet: '',
  preferences: []
})

const errors = ref({})
const successMessage = ref('')


const validateForm = () => {
  errors.value = {}

  // Full Name
  if (!form.value.fullName.trim()) {
    errors.value.fullName = 'Please enter your full name.'
  }

  // Email
  if (!form.value.email.trim()) {
    errors.value.email = 'Please enter your email address.'
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
  ) {
    errors.value.email = 'Please enter a valid email address.'
  }

  // Age
  if (!form.value.age || form.value.age < 18) {
    errors.value.age = 'Please enter a valid age of 18 or above.'
  }

  // Selected Pet
  if (!form.value.selectedPet) {
    errors.value.selectedPet = 'Please select a pet.'
  }

  // Pet Type
  if (!form.value.petType) {
    errors.value.petType = 'Please select a pet type.'
  }

  // Preferences
  if (form.value.preferences.length === 0) {
    errors.value.preferences =
      'Please select at least one preference.'
  }

  return Object.keys(errors.value).length === 0
}


const resetForm = () => {
  form.value = {
    fullName: '',
    email: '',
    age: null,
    petType: '',
    selectedPet: '',
    preferences: []
  }

  errors.value = {}
}


const handleSubmit = () => {
  if (!validateForm()) {
    successMessage.value = ''
    return
  }

  emit('submit-form', {
    ...form.value,
    preferences: [...form.value.preferences]
  })

  successMessage.value =
    'Your adoption enquiry was submitted successfully.'

  setTimeout(() => {
    resetForm()
    successMessage.value = ''
  }, 2000)
}
</script>


<template>
  <section class="adoption-form-section">
    <div class="container">

      <h1>{{ formTitle }}</h1>

      <p>
        Interested in giving one of our pets a loving home?
        Complete the form below and our PawConnect team will
        contact you about the next steps.
      </p>


      <form @submit.prevent="handleSubmit" novalidate>

        <!-- Personal Information -->
        <fieldset>

          <legend>
            Personal Information
          </legend>


          <!-- Full Name -->
          <div class="form-group">

            <label for="full-name">
              Full Name
            </label>

            <input
              id="full-name"
              v-model="form.fullName"
              type="text"
            >

            <p
              v-if="errors.fullName"
              class="validation-message"
            >
              {{ errors.fullName }}
            </p>

          </div>


          <!-- Email -->
          <div class="form-group">

            <label for="email">
              Email Address
            </label>

            <input
              id="email"
              v-model="form.email"
              type="email"
            >

            <p
              v-if="errors.email"
              class="validation-message"
            >
              {{ errors.email }}
            </p>

          </div>


          <!-- Age -->
          <div class="form-group">

            <label for="age">
              Age
            </label>

            <input
              id="age"
              v-model.number="form.age"
              type="number"
            >

            <p
              v-if="errors.age"
              class="validation-message"
            >
              {{ errors.age }}
            </p>

          </div>

        </fieldset>


        <!-- Pet Information -->
        <fieldset>

          <legend>
            Pet Information
          </legend>


          <!-- Select Pet -->
          <div class="form-group">

            <label for="selected-pet">
              Select a Pet
            </label>

            <select
              id="selected-pet"
              v-model="form.selectedPet"
            >

              <option value="">
                Choose a pet
              </option>

              <option
                v-for="pet in pets"
                :key="pet"
                :value="pet"
              >
                {{ pet }}
              </option>

            </select>

            <p
              v-if="errors.selectedPet"
              class="validation-message"
            >
              {{ errors.selectedPet }}
            </p>

          </div>


          <!-- Pet Type -->
          <div class="form-group">

            <span class="form-label">
              Pet Type
            </span>

            <div class="radio-group">

              <label>
                <input
                  v-model="form.petType"
                  type="radio"
                  value="Cat"
                >
                Cat
              </label>

              <label>
                <input
                  v-model="form.petType"
                  type="radio"
                  value="Dog"
                >
                Dog
              </label>

            </div>

            <p
              v-if="errors.petType"
              class="validation-message"
            >
              {{ errors.petType }}
            </p>

          </div>


          <!-- Preferences -->
          <div class="form-group">

            <span class="form-label">
              Preferences
            </span>

            <div class="checkbox-group">

              <label>
                <input
                  v-model="form.preferences"
                  type="checkbox"
                  value="Friendly"
                >
                Friendly
              </label>

              <label>
                <input
                  v-model="form.preferences"
                  type="checkbox"
                  value="Calm"
                >
                Calm
              </label>

              <label>
                <input
                  v-model="form.preferences"
                  type="checkbox"
                  value="Active"
                >
                Active
              </label>

            </div>

            <p
              v-if="errors.preferences"
              class="validation-message"
            >
              {{ errors.preferences }}
            </p>

          </div>

        </fieldset>


        <!-- Submit Button -->
        <div class="form-actions">

          <button type="submit">
            Submit Enquiry
          </button>

        </div>


        <!-- Success Message -->
        <p
          v-if="successMessage"
          class="success-message"
        >
          {{ successMessage }}
        </p>

      </form>

    </div>
  </section>
</template>