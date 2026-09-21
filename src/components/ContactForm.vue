<script setup>
import { ref, computed, watch } from 'vue'

defineProps({
  formTitle: {
    type: String,
    default: 'Adoption Enquiry'
  }
})

const emit = defineEmits(['submit-form'])

/* Available pets */
const pets = [
  { name: 'Luna', type: 'Cat' },
  { name: 'Mochi', type: 'Cat' },
  { name: 'Oliver', type: 'Cat' },
  { name: 'Max', type: 'Dog' }
]

/* Form data */
const form = ref({
  fullName: '',
  email: '',
  age: null,
  petType: '',
  selectedPet: '',
  additionalPets: [],
  preferences: []
})

const errors = ref({})
const successMessage = ref('')

/* First pet filtering */
const filteredPets = computed(() => {
  if (!form.value.petType) {
    return pets
  }

  return pets.filter(
    pet => pet.type === form.value.petType
  )
})

/* Get all pets already selected */
const selectedPetNames = computed(() => {
  return [
    form.value.selectedPet,
    ...form.value.additionalPets.map(item => item.pet)
  ].filter(Boolean)
})

/* Check if more pets can be added */
const canAddMorePets = computed(() => {
  return selectedPetNames.value.length < pets.length
})

/* Available pets for an additional row */
const getAvailablePets = (currentIndex) => {
  const currentPet =
    form.value.additionalPets[currentIndex]?.pet

  const otherSelectedPets = [
    form.value.selectedPet,
    ...form.value.additionalPets
      .filter((_, index) => index !== currentIndex)
      .map(item => item.pet)
  ].filter(Boolean)

  const selectedType =
    form.value.additionalPets[currentIndex]?.type

  if (!selectedType) {
    return []
  }

  return pets.filter(
    pet =>
      pet.type === selectedType &&
      (
        !otherSelectedPets.includes(pet.name) ||
        pet.name === currentPet
      )
  )
}

/* Clear first pet when first type changes */
watch(
  () => form.value.petType,
  () => {
    form.value.selectedPet = ''
  }
)

/* Add another pet */
const addAnotherPet = () => {
  if (!canAddMorePets.value) {
    return
  }

  form.value.additionalPets.push({
    type: '',
    pet: ''
  })
}

/* Remove an additional pet */
const removeAdditionalPet = (index) => {
  form.value.additionalPets.splice(index, 1)
}

/* Change additional pet type */
const handleAdditionalPetTypeChange = (index) => {
  form.value.additionalPets[index].pet = ''
}

/* Validate form */
const validateForm = () => {
  errors.value = {}

  // Full Name
  if (!form.value.fullName.trim()) {
    errors.value.fullName =
      'Please enter your full name.'
  }

  // Email
  if (!form.value.email.trim()) {
    errors.value.email =
      'Please enter your email address.'
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.value.email
    )
  ) {
    errors.value.email =
      'Please enter a valid email address.'
  }

  // Age
  if (!form.value.age || form.value.age < 18) {
    errors.value.age =
      'Please enter a valid age of 18 or above.'
  }

  // First Pet Type
  if (!form.value.petType) {
    errors.value.petType =
      'Please select a pet type.'
  }

  // First Pet
  if (!form.value.selectedPet) {
    errors.value.selectedPet =
      'Please select a pet.'
  }

  // Preferences
  if (form.value.preferences.length === 0) {
    errors.value.preferences =
      'Please select at least one preference.'
  }

  return Object.keys(errors.value).length === 0
}

/* Reset form */
const resetForm = () => {
  form.value = {
    fullName: '',
    email: '',
    age: null,
    petType: '',
    selectedPet: '',
    additionalPets: [],
    preferences: []
  }

  errors.value = {}
}

