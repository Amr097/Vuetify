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

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppIntro from './components/AppIntro.vue'
import AppMain from './components/AppMain.vue'
import Auth from './components/Auth.vue'
import AppPlayer from './components/AppPlayer.vue'
</script>

<style lang="scss" scoped></style>
