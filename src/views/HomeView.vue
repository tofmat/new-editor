<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import PopupModalComponent from '../components/PopupModalComponent.vue'
const showPopup = ref(false)
const togglePopup = () => {
  showPopup.value = !showPopup.value
}
</script>
<template>
  <div class="mainBackground">
    <div
      class="h-screen flex flex-col text-white items-center w-full sm:w-10/12 md:w-7/12 mx-auto p-4 justify-center"
    >
      <h2 class="md:text-6xl text-4xl text-center py-4">A VueJS Popup Editor</h2>
      <p class="text-center text-sm md:text-lg">
        This is a popup editor built with Vuejs, Using the buttons below you can preview what your
        popup looks like, and also you get to edit it. You have access to change the colors of text,
        button backgrounds, and also the popup background itself. You also have access to add other
        elements like image, text and buttons. Try it out!
      </p>
      <div class="flex flex-col sm:flex-row items-center gap-4 justify-center mt-6 md:mt-10">
        <button
          class="bg-pink-600 text-white font-bold uppercase text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
          @click="togglePopup"
        >
          Preview Popup
        </button>
        <RouterLink to="/edit">
          <button
            class="bg-white text-pink-600 font-bold uppercase text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            type="button"
          >
            Edit Popup
          </button>
        </RouterLink>
      </div>
    </div>
    <PopupModalComponent :showPopup="showPopup" @close-popup="togglePopup()" />
  </div>
</template>

<style scoped>
.mainBackground {
  background: url('/world.png');
  background-color: #0d0a18;
  background-size: cover;
}
</style>
