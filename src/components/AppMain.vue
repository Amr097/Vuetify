<template>
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <HomeSongItem v-for="song in allSongs" :key="song.docID" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import HomeSongItem from '../sub-components/HomeSongItem.vue'
import { songsCollection } from '../services/firebase'
import { getDocs } from 'firebase/firestore'

export default {
  name: 'AppMain',
  data() {
    return {
      allSongs: []
    }
  },
  setup() {
    return {}
  },
  components: { HomeSongItem },
  async created() {
    const allSongsRef = await getDocs(songsCollection)
    allSongsRef.forEach((document) => {
      this.allSongs.push({ ...document.data(), docID: document.id })
    })

    console.log(this.allSongs)
  }
}
</script>

<style lang="scss" scoped></style>
