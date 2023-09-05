<script setup lang="ts">
import type { SingleElementType, PopupDataType } from '@/data/types'
import { Icon } from '@iconify/vue'
const props = defineProps<{
  closePopup: () => void
  popup: PopupDataType
  elements: SingleElementType[]
  openMenu?: string | boolean | null
  showPopup?: boolean
}>()
const emit = defineEmits(['open-action-menu', 'remove-element', 'update-content'])

const emitOpenActionMenu = (id: string) => {
  emit('open-action-menu', id) // Emit an event
}
const emitUpdateContent = (event: Event, element: SingleElementType) => {
  emit('update-content', event, element) // Emit an event
}
const emitRemoveElement = (element: SingleElementType) => {
  emit('remove-element', element) // Emit an event
}
</script>

<template>
  <div
    :style="{
      backgroundColor: props.popup.mainPopup.background
    }"
    class="border-0 shadow-lg flex-col outline-none focus:outline-none grid relative place-items-center w-[315px] h-[315px] sm:w-[515px] sm:h-[515px] md:w-[615px] md:h-[615px] rounded-full"
  >
    <div
      class="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] relative rounded-full border-2 border-white"
    >
      <div
        class="flex flex-col h-full justify-center w-9/12 mx-auto relative p-2 py-3 items-center"
      >
        <div
          v-for="element in elements"
          :key="element.id"
          :id="element.id"
          :style="{
            position: element.position.position,
            top: element.position.top,
            left: element.position.left
          }"
          @click.stop="emitOpenActionMenu(element.id)"
          :class="
            element.id == openMenu ? 'border-secondary bg-secondary/10' : 'border-transparent '
          "
          class="w-full flex justify-center draggable border-2 border-dashed rounded-sm"
        >
          <img
            v-if="element.type == 'image'"
            :src="element.src"
            :alt="element.alt"
            @mousedown.stop
            class="w-[80px] sm:w-[100px] md:w-auto h-auto"
          />
          <h3
            :style="{
              color: props.popup.text.color
            }"
            v-if="element.type == 'heading'"
            @input="emitUpdateContent($event, element)"
            @mousedown.stop
            :contenteditable="showPopup ? `false` : `true`"
            class="mt-4 sm:mt-8 text-center text-white text-[12px] sm:text-[20px] md:text-[26px] font-semibold"
          >
            {{ element.content }}
          </h3>
          <input
            v-if="element.type == 'input'"
            @mousedown.stop
            class="w-full mt-2 sm:mt-4 md:mt-6 px-3 py-2 sm:py-3 rounded-[16px] placeholder:text-lg focus:outline-none"
            type="email"
            placeholder="E-mail"
          />
          <button
            v-if="element.type == 'button'"
            @input="emitUpdateContent($event, element)"
            :contenteditable="showPopup ? `false` : `true`"
            @mousedown.stop
            :style="{
              backgroundColor: props.popup.button.background,
              color: props.popup.button.color
            }"
            class="w-full mt-2 sm:mt-4 md:mt-6 px-3 py-2 sm:py-3 text-white uppercase rounded-[16px] text-sm sm:text-lg font-extrabold focus:outline-none"
          >
            {{ element.content }}
          </button>
          <p
            :style="{
              color: props.popup.text.color
            }"
            v-if="element.type == 'description'"
            @input="emitUpdateContent($event, element)"
            @mousedown.stop
            :contenteditable="showPopup ? `false` : `true`"
            class="mt-2 md:mt-5 sm:w-full px-6 text-xs md:text-base sm:text-base text-center text-white"
          >
            {{ element.content }}
          </p>
          <span
            v-if="element.id == openMenu"
            class="handle absolute -bottom-10 right-8 z-10 p-2 text-secondary bg-gray-100 rounded-full cursor-move"
          >
            <Icon icon="iconamoon:move" />
          </span>
          <span
            v-if="element.id == openMenu"
            class="handle absolute -bottom-10 -right-2 z-10 p-2 text-red-500 bg-gray-100 rounded-full cursor-pointer"
            @click="emitRemoveElement(element)"
          >
            <Icon icon="ph:trash-bold" />
          </span>
        </div>

        <p
          v-if="showPopup"
          @click="closePopup()"
          class="mt-2 md:mt-4 text-center text-[10px] md:text-base text-white cursor-pointer"
        >
          Cancel
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
[contenteditable] {
  outline: 0px solid transparent;
}
</style>
