<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  type: String,
  title: String,
  message: String,
  open: Boolean
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div
      class="absolute right-10 top-10 z-20 rounded-md p-3 flex gap-3 items-center"
      :class="type == 'success' ? 'bg-green-100' : 'bg-red-100'"
    >
      <Icon
        icon="bx:badge-check"
        width="30px"
        height="30px"
        v-if="type == 'success'"
        class="flex-shrink-0 text-green-600"
      />

      <Icon
        icon="heroicons-outline:exclamation"
        v-if="type === 'error'"
        class="flex-shrink-0 text-red-600"
      />

      <div class="text-green-700" :class="type == 'success' ? 'text-green-700' : 'text-red-700'">
        <div class="font-bold text-xl">{{ title }}</div>
        <div v-if="message">
          {{ message }}
        </div>
      </div>
      <button @click="$emit('close')">
        <Icon
          icon="material-symbols:close"
          width="30px"
          height="30px"
          :class="type == 'success' ? 'text-green-600' : 'text-red-600'"
        />
      </button>
    </div>
  </Teleport>
</template>

<style></style>
