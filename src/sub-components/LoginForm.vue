<template>
  <vee-form v-show="isLogin" @submit="login" :validation-schema="schema">
    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      v-if="messageLogin.show"
      :class="messageLogin.variant"
    >
      {{ messageLogin.message }}
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="Email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="Email" class="text-red-600" />
    </div>

    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="Password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage name="Password" class="text-red-600" />
    </div>
    <button
      type="submit"
      class="block w-full bg-primary-1 text-white py-1.5 px-3 mt-6 rounded transition"
      :class="{ 'opacity-75': isLoadingLogin }"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia'
import useUserStore from '@/stores/User'

export default {
  name: 'LoginForm',
  data() {
    return {
      messageLogin: {
        show: false,
        message: '',
        variant: ''
      }
    }
  },
  props: ['isLogin', 'isLoadingLogin', 'updateLoginState'],
  computed: { ...mapWritableState(useUserStore, ['userLoggedIn']) },
  methods: {
    ...mapActions(useUserStore, { loginUser: 'login' }),
    async login(values) {
      try {
        this.updateLoginState(true)
        //firestore create user action
        await this.loginUser(values)
        //////////////////////////////
        this.updateLoginState(false)
        this.messageLogin.show = true
        this.messageLogin.message = 'Successfully logged in.'
        this.messageLogin.variant = 'bg-blue-500'
      } catch (err) {
        this.updateLoginState(false)
        this.messageLogin.show = true
        this.messageLogin.message = err.message
        this.messageLogin.variant = 'bg-red-500'
        return
      }
    }
  }
}
</script>

<script setup>
import * as yup from 'yup'

const schema = yup.object({
  Email: yup.string().required().email(),
  Password: yup.string().required()
})
</script>

<style lang="scss" scoped></style>
