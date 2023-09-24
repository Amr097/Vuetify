<template>
  <AppHeader />
  <!-- Introduction -->
  <AppIntro />
  <!-- Main Content -->
  <AppMain />
  <!-- Player -->
  <AppPlayer />
  <!-- Auth Modal -->
  <Auth />
</template>

<script>
import useUserStore from '@/stores/User'
import { auth } from './services/firebase'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppIntro,
    AppMain,
    Auth,
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
import AppHeader from './components/AppHeader.vue'
import AppIntro from './components/AppIntro.vue'
import AppMain from './components/AppMain.vue'
import Auth from './components/Auth.vue'
import AppPlayer from './components/AppPlayer.vue'
import { mapWritableState } from 'pinia'
</script>

<style lang="scss" scoped></style>
