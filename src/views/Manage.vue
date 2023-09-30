<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <Upload ref="upload" :addSong="addSong" />
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <div
              class="border border-gray-200 p-3 mb-4 rounded"
              v-for="(song, i) in user_songs"
              :key="song.docID"
            >
              <CompositionItem
                :song="song"
                :index="i"
                :updateSong="updateSong"
                :removeSong="removeSong"
                :updateUnsavedFlag="updateUnsavedFlag"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button">
        <i class="fa fa-play text-gray-500 text-xl"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>
</template>

<script>
import useUserStore from '@/stores/User'
import { auth, songsCollection } from '../services/firebase'
import { mapWritableState } from 'pinia'
import Upload from '../components/Upload.vue'
import { getDocs, query, where } from 'firebase/firestore'
import CompositionItem from '../components/CompositionItem.vue'

export default {
  name: 'manage',
  data() {
    return {
      user_songs: [],
      unsavedFlag: false
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  methods: {
    async fetchSongs() {
      const songsQueryById = query(songsCollection, where('uid', '==', auth.currentUser.uid))
      const snapshot = await getDocs(songsQueryById)

      snapshot.forEach(this.addSong)
    },
    updateSong(i, values) {
      this.user_songs[i].genre = values.genre
      this.user_songs[i].modified_name = values.title
    },
    removeSong(index) {
      this.user_songs.splice(index, 1)
    },
    addSong(document) {
      const song = { ...document.data(), docID: document.id }
      this.user_songs.push(song)
    },
    updateUnsavedFlag(state) {
      this.unsavedFlag = state
    }
  },
  async created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
    await this.fetchSongs()
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next()
      // eslint-disable-next-line no-unused-vars
    } else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
  },

  components: { Upload, CompositionItem }
}
</script>

<style lang="scss" scoped></style>
