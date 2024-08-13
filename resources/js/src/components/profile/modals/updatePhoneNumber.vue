<template>
  <q-dialog v-model="updatePhoneDialog" persistent backdrop-filter="blur(8px)">
    <transition name="step">
      <q-card style="min-width: 350px" v-if="stepper == 1">
        <q-card-section>
          <div class="text-h6">Coloca tú número telefónico</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input 
            dense 
            v-model="phone" 
            clearable 
            clear-icon="eva-close-outline" 
            autofocus mask="### ###-###" 
            hint="Formato: (+595) ### ###-##"  
          >
            <template v-slot:prepend>
              <div class="text-body2 text-black text-weight-bold" style="font-size: 0.85rem;">(+595)</div>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Volver" @click="hideModal(null)"/>
          <q-btn flat label="Verificar" :loading="loading" @click="sendMobileCode()" > 
          <!-- <q-btn flat label="Verificar" :loading="loading" @click="stepper = 2" >  -->
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </transition>
    <transition name="step">
      <q-card style="min-width: 350px" v-if="stepper == 2" class="">
        <q-card-section>
          <div class="text-h6 q">Validar número</div>
          <div class="text-weight-medium q-mt-sm" style="font-size: 0.83rem;" >Ingresa el codigo enviado a +595 {{phone}} por sms</div>
          <div class="text-caption q-mt-sm">
            <span>
              El codigo expira en: {{ `${minutes}:${seconds < 10 ? '0'+seconds : seconds},` }}
            </span>
            <span class="text-decoration-underline q-ml-xs" @click="reSendCode()">reenviar</span>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense  v-model="code" autofocus  />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
            
          <q-btn flat label="Volver" @click="stepper = 1 ; clearTimer()" />
          <q-btn flat label="Confirmar" :loading="loading"  @click="verifyPhoneNumber()" >

            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </transition>
  </q-dialog>
</template>
<script>
  import { ref } from 'vue';
  import { useUserStore } from '@/services/store/user.store'
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'

  export default {
    props: {
      dialog: Boolean
    },
    emits: ['hideModal'],
    setup (props, { emit }) {
      //vue provider
      const store = useUserStore();
      const user = useAuthStore().user;
      const $q = useQuasar();

      // Data
      const loading = ref(false);
      const stepper = ref(1);
      const updatePhoneDialog = props.dialog;
      const code = ref('');
      const minutes = ref(10);
      const seconds = ref('00');
      const timer = ref('');
      const phone = ref(user.phone)

      

      // Methods
      const sendMobileCode = () =>{
        if(!validatePhone()) return;
        loadingShow(true);
        const data = {
          phone: formatedPhoneNumber(),
        }
        store.sendMobileCode(data).then((data) => {
          if(!data.code){
            showNotify('negative', data)
            loadingShow(false);
            return;
          }
          if(data.data =="pending"){
            loadingShow(false);
            stepper.value = 2;
            initTimer()
            return
          }
          showNotify('negative', 'Número de teléfono incorrecto')
        })
      }
      const verifyPhoneNumber = () =>{
        if(!validateCode()) return
        loadingShow(true);
        const data = {
          phone: formatedPhoneNumber(),
          code: code.value
        }
        store.verifyMobileCode(data).then((data) => {
          if(!data.code){
            loadingShow(false);
            showNotify('negative', data)
            return;
          }
          if(data.data =="approved"){
            clearInterval(timer.value)
            loadingShow(false);
            hideModal(phone)
            showNotify('positive', 'Número de teléfono validado con exito')
            return;
          }
          loadingShow(false);
          showNotify('negative', 'Codigo incorrecto')
          
        })
      }
      const formatedPhoneNumber = () =>{
        return phone.value.replace(/\(/g, '').replace(/\)/g, '').replace(/\-/g, '').replace(/\s/g, '').trim()
      }
      const loadingShow = (state) => {
        loading.value = state;
      }
      const validatePhone = () => {
        if(!phone.value || phone.value.length < 11) {
          showNotify('negative', 'Número de teléfono no valido')
          return false
        }
        return true
      }
      const validateCode = () => {
        if(!code || code.value.length < 6) {
          showNotify('negative', 'Codigo no valido')
          return false
        }
        return true
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
      const hideModal = (data) => {
        emit('hideModal', data)
      }
      const reSendCode = () => {
        // sendMobileCode();
        setTimeout(() => {
          seconds.value = 0
          minutes.value = 10
        }, 1000);
      }
      const initTimer = () => {
        timer.value = setInterval(function () {
          console.log(timer.value)
					if ((seconds.value === '00' || seconds.value === 0) &&  minutes.value !== 0) {
						seconds.value = 59
						minutes.value -= 1
					} else if (minutes.value === 0 && seconds.value === 0) {
						seconds.value = 0
						clearTimer()
            showNotify('negative', 'Se agotó el tiempo!')
            return
						
					} else {
						seconds.value -= 1
					}
				}, 1000);
			}
      const clearTimer = () =>{
        clearInterval(timer.value)
      }
      return {
        loading,
        user,
        code,
        stepper,
        seconds,
        minutes,
        updatePhoneDialog,
        phone,
        timer,
        sendMobileCode,
        verifyPhoneNumber,
        hideModal,
        reSendCode,
        clearTimer,
      }
    }
  };
</script>
<style>

.step-enter-active,
.step-leave-active {
  transition: all 0.5s ease;
  opacity: 1;
}
.step-enter-active{
  transform: scale(1);
}
.step-leave-active{
  transform: scale(1);
}
.step-enter-from,
.step-leave-to {
  transition: all 0.5s ease;
  position: absolute!important;
  transform: scale(0.5);
  opacity: 0;
}
.step-enter-from{
  
  transform: scale(0.5);
}
.step-leave-to {
  transform: scale(0.5);
}

</style>

