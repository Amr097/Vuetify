<template>
  <vee-form v-show="isLogin" @submit="login" :validation-schema="schema">
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
export default {
  name: 'LoginForm',
  props: ['isLogin', 'isLoadingLogin', 'updateLoginState', 'messageLogin', 'showMessageLogin'],
  methods: {
    login(values) {
      console.log(values)
      console.log('values')
      this.updateLoginState(true)
      this.showMessageLogin(true)
      setTimeout(() => {
        this.updateLoginState(false)
        this.showMessageLogin(false)
      }, 1000)
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
