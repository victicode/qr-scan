<template>
  <div>
    <div class="q-px-xs-md q-px-md-xl text-form__container">
      <div>
        <h5 class="text-secondary text-weight-bold">Inicia sesión</h5>
      </div>
      <div class="">
        <q-form
          id="LoginForm"
          class="q-gutter-md"
        >
        <div class="row ">
          <div class="col-12 q-mt-md">
            <q-input
              class="login-input"
              outlined
              clearable
              :clear-icon="'eva-close-outline'"
              color="secondary"
              v-model="email"
              name="id_user"
              label="Correo electrónico"
              :rules="emailRules"
              autocomplete="off"
              ref="emailRef"
            />
          </div>
          <div class="col-12 q-mt-md-lg q-mt-sm">
            <q-input
              class="login-input"
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
          <div class="col-12 ">
            <q-checkbox v-model="remember"  label="Recuérdame" color="secondary" />
          </div>
          <div class="col-12 q-mt-sm q-mb-md q-px-md-xl q-pt-md-sm">
            <q-btn 
              id="login-form-button" 
              label="Inicia sesión" 
              unelevated
              no-caps 
              color="secondary" 
              class="full-width" 
              :loading="loading"
              @click="login" 
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
        <div class="full-width text-center q-mt-md text-subtitle2">
          ¿No tienes cuenta? 
          <RouterLink to="/register"><span class="text-primary text-decoration-underline cursor-pointer ">Registrate aquí</span></RouterLink>🙌🏻
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { ref, inject } from 'vue';
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router';
  import storage from "@/services/storage";

  export default {
    setup () {
      //vue provider
      const icons = inject('ionIcons')
      const $q = useQuasar()
      const store = useAuthStore()
      const router = useRouter()
      
      // data
      const email = ref(storage.getItem('rememberUser') ?? '')
      const password = ref(storage.getItem('rememberPassword') ?? '')
      const isPwd = ref('true')
      const remember = ref(storage.getItem('isRemember') === 'true' ?? false)
      const loading = ref(false)

      //ref
      const emailRef = ref(null)
      const passwordRef = ref(null)
      
      // rules
      const emailRules = [
        val => (val !== null && val !== '') || 'El correo requerido.',
        val => (/[,%"' ();&|<>]/.test(val) == false ) || 'No debe contener "[](),%|&;\'" ',
      ]
      const passwordRules = [
        val => (val !== null && val !== '') || 'La contraseña es requerida',
        val => (val.length >= 8 ) || 'Debe contener 8 caracteres',
        val => (/[,%" '();&|<>]/.test(val) == false ) || 'No debe contener espacios, ni "[](),%|&;\'" ',
      ]
      // methods
      const login = () =>{
        if(!validateForm()) return
        loadingShow(true)
        const data = {
          email: email.value,
          password: password.value,
          remember: remember.value
        }

        store.login(data).then((data)=>{
          if(!data.code){
            showNotify('negative', data.message)
            loadingShow(false);
            return;
          }
          showNotify('positive', 'Inicio de sesión exitoso, seras redigido al dashboard')
          setTimeout(() => {            
    
            data.data.user.rol_id == 1 
            ? router.push('/admin/dashboard')
            : router.push('/dashboard')
            
            loadingShow(false);
          }, 2000);
        }).catch((e) => { 
          console.log(e)
          loadingShow(false);
          showNotify('negative', 'Error en al iniciar sesión')
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
      const loadingShow = (state) => {
        loading.value = state;
      }
      const validateForm = () => {
        emailRef.value.validate()
        passwordRef.value.validate()

        if (
          emailRef.value.hasError 
          || passwordRef.value.hasError
        ) return false

        return true
      }
      return {
        icons,
        email,
        password,
        emailRef,
        passwordRef,
        emailRules,
        passwordRules,
        remember,
        isPwd,
        loading,
        login,
      }
    }
  };
</script>

<style lang="scss" scoped>
.woz-logo {
  font-weight: bold;
}
.text-form__container{
  padding-top: 2.2rem;
}
#login-form-button{
  padding: 15px;
}

</style>
<style lang="scss">
.text-decoration-underline{
  text-decoration: underline;
}
.login-input {
  & .q-field__control{
    border-radius: 10px!important;
    height: 59px
  }
  & .q-field__label{
    transform: translateY(11%)
  }
  &.q-field--focused .q-field__label, &.q-field--float .q-field__label{
    z-index: 100;
    background: white!important;
    font-weight: 600;
    max-width: 133%;
    padding: 0px 10px;
    transform: translateY(-125%) translateX(4%) scale(0.75)!important;
  }
  
  & .q-field__native{
    padding-top: 15px!important;
    font-weight: 600;
  }
  & .q-field__append{
    transform: translateY(5%)
  }
  

}
@media screen and (max-width: 780px){
  .login-input {
    & .q-field__bottom{
      transform: translateY(15px);
    }
  }
}

</style>