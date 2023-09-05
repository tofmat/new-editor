<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import PopupComponent from '../components/PopupComponent.vue'
import ToastComponent from '../components/ToastComponent.vue'
import FileUploadComponent from '../components/FileUploadComponent.vue'
import type { PopupDataType, SingleElementType } from '@/data/types'
const imageModal = ref(false)
const openMenu = ref<string | boolean | null>(null)
const saveSuceess = ref(false)
const image = ref<any>(null)
const elements = reactive<SingleElementType[]>([])
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

onMounted(() => {
  setPopupData()
  setPopupElements()
  initDraggable()
})

function openActionMenu(id: string) {
  console.log(id)
  openMenu.value = id
}

function setPopupData() {
  let savedPopup = localStorage.getItem('popupData')
  if (!savedPopup) {
    return Object.assign(popup, popup)
  }
  try {
    Object.assign(popup, JSON.parse(savedPopup))
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

function savePopup() {
  try {
    localStorage.setItem('popupData', JSON.stringify(popup))
    localStorage.setItem('popupElements', JSON.stringify(elements))
    saveSuceess.value = true
  } catch (error) {
    console.log(error)
  }
}

function addHeading() {
  let element = {
    id: uniqueId(),
    type: 'heading',
    content: 'Heading',
    position: {
      position: 'absolute',
      top: '100px',
      left: '0px'
    }
  }
  elements.push(element)
  initDraggable()
}

function addDescription() {
  let element = {
    id: uniqueId(),
    type: 'description',
    content: 'Description',
    position: {
      position: 'absolute',
      top: '100px',
      left: '0px'
    }
  }
  elements.push(element)
  initDraggable()
}

function addButton() {
  let element = {
    id: uniqueId(),
    type: 'button',
    content: 'Signup Now',
    position: {
      position: 'absolute',
      top: '100px',
      left: '0px'
    }
  }

  elements.push(element)

  initDraggable()
}

async function addImage() {
  let convertedFile = await toBase64()
  if (!convertedFile) return
  elements.push({
    id: uniqueId(),
    type: 'image',
    src: convertedFile,
    alt: 'stars',
    position: {
      position: 'absolute',
      top: '100px',
      left: '0px'
    }
  })

  initDraggable()
  imageModal.value = false
}

function toBase64() {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // Set up event handlers for the FileReader
    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    // Read the file as Data URL
    reader.readAsDataURL(image.value)
  })
}

function removeElement(item: SingleElementType) {
  let index = elements.findIndex((element) => element.id == item.id)

  if (index == -1) return

  elements.splice(index, 1)
}

function uniqueId() {
  return Math.random().toString(36).slice(2)
}

// using jquery for the draggable event
function initDraggable() {
  console.log('dragging')
  nextTick(() => {
    $('.draggable').draggable({
      addClasses: false,
      containment: '.editor',
      handle: '.handle',
      stop(event: any, ui: any) {
        let element = elements.find((element) => element.id == event.target.id)
        if (element) {
          element.position.top = ui.position.top + 'px'
          element.position.left = ui.position.left + 'px'
        }
      }
    })
  })
}

function updateContent(e: any, element: SingleElementType) {
  element.content = e.target.textContent
}

watch(
  () => image.value,
  (newVal) => {
    if (newVal) {
      addImage()
    }
  }
)

const editorOptions = reactive({
  mainPopup: {
    display: false
  },
  buttonsElements: {
    display: false
  },
  textElements: {
    display: false
  },
  allElements: {
    display: false
  }
})

const showPopup = ref(false)
const togglePopup = () => {
  showPopup.value = !showPopup.value
}
</script>

