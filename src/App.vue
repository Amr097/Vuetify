<template>
  <AppHeader />
  <Auth />
  <router-view />
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import Auth from './components/Auth.vue'
export default {
  name: 'App',
  components: {
    AppHeader,
    Auth
  }
}
</script>

<style lang="scss" scoped></style>
