<template>
  <vee-form
    @submit="register"
    v-show="isRegister"
    :validation-schema="schema"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="Name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage name="Name" class="text-red-600" />
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="Age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage name="Age" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="Password" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <ul class="text-red-600" v-for="error in errors" :key="error">
          <li>{{ error }}</li>
        </ul>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="ConfirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage name="ConfirmPassword" class="text-red-600" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="Country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Egypt">Egypt</option>
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage name="Country" class="text-red-600" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="AcceptTerms"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        value="1"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage name="AcceptTerms" class="text-red-600 block" />
    </div>
    <button
      type="submit"
      class="block w-full bg-primary-1 text-white py-1.5 px-3 mt-6 rounded transition"
      :class="{ 'opacity-75': isLoadingReg }"
      :disabled="isLoadingReg"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { auth, userRef } from '@/services/firebase'
import { addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'RegisterForm',
  props: ['isRegister', 'isLoadingReg', 'updateRegState', 'showMessageReg', 'setMessageVariant'],
  data() {
    return {
      userData: {
        Country: 'Egypt'
      }
    }
  },
  methods: {
    async register(values) {
      let userCred = null

      const { Email: email, Password: password, Name: name, Age: age, Country: country } = values
      this.updateRegState(true)
      this.showMessageReg(true)

      try {
        userCred = await createUserWithEmailAndPassword(auth, email, password)
        try {
          await addDoc(userRef, { email, name, age, country })
        } catch (err) {
          this.updateRegState(false)
          this.setMessageVariant({ variant: 'bg-red-500' })
          this.showMessageReg({
            show: true,
            message: 'An unexpected error occured. Please try again later.'
          })
        }

        this.updateRegState(false)
        this.setMessageVariant({ variant: 'bg-blue-500' })
        this.showMessageReg({ show: true, message: 'Success! Your account has been created.' })
      } catch (err) {
        this.updateRegState(false)
        this.setMessageVariant({ variant: 'bg-red-500' })
        this.showMessageReg({
          show: true,
          message: 'An unexpected error occured. Please try again later.'
        })
        console.log(err)
        return
      }

      console.log(userCred)
    }
  }
}
</script>

<script setup>
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { ref } from 'yup'

YupPassword(yup)
const schema = yup.object({
  Name: yup.string().required().min(2).max(18),
  Email: yup.string().required().email(),
  Age: yup.number('age must be a number.').required().positive().max(99).min(14),
  Password: yup
    .string()
    .matches(/^\S*$/, 'Whitespace is not allowed')
    .min(8, 'password must contain 8 or more characters')
    .minLowercase(1, 'password must contain at least 1 lower case letter')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minNumbers(1, 'password must contain at least 1 number')
    .minSymbols(1, 'password must contain at least 1 special character')
    .required('password is required'),
  ConfirmPassword: yup
    .string()
    .required('Please re-type your password')
    .oneOf([ref('Password')], 'Passwords does not match'),
  Country: yup
    .string()
    .test('is-not-antarctica', 'Antarctica is not a valid country', (value) => {
      return value.toLowerCase() !== 'antarctica'
    })
    .required(),
  AcceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required()
})
</script>

<style lang="scss" scoped></style>
