<script setup lang="ts">
import { ref, watch } from 'vue'

let props = defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue'])

let input = ref<any>(false)

function handleFile(e: any) {
  emit('update:modelValue', e.target.files[0])
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      input.value = null
    }
  }
)
</script>

<template>
  <button class="rounded-md p-2 text-[#0d0a18] text-sm bg-white" @click="input?.click()">
    Upload
  </button>
  <input class="hidden" type="file" @change="handleFile" ref="input" accept="image/*" />
</template>

<style></style>
