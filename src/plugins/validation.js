import { Form as VeeForm, Field as VeeField, ErrorMessage, configure } from 'vee-validate'
//import { required } from '@vee-validate/rules'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)
    //defineRule('required', required)

    configure({
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
      validateOnModelUpdate: true
    })
  }
}