<template>
  <div className="flex flex-col sm:flex-row w-screen overflow-hidden ">
    <aside
      class="w-full sm:w-80 h-auto sm:h-screen shrink-0 md:flex bg-[#110d22] text-white p-3 tracking-wide flex-col"
    >
      <div class="relative">
        <RouterLink to="/">
          <p class="font-semibold text-center my-6 uppercase">Popup Editor</p>
        </RouterLink>

        <hr />

        <div class="my-3">
          <div
            class="flex items-center justify-between cursor-pointer bg-gray-700 px-3 rounded-lg"
            @click="editorOptions.mainPopup.display = !editorOptions.mainPopup.display"
          >
            <p>Popup Styles</p>
            <Icon
              :icon="
                editorOptions.mainPopup.display ? `mdi:arrow-drop-down` : `ic:round-arrow-right`
              "
              width="40"
              height="40"
            />
          </div>

          <div v-if="editorOptions.mainPopup.display">
            <div class="my-2 flex gap-2 items-center">
              <p>Background Color:</p>
              <label>
                <input
                  v-model="popup.mainPopup.background"
                  id="bgColor"
                  className="hidden"
                  type="color"
                  min="10"
                />
                <div
                  class="w-5 h-5 border border-white rounded-sm cursor-pointer"
                  :style="{
                    backgroundColor: popup.mainPopup.background
                  }"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div class="my-3">
          <div
            class="flex items-center justify-between cursor-pointer bg-gray-700 px-3 rounded-lg"
            @click="editorOptions.buttonsElements.display = !editorOptions.buttonsElements.display"
          >
            <p>Button Styles</p>
            <Icon
              :icon="
                editorOptions.buttonsElements.display
                  ? `mdi:arrow-drop-down`
                  : `ic:round-arrow-right`
              "
              width="40"
              height="40"
            />
          </div>

          <div v-if="editorOptions.buttonsElements.display">
            <div class="my-2 flex gap-2 items-center">
              <p>Background Color:</p>
              <label>
                <input
                  v-model="popup.button.background"
                  id="bgColor"
                  className="hidden"
                  type="color"
                  min="10"
                />
                <div
                  class="w-5 h-5 border border-white rounded-sm cursor-pointer"
                  :style="{
                    backgroundColor: popup.button.background
                  }"
                ></div>
              </label>
            </div>
            <div class="my-2 flex gap-2 items-center">
              <p>Color:</p>
              <label>
                <input
                  v-model="popup.button.color"
                  id="bgColor"
                  className="hidden"
                  type="color"
                  min="10"
                />
                <div
                  class="w-5 h-5 rounded-sm border border-white cursor-pointer"
                  :style="{
                    backgroundColor: popup.button.color
                  }"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div class="my-3">
          <div
            class="flex items-center justify-between cursor-pointer bg-gray-700 px-3 rounded-lg"
            @click="editorOptions.textElements.display = !editorOptions.textElements.display"
          >
            <p>Text Styles</p>
            <Icon
              :icon="
                editorOptions.textElements.display ? `mdi:arrow-drop-down` : `ic:round-arrow-right`
              "
              width="40"
              height="40"
            />
          </div>

          <div v-if="editorOptions.textElements.display">
            <div class="my-2 flex gap-2 items-center">
              <p>Color:</p>
              <label>
                <input
                  v-model="popup.text.color"
                  id="bgColor"
                  className="hidden"
                  type="color"
                  min="10"
                />
                <div
                  class="w-5 h-5 border border-white rounded-sm cursor-pointer"
                  :style="{
                    backgroundColor: popup.text.color
                  }"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div class="my-3">
          <div
            class="flex items-center justify-between cursor-pointer bg-gray-700 px-3 rounded-lg"
            @click="editorOptions.allElements.display = !editorOptions.allElements.display"
          >
            <p>Add Elements</p>
            <Icon
              :icon="
                editorOptions.allElements.display ? `mdi:arrow-drop-down` : `ic:round-arrow-right`
              "
              width="40"
              height="40"
            />
          </div>

          <div v-if="editorOptions.allElements.display">
            <div class="my-2 flex gap-2 items-center">
              <p>Add text:</p>
              <button @click="addHeading" class="rounded-md p-2 text-[#0d0a18] bg-white">
                <p class="text-sm">Heading</p>
              </button>
              <button @click="addDescription" class="rounded-md p-2 text-[#0d0a18] bg-white">
                <p class="text-sm">Description</p>
              </button>
            </div>
            <div class="my-2 flex gap-2 items-center">
              <p>Add Button:</p>
              <button @click="addButton" class="rounded-md p-2 text-[#0d0a18] bg-white">
                <p class="text-sm">Button</p>
              </button>
            </div>
            <div class="my-2 flex gap-2 items-center">
              <p>Add Image:</p>
              <FileUploadComponent v-model="image" />
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div className="w-full max-h-screen overflow-x-hidden overflow-y-scroll grow">
      <div class="bg-white p-4 flex drop-shadow-md justify-between items-center">
        <p class="text-lg hidden sm:block uppercase">Editing Canvas</p>
        <div class="flex flex-row items-center gap-4 justify-center">
          <button
            class="bg-pink-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            type="button"
            @click="togglePopup"
          >
            Preview
          </button>

          <button
            class="bg-white text-pink-700 border border-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            type="button"
            @click="savePopup"
          >
            Save
          </button>
        </div>
      </div>
      <div
        @click="openMenu = false"
        class="editor grid place-items-center p-4 min-h-[calc(100vh-150px)]"
      >
        <PopupComponent
          :popup="popup"
          :closePopup="togglePopup"
          :elements="elements"
          :openMenu="openMenu"
          @open-action-menu="openActionMenu"
          @update-content="updateContent"
          @remove-element="removeElement"
        />
      </div>
    </div>
  </div>
  <div>
    <Transition>
      <div
        v-if="showPopup"
        class="overflow-x-hidden transition-all duration-300 ease-in-out overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      >
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <!--content-->
          <PopupComponent
            :closePopup="togglePopup"
            :popup="popup"
            :elements="elements"
            :showPopup="showPopup"
          />
        </div>
      </div>
    </Transition>
    <div v-if="showPopup" class="opacity-80 fixed inset-0 z-40 bg-black"></div>
  </div>

  <ToastComponent
    v-if="saveSuceess"
    @close="saveSuceess = false"
    type="success"
    title="Popup saved succesfully!"
  ></ToastComponent>
</template>

<style></style>
