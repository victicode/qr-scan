<template>
  <div>
    <div class="q-px-xs-md q-px-md-xl text-form__container">
      <div>
        <h5 class="text-secondary text-weight-bold">Crea tu cuenta</h5>
      </div>
      <div class="">
        <q-form
          id="LoginForm"
          class="q-gutter-md"
        >
        <div class="row">
          <div class="col-12 q-mt-md">
            <q-input
              class="register-input"
              outlined
              clearable
              :clear-icon="'eva-close-outline'"
              color="secondary"
              v-model="fullName"
              name="name_user"
              label="Nombre completo"
              autocomplete="off"
              :rules="nameRules"
              ref="fullNameRef"
            />
          </div>
          <div class="col-12 q-mt-md-lg q-mt-sm">
            <q-input
              class="register-input"
              outlined
              clearable
              :clear-icon="'eva-close-outline'"
              color="secondary"
              v-model="email"
              name="id_user"
              label="Correo electrónico"
              autocomplete="off"
              :rules="emailRules"
              ref="emailRef"
              
            />
          </div>
          <div class="col-12 q-mt-md-lg q-mt-sm">
            <q-input
              class="register-input"
              outlined
              clearable
              :clear-icon="'eva-close-outline'"
              color="secondary"
              name="password_user"
              :type="isPwd ? 'password' : 'text'" 
              v-model="password"
              label="Escribe tu contraseña"
              :rules="passwordRules"
              ref="passwordRef"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'eva-eye-off-outline' : 'eva-eye-outline'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mt-none">
            <q-checkbox v-model="remember"  label="Recuérdame" color="secondary" />
          </div>
          <div class="col-12 q-mt-sm">
            <q-checkbox v-model="accept_terms" label="Acepto que he leído los términos y condiciones." color="secondary" />
          </div>
          <div class="col-12 q-mt-sm q-px-md-xl q-pt-md-md" >
            <q-btn 
              id="register-form-button" 
              label="Crear cuenta" 
              unelevated 
              no-caps 
              @click="register" 
              color="secondary" 
              class="full-width" 
              :loading="loading"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </div>
        </q-form>
      </div>
      <div>
        <div class="full-width text-center q-pt-md text-subtitle2">
          ¿Ya tienes una cuenta? <br>
          <RouterLink to="/login"><span class="text-primary text-decoration-underline cursor-pointer ">Inicia sesión aqui</span></RouterLink>✌🏻
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { inject } from 'vue'
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router';

  export default {
    setup () {
      //vue provider
      const icons = inject('ionIcons')
      const $q = useQuasar()
      const store = useAuthStore()
      const router = useRouter()
      
      // data
      const fullName = ref('')
      const email      = ref('')
      const password = ref('')
      const isPwd    = ref('true')
      const loading  = ref(false)
      const accept_terms = ref(false)
      const remember = ref(false)
      //ref
      const fullNameRef = ref(null)
      const emailRef = ref(null)
      const passwordRef = ref(null)

      
      // rules
      const nameRules = [
        val => (val !== null && val !== '') || 'El nombre es requerido.',
        val => (/[$,%"';&|<>()#]/.test(val) == false ) || 'Formato no valido',
      ]
      const emailRules = [
        val => (val !== null && val !== '') || 'El número de cedula es requerido.',
        val => (/[,%"' ();&|<>]/.test(val) == false ) || 'No debe contener "[](),%|&;\'" ',

      ]
      const passwordRules = [
        val => (val !== null && val !== '') || 'La contraseña es requerida',
        val => (val.length >= 8 ) || 'Debe contener 8 caracteres',
        val => (/[,%" '();&|<>]/.test(val) == false ) || 'No debe contener espacios, ni "[](),%|&;\'" ',
      ]
      const termsRules = [
        val => (val !== null && val !== '') || 'Debes aceptar los términos y condiciones',
      ]
      
      // methods
      const register = () =>{
        if(!validateForm()) return
        loadingState(true)
        const data = {
          fullName: fullName.value,
          email: email.value,
          password: password.value,
          remember: remember.value
        }

        store.register(data).then((data)=>{
          if(data.code !== 200 ){
            showNotify('negative', data.error ?? 'Error de servicio')
            loadingState(false);
            return;
          }
          showNotify('positive', 'Registro exitoso, seras redirigido.')
          setTimeout(() => {
            router.push('/dashboard')
            loadingState(false);
          }, 2000);
        }).catch((e) => { 
          showNotify('negative', 'Error de servicio')
        })
      }
      const showNotify = (type, message) => {
        $q.notify({
          message: message,
          color: type,
          actions: [
            { icon: 'eva-close-outline', color: 'white', round: true, handler: () => { /* ... */ } }
          ]
        })
      }
      const loadingState = (state) => {
        loading.value = state;
      }
      const validateForm = () => {
        fullNameRef.value.validate()
        emailRef.value.validate()
        passwordRef.value.validate()

        if (
          fullNameRef.value.hasError 
          || emailRef.value.hasError 
          || passwordRef.value.hasError
        ) return false

        if(!accept_terms.value) {
          showNotify('negative', 'Debes aceptar los términos y condiciones')
          return false
        }

        return true
      }
      
      return {
        icons,
        email,
        password,
        fullName,
        isPwd,
        nameRules,
        emailRules,
        passwordRules,
        termsRules,
        fullNameRef,
        emailRef,
        passwordRef,
        loading,
        accept_terms,
        remember,
        register,
      }
    }
  };
</script>

<style lang="scss" scoped>
.text-form__container{
  padding-top: 2.2rem;
}
#register-form-button{
  border-radius: 8px;
  padding: 15px;
}
</style>
<style lang="scss">
.text-decoration-underline{
  text-decoration: underline;
}
.register-input {
  & .q-field__control{
    border-radius: 10px!important;
    
  }
  & .q-field__label{
    transform: translateY(0%)
  }
  &.q-field--focused .q-field__label, &.q-field--float .q-field__label{
    z-index: 100;
    background: white!important;
    font-weight: 600;
    max-width: 133%;
    padding: 0px 10px;
    transform: translateY(-130%) translateX(4%) scale(0.75)!important;
  }
  
  & .q-field__native{
    padding-top: 15px!important;
    font-weight: 600;
  }
  & .q-field__append{
    transform: translateY(2%)
  }
  & .q-field--error {
    transform: translateY(15px);
  }
}
@media screen and (max-width: 780px){
  .register-input {
    & .q-field__bottom{
      transform: translateY(15px);
    }
  }
}

</style>