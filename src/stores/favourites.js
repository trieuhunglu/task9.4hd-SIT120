import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    items: []
  }),

  getters: {
    totalCount: (state) => state.items.length,

    formattedSummary: (state) => {
      if (state.items.length === 0) {
        return 'No favourite pets selected.'
      }

      return state.items
        .map(item => item.name)
        .join(', ')
    }
  },

  actions: {
    addItem(item) {
      const alreadyExists = this.items.some(
        savedItem => savedItem.id === item.id
      )

      if (!alreadyExists) {
        this.items.push(item)
      }
    },

    removeItem(itemId) {
      this.items = this.items.filter(
        item => item.id !== itemId
      )
    },

    resetStore() {
      this.items = []
    }
  }
})