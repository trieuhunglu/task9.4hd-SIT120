import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PetsView from '../views/PetsView.vue'
import PetCareView from '../views/PetCareView.vue'
import FavouritesView from '../views/FavouritesView.vue'
import ContactForm from '../components/ContactForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pets',
    name: 'pets',
    component: PetsView
  },
  {
    path: '/care',
    name: 'care',
    component: PetCareView
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: FavouritesView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactForm
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router