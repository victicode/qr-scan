<template>
  <q-dialog v-model="dialog"  :auto-close="true" backdrop-filter="blur(8px)">
    <q-card style="min-width: 350px" class="q-pb-md-none">
      <q-card-section class="q-py-sm q-px-md-md q-pt-md-md q-pb-md-sm">
        <div class="q-pa-none q-px-md-md q-pt-md-md q-pb-md-none">
          <div class="text-subtitle1 text-weight-medium">
            Datos bancarios
          </div>
          <div>
            <q-form
              id="addAccountForm"
              class="q-gutter-md"
              @submit="updateAccount()"
            >
            <div class="row ">
              <div class="col-12 q-my-md">
                <q-input
                  class="account_bankForm no-display-value q-pb-none"
                  outlined
                  color="positive"
                  v-model="account.bank.name"
                  disabled
                  label="Entidad Bancaria"
                  autocomplete="off"
                  disable
                > 
                <template v-slot:prepend>
                  <div class="input-logo-container">

                    <div style="height: 100%; width: 100%;" :class="account.bank.logo">
                      <div v-html="wozIcons[account.bank.logo]" />
                    </div>
                  </div>
                </template> 
                </q-input>
              </div>
              <div class="col-12 q-my-md">
                <q-input
                  class="account_bankForm q-pb-none"
                  outlined
                  clearable
                  :clear-icon="'eva-close-outline'"
                  color="positive"
                  v-model="account.account_number"
                  name="id_user"
                  label="Número de cuenta"
                  autocomplete="off"
                  :rules="rulesForm('number')"
                />
              </div>
              <div class="col-12 q-my-md">
                <q-input
                  class="account_bankForm q-pb-none"
                  outlined
                  clearable
                  :clear-icon="'eva-close-outline'"
                  color="positive"
                  v-model="account.account_owner"
                  disable
                  name="id_user"
                  label="Titular de la cuenta"
                  :rules="rulesForm('owner')"
                  autocomplete="off"
                />
              </div>
              <div class="col-12 q-my-md">
                <q-select 
                  outlined
                  class="account_bankForm q-pb-none" 
                  v-model="account.account_type" 
                  :options="['Ahorro', 'Corriente']" 
                  label="Tipo de cuenta" 
                  clearable
                  :rules="rulesForm('type')"
                  :clear-icon="'eva-close-outline'"
                  dropdown-icon="eva-chevron-down-outline"
                  behavior="menu"

                />
              </div>
              <div class="col-12 q-my-md">
                <q-input
                  class="account_bankForm q-pb-none"
                  outlined
                  clearable
                  :clear-icon="'eva-close-outline'"
                  color="positive"
                  v-model="account.account_owner_dni"
                  name="id_user"
                  label="Número de cédula"
                  mask="###.###.###"
                  reverse-fill-mask
                  :rules="rulesForm('ownerDni')"
                  autocomplete="off"
                  disable
                />
              </div>
            </div>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Volver" @click="hideModal(null)"/>
              <q-btn flat label="Confirmar" :loading="loading" type="submit" > 
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </q-card-actions>
            </q-form>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/services/store/user.store'
  import { useAuthStore } from '@/services/store/auth.store'
  import { useBankAccountStore } from '@/services/store/bankAccount.store'
  import { useQuasar } from 'quasar'
  import wozIcons from '@/assets/icons/wozIcons'

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

      // Data
      const loading = ref(false);
      const dialog = props.dialog;
      const account = props.account
      

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
      const updateAccount = () => {
        if(!validate) return 
        loadingShow(true)
        bankAccountStore.updateBankAccount(account)
        .then((data) => {
          if(data.code !== 200) throw data
          showNotify('positive', 'Cuenta de banco actualizada con exito.')
          loadingShow(false)
          setTimeout(() => {
            hideModal(null)

          }, 1000)
        }).catch((e) => {
          showNotify('negative', 'Error al actualizar la cuenta de banco')
          loadingShow(false)
        })
      }
      
      const rulesForm = (id) => {
        const iRules = {
          number:[
            val => (val !== null && val !== '') || 'El número de cuenta es requerido.',
            val => (val.length > 20 ) || 'Debe contener 20 digitos',
            val => (/[a-zA-z,%"' ();&|<>]/.test(val) == false ) || "Se permiten solo valores numericos",
          ],
          owner:[
            val => (val !== null && val !== '') || 'Nombre del propietario es requerido.',
            val => (val.length >= 8 ) || 'Formato no valido',
            val => (/[,%"'();&|<>]/.test(val) == false ) || 'No debe contener "[](),%|&;\'" ',
          ],
          ownerDni:[
            val => (val !== null && val !== '') || 'El número de cedula es requerido.',
            val => (val.length >= 8 ) || 'Formato no valido',
            val => (/[,%"' ();&|<>]/.test(val) == false ) || 'No debe contener espacios, ni "[](),%|&;\'" ',
          ],
          type:[
            val => (val !== null && val !== '') || 'El tipo de cuenta.',
            val => (/[,%"' ();&|<>]/.test(val) == false ) || 'No debe contener espacios, ni "[](),%|&;\'" ',
          ],
        }
        
        return iRules[id]
      }
      const validate = () => {
        let isOk = true
        Object.entries(account).forEach( ([key,value ]) => { if(value == '') isOk = false }); 

        if(!isOk) showNotify('negative', 'Los campos del formulario no pueden estar vacio')

        return isOk
      }
      return {
        wozIcons,
        loading,
        dialog,
        account,
        hideModal,
        rulesForm,
        updateAccount,
      }
    }
  };
</script>

<style lang="scss" scoped>
  .w-100{
    width: 100%;
  }
  .bancoBasa{
    transform: translateX(5%) translateY(30%)
  }
  .bancoRio{
    transform: translateY(35%) translateX(10%);
  }
  .continental{
    transform: translateY(35%) translateX(20%) scale(1.2);
  }
  .eko{
    transform: translateY(30%) translateX(10%);
  }
  .itau{
    transform: translateY(36%) translateX(25%);
  }
  .sudameris{
    transform: translateY(35%) translateX(23%) scale(1.2);
  }
  .ueno{
    width: 144% !important;
    transform: translateY(30%) translateX(5%);
  }
  .wally{
    transform: translateY(30%) translateX(5%);
  }
</style>