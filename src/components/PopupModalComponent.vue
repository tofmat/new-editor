<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import PopupComponent from './PopupComponent.vue'
import type { PopupDataType, SingleElementType } from '@/data/types'

const props = defineProps({
  showPopup: Boolean
})

const emit = defineEmits(['close-popup'])

const popup = reactive<PopupDataType>({
  mainPopup: {
    background: '#df795e'
  },
  button: {
    background: '#414142',
    color: '#ffffff'
  },
  text: {
    color: '#ffffff'
  }
})

const elements = reactive<SingleElementType[]>([])

const closePopup = () => {
  emit('close-popup') // Emit an event to change the closePopup prop in the parent component
}

onMounted(() => {
  setPopupData()
  setPopupElements()
})

function setPopupData() {
  let savedPopup = localStorage.getItem('popupData')
  if (!savedPopup) {
    return Object.assign(popup, popup)
  }
  try {
    Object.assign(popup, JSON.parse(savedPopup))
    console.log(popup)
  } catch (error) {
    console.log(error)
  }
}

function setPopupElements() {
  let savedElements = localStorage.getItem('popupElements')
  elements.length = 0
  if (!savedElements) {
    return elements.push(...getDefaultElements())
  }
  try {
    elements.push(...JSON.parse(savedElements))
  } catch (error) {
    console.log(error)
  }
}

function getDefaultElements() {
  return [
    {
      id: uniqueId(),
      type: 'image',
      src: '/stars.png',
      alt: 'stars',
      position: {
        position: 'relative',
        top: '0px',
        left: '0px'
      }
    },
    {
      id: uniqueId(),
      type: 'heading',
      content: 'All the text and elements in this popup should be editable and draggable',
      position: {
        position: 'relative',
        top: '0px',
        left: '0px'
      }
    },
    {
      id: uniqueId(),
      type: 'input',
      inputType: 'email',
      placeholder: 'E-mail',
      position: {
        position: 'relative',
        top: '0px',
        left: '0px'
      }
    },
    {
      id: uniqueId(),
      type: 'button',
      content: 'Signup Now',
      position: {
        position: 'relative',
        top: '0px',
        left: '0px'
      }
    },
    {
      id: uniqueId(),
      type: 'description',
      content: 'No credit card required. No surprises',
      position: {
        position: 'relative',
        top: '0px',
        left: '0px'
      }
    }
  ]
}

function uniqueId() {
  return Math.random().toString(36).slice(2)
}
</script>

<template>
  <Transition>
    <div
      v-if="props.showPopup"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <PopupComponent
          :closePopup="closePopup"
          :popup="popup"
          :elements="elements"
          :showPopup="showPopup"
        />
      </div>
    </div>
  </Transition>
  <div v-if="props.showPopup" class="fixed inset-0 z-40 bg-black opacity-80"></div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
