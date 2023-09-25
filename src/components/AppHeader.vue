<template>
  <header id="header">
    <nav class="container w-full flex justify-start items-center py-5 px-4">
      <router-link class="strip_tri" to="/"></router-link>

      <router-link
        :to="{ name: 'home' }"
        class="ml-8 bg-clip-text text-transparent f-logo"
        exact-active-class="no-active"
        >Vuetify</router-link
      >
      <div class="flex flex-grow justify-end items-center">
        <ul class="flex flex-row justify-end mt-1 mr-6 gap-4">
          <li
            class="listen-item transition duration-150 ease-in-out hover:scale-105"
            v-if="!userLoggedIn"
          >
            <a class="px-2 text-white listen-btn f-header" @click.prevent="toggleAuthModal"
              >Listen Now</a
            >
          </li>

          <router-link
            class="px-2 text-black f-header transition duration-150 ease-in-out"
            :to="{ name: 'about' }"
            >About</router-link
          >

          <li v-if="userLoggedIn">
            <router-link
              class="px-2 text-white f-header manage-btn transition duration-150 ease-in-out hover:scale-105"
              to="/manage"
              exact-active-class="no-active"
              >Manage
            </router-link>
            <a class="px-2 text-grey f-header" to="#" @click="signUserOut">Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia'
import { useModalStore } from '../stores/Modal'
import useUserStore from '@/stores/User'
import { RouterLink } from 'vue-router'

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore),
    ...mapWritableState(useUserStore, ['signout', 'userLoggedIn'])
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
    },
    signUserOut() {
      try {
        this.signout()
        if (this.$route.name === 'manage') {
          this.$router.push({ name: 'home' })
        }
      } catch (err) {
        return err
      }
    }
  },
  components: { RouterLink }
}
</script>

<style lang="scss" scoped>
#header {
  font-size: 1.3rem;
  padding: 0.5rem 0;
}

.strip_tri {
  width: 2em;
  height: 0.25em;
  position: relative;
  background-image: var(--secondary-gradient);
  align-self: flex-start;
  border-radius: 5px;
  transform: rotate(-90deg) translate(-50%, 25%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 0.25em;
    background-image: var(--secondary-gradient);
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
  }

  &::before {
    width: 1.4em;
    top: 0.6em;
  }

  &::after {
    width: 0.8em;
    top: 1.2em;
  }
}

.listen {
  &-btn {
    background-image: var(--secondary-gradient-1);
    padding: 0.6em 0.8em;
    border-radius: 7px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-right: 0.4rem;
  }

  &-item {
    &:hover {
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 4px;
    }
  }
}

.manage-btn {
  display: inline-block;
  background-image: var(--secondary-gradient-1);
  padding: 0.4em 0.6em;
  border-radius: 7px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-right: 0.4rem;
}

.f-header {
  font-size: 1.05em;
  font-weight: 600;
}

.f-logo {
  background-image: var(--secondary-gradient);
  font-weight: 700;
  font-size: 1.6em;
}
</style>