/* Submit form */
const handleSubmit = () => {
  if (!validateForm()) {
    successMessage.value = ''
    return
  }

  emit('submit-form', {
    ...form.value,
    additionalPets: form.value.additionalPets.map(
      item => ({ ...item })
    ),
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

      <p class="required-note">
        <span class="required-star">*</span>
        All fields marked with * are required.
      </p>

      <form @submit.prevent="handleSubmit" novalidate>

        <!-- Personal Information -->
        <fieldset>
          <legend>Personal Information</legend>

          <div class="form-group">
            <label for="full-name">
              Full Name
              <span class="required-star">*</span>
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

          <div class="form-group">
            <label for="email">
              Email Address
              <span class="required-star">*</span>
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

          <div class="form-group">
            <label for="age">
              Age
              <span class="required-star">*</span>
            </label>

            <input
              id="age"
              v-model.number="form.age"
              type="number"
              min="18"
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
          <legend>Pet Information</legend>

          <!-- First Pet Type -->
          <div class="form-group">
            <span class="form-label">
              Pet Type
              <span class="required-star">*</span>
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

          <!-- First Pet -->
          <div class="form-group">
            <label for="selected-pet">
              Select a Pet
              <span class="required-star">*</span>
            </label>

            <select
              id="selected-pet"
              v-model="form.selectedPet"
            >
              <option value="">
                Choose a pet
              </option>

              <option
                v-for="pet in filteredPets"
                :key="pet.name"
                :value="pet.name"
              >
                {{ pet.name }}
              </option>
            </select>

            <p
              v-if="errors.selectedPet"
              class="validation-message"
            >
              {{ errors.selectedPet }}
            </p>
          </div>

          <!-- Initial Add Button -->
          <div
            v-if="
              form.selectedPet &&
              form.additionalPets.length === 0 &&
              canAddMorePets
            "
            class="add-pet-section"
          >
            <button
              type="button"
              class="add-pet-btn"
              @click="addAnotherPet"
            >
              + Add Another Pet
            </button>
          </div>

          <!-- Additional Pets -->
          <div
            v-for="(additionalPet, index) in form.additionalPets"
            :key="index"
            class="additional-pet-section"
          >
            <h3>
              Additional Pet {{ index + 1 }}
              <span class="optional-label">
                (Optional)
              </span>
            </h3>

            <!-- Additional Pet Type -->
            <div class="form-group">
              <span class="form-label">
                Pet Type
              </span>

              <div class="radio-group">
                <label>
                  <input
                    v-model="additionalPet.type"
                    type="radio"
                    value="Cat"
                    @change="
                      handleAdditionalPetTypeChange(index)
                    "
                  >
                  Cat
                </label>

                <label>
                  <input
                    v-model="additionalPet.type"
                    type="radio"
                    value="Dog"
                    @change="
                      handleAdditionalPetTypeChange(index)
                    "
                  >
                  Dog
                </label>
              </div>
            </div>

            <!-- Additional Pet Dropdown -->
            <div
              v-if="additionalPet.type"
              class="form-group"
            >
              <label :for="`additional-pet-${index}`">
                Select Pet
              </label>

              <select
                :id="`additional-pet-${index}`"
                v-model="additionalPet.pet"
              >
                <option value="">
                  Choose another pet
                </option>

                <option
                  v-for="pet in getAvailablePets(index)"
                  :key="pet.name"
                  :value="pet.name"
                >
                  {{ pet.name }}
                </option>
              </select>
            </div>

            <!-- Additional Pet Buttons -->
            <div class="additional-pet-actions">

              <button
                type="button"
                class="remove-second-pet-btn"
                @click="removeAdditionalPet(index)"
              >
                Remove
              </button>

              <button
                v-if="
                  index === form.additionalPets.length - 1 &&
                  additionalPet.pet &&
                  canAddMorePets
                "
                type="button"
                class="add-pet-btn"
                @click="addAnotherPet"
              >
                + Add More
              </button>

            </div>
          </div>

          <!-- All pets selected message -->
          <p
            v-if="
              form.selectedPet &&
              !canAddMorePets
            "
            class="all-pets-selected"
          >
            All available pets have been selected.
          </p>

          <!-- Preferences -->
          <div class="form-group">
            <span class="form-label">
              Preferences
              <span class="required-star">*</span>
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

        <!-- Submit -->
        <div class="form-actions">
          <button type="submit">
            Submit Enquiry
          </button>
        </div>

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