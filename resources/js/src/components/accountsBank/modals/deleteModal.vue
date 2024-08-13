<template>
  <q-dialog v-model="dialog" persistent backdrop-filter="blur(8px)">
    <transition name="step">
      <q-card style="min-width: 350px" v-if="stepper == 1">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold"> ¿Seguro que desea eliminar esta cuenta? </div>
        </q-card-section>
        <q-card-section class="q-pt-none">

        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Volver" @click="hideModal(null)"/>
          <q-btn flat label="Confirmar" :loading="loading" @click="deleteAccount()" > 
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </transition>
    <transition name="step">
      <q-card style="min-width: 350px" v-if="stepper == 2">
        <q-card-section>
          <div class="text-h6 q">Verificación de eliminación</div>
          <div class="text-weight-medium q-mt-sm" style="font-size: 0.83rem;" >Ingresa el código enviado a +595 {{user.phone}} por sms</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense  v-model="code" autofocus  />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Volver" @click="stepper = 1"/>
          <q-btn flat label="Confirmar" :loading="loading" @click="verifyCode()" > 
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
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/services/store/user.store'
  import { useAuthStore } from '@/services/store/auth.store'
  import { useBankAccountStore } from '@/services/store/bankAccount.store'
  import { useQuasar } from 'quasar'

  export default {
    props: {
      dialog: Boolean,
      account: Object,
    },
    emits: ['hideModal'],
    setup (props, { emit }) {
      //vue provider
      const userStore = useUserStore();
      const bankAccountStore = useBankAccountStore();
      const user = useAuthStore().user;
      const $q = useQuasar();
      const stepper = ref(1);
      const code = ref('')
      // Data
      const account = props.account
      const loading = ref(false);
      const dialog = props.dialog;


      // Methods
      const loadingShow = (state) => {
        loading.value = state;
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
      const deleteAccount = () => {
        bankAccountStore.deleteBankAccount(account.id)
        .then((data)=>{
          if(data.code !== 200){
            throw data
          }
          showNotify('positive', '¡Cuenta eliminada con exito!')
          loadingShow(false)
          hideModal(null)
          
        }).catch((e) => {
          loadingShow(false)
          showNotify('negative', 'Error al intentar borrar cuenta de banco')
        })
      }
      const verifyCode = () =>{
        if(!validate()) return
        loadingShow(true);
        const data = {
          phone: formatedPhoneNumber(),
          code: code.value
        }
        userStore.verifyMobileCode(data).then((data) => {
          if(!data.code){
            loadingShow(false);
            showNotify('negative', data)
            return;
          }
          if(data.data =="approved"){
            deleteAccount()
            return;
          }
          loadingShow(false);
          showNotify('negative', 'Codigo incorrecto')
        })
      }
      const sendMobileCode = () =>{
        loadingShow(true);
        const data = {
          phone: formatedPhoneNumber(),
        }
        userStore.sendMobileCode(data).then((data) => {
          if(!data.code){
            showNotify('negative', data)
            loadingShow(false);
            return;
          }
          if(data.data =="pending"){
            loadingShow(false);
            stepper.value = 2;
            return
          }
          showNotify('negative', 'Número de teléfono incorrecto')
        })
      }
      const formatedPhoneNumber = () =>{
        return user.phone.replace(/\(/g, '').replace(/\)/g, '').replace(/\-/g, '').replace(/\s/g, '').trim()
      }
      const validate = () => {
        if(!code.value || code.value.length == 0) {
          showNotify('negative', 'Debes ingresar el codigo enviado')
          return false
        }
        return true
      } 
      return {
        loading,
        user,
        dialog,
        stepper,
        code,
        hideModal,
        deleteAccount,
        sendMobileCode,
        verifyCode,
        deleteAccount,
      }
    }
  };
</script>

