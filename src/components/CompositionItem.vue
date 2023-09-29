<template>
  <div>
    <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
    <button
      class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      @click="deleteSong"
    >
      <i class="fa fa-times"></i>
    </button>
    <button
      class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      @click="formIsOpen = true"
    >
      <i class="fa fa-pencil-alt"></i>
    </button>
  </div>
  <div>
    <vee-form v-show="formIsOpen" @submit="edit" :validation-schema="schema">
      <div
        class="text-white text-center font-bold p-4-mb-4"
        :class="alert_variant"
        v-show="show_alert"
      >
        {{ alert_message }}
      </div>
      <div class="mb-3">
        <label class="inline-block mb-2">{{ song.modified_name }}</label>
        <vee-field
          name="title"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Song Title"
        />
        <ErrorMessage name="title" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label class="inline-block mb-2">{{ song.genre }}</label>
        <vee-field
          name="genre"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Genre"
        />
        <ErrorMessage name="genre" class="text-red-600" />
      </div>
      <button
        type="submit"
        class="py-1.5 px-3 rounded text-white bg-green-600"
        :class="disable_btn"
      >
        Submit
      </button>
      <button
        type="button"
        class="py-1.5 px-3 rounded text-white bg-gray-600"
        :class="disable_btn"
        @click="formIsOpen = false"
      >
        Go Back
      </button>
    </vee-form>
  </div>
</template>

<script>
import { updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'

import { songsCollection, storage } from '../services/firebase'
export default {
  name: 'CompositionItem',
  data() {
    return {
      formIsOpen: false,
      in_submission: false,
      show_alert: '',
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait, updating song info.',
      disable_btn: ''
    }
  },
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    }
  },
  methods: {
    async edit(values) {
      console.log(this.song.docID)
      try {
        this.show_alert = true
        this.disable_btn = 'opacity-50 pointer-events-none'
        const { genre, title } = values
        await updateDoc(doc(songsCollection, this.song.docID), {
          genre,
          modified_name: title
        })

        this.alert_message = 'Updated successfully.'
        this.alert_variant = 'bg-green-500'
        this.disable_btn = ''
        this.updateSong(this.index, values)
      } catch (err) {
        console.log(err)
        this.show_alert = true
        this.alert_variant = 'bg-red-500'
        this.alert_message = 'Failed to update song info.'
        this.disable_btn = ''
        return
      }
    },
    async deleteSong() {
      console.log(this.song.docID)
      try {
        await deleteDoc(doc(songsCollection, this.song.docID))
        const storageRef = ref(storage, 'music-main')
        const musicRef = ref(storageRef, `music/${this.song.original_name}`)
        await deleteObject(musicRef)
        this.removeSong(this.index)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<script setup>
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().required().min(2).max(18),
  genre: yup.string().required().min(2).max(18)
})
</script>

<style lang="scss" scoped></style>
