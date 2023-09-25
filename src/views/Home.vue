<template>
  <!-- Introduction -->
  <AppIntro />
  <!-- Main Content -->
  <AppMain />
  <!-- Player -->
  <AppPlayer />
  <!-- Auth Modal -->
</template>

<script>
import useUserStore from '@/stores/User'
import { auth } from '../services/firebase'

export default {
  name: 'Home',
  components: {
    AppIntro,
    AppMain,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<script setup>
import AppIntro from '../components/AppIntro.vue'
import AppMain from '../components/AppMain.vue'
import AppPlayer from '../components/AppPlayer.vue'
import { mapWritableState } from 'pinia'
</script>

<style lang="scss" scoped></style>
