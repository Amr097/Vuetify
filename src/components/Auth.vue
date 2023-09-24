<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    id="modal"
    v-show="hideClass"
    @click="closeModal($event)"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 form-container"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="sm:inline-block sm:align-middle sm:h-screen" v-show="hideClass">&#8203;</span>

      <div
        class="f-form inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        id="modal-form"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Join us & surf them sound waves.</p>
            <!-- Modal Close Button -->
            <div class="cursor-pointer z-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 modal-close"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="setLogin"
                :class="{ 'hover:text-white text-white bg-primary-2 ': isLogin }"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="setRegister"
                :class="{ 'hover:text-white text-white bg-primary-2 ': isRegister }"
                >Register</a
              >
            </li>
          </ul>

          <!-- Login Form -->

          <LoginForm
            :isLogin="isLogin"
            :updateLoginState="updateLoginState"
            :isLoadingLogin="isLoadingLogin"
          />
          <!-- Registration Form -->

          <RegisterForm
            :isRegister="isRegister"
            :updateRegState="updateRegState"
            :isLoadingReg="isLoadingReg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import { useModalStore } from '../stores/Modal'
import LoginForm from '../sub-components/LoginForm.vue'
import RegisterForm from '../sub-components/RegisterForm.vue'
import { ref } from 'vue'
export default {
  name: 'Auth',
  data() {
    return { isLogin: true, isRegister: false }
  },
  computed: {
    ...mapState(useModalStore, ['hideClass']),
    ...mapWritableState(useModalStore, ['isOpen'])
  },
  methods: {
    closeModal(event) {
      const formSelector = document.querySelector('#modal-form')
      const closeModalSelector = document.querySelector('.modal-close')
      if (
        event.target === closeModalSelector ||
        (event.target !== formSelector && !formSelector.contains(event.target))
      ) {
        this.isOpen = false
      }
    },
    setLogin() {
      this.isLogin = true
      this.isRegister = false
    },
    setRegister() {
      this.isRegister = true
      this.isLogin = false
    }
  },
  components: { LoginForm, RegisterForm },
  setup() {
    let isLoadingReg = ref(false)
    let isLoadingLogin = ref(false)

    const updateRegState = (state) => {
      isLoadingReg.value = state
    }

    const updateLoginState = (state) => {
      isLoadingLogin.value = state
    }

    return {
      isLoadingReg,
      isLoadingLogin,
      updateRegState,
      updateLoginState
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  height: 100%;
}
.f-form {
  font-size: 1.5rem;
  padding: 0.5rem;
}
</style>
