<template>
  <q-dialog v-model="updateInfoDialog" persistent backdrop-filter="blur(8px)">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold"> {{ setTitleByOperation() }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="copy" clearable clear-icon="eva-close-outline" autofocus   />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Volver" @click="hideModal(null)"/>
          <q-btn flat label="Confirmar" :loading="loading" @click="uptadteInfo()" > 
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/services/store/user.store'
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'

  export default {
    props: {
      dialog: Boolean,
      dialogToshow: String,
    },
    emits: ['hideModal'],
    setup (props, { emit }) {
      //vue provider
      const store = useUserStore();
      const authStore = useAuthStore();
      const user = useAuthStore().user;
      const $q = useQuasar();

      // Data
      const loading = ref(false);
      const updateInfoDialog = props.dialog;
      const dialogType = props.dialogToshow;

      const city = ref(user.city);
      const locality = ref(user.locality);
      const address = ref(user.address);
      const copy = ref('');
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
      const setModelInput = () => {
        if(dialogType == 'city') copy.value = user.city ;
        if(dialogType == 'locality')  copy.value = user.locality;
        if(dialogType == 'address')  copy.value = user.address;
      }
      const setSendData = () => {
        if(dialogType == 'city') {
         return {
          id: user.id,
          city: copy.value
         } 
        }     
        if(dialogType == 'locality') {
         return {
          id: user.id,
          locality: copy.value
         }   
        } 
        if(dialogType == 'address') {
         return {
          id: user.id,
          address: copy.value
         } 
        }   
      }
      const setTitleByOperation = () => {
        if(dialogType == 'city') return 'Ingresa tú ciudad de residencia';
        if(dialogType == 'locality') return 'Ingresa tú barrio o localidad';
        if(dialogType == 'address') return 'Ingresa tú calle y N° de casa';
      }
      const hideModal = (data) => {
        emit('hideModal', data)
      }
      const uptadteInfo = () => {
        if(!validate()){
          showNotify('negative', 'El formulario no se puede enviar vacío')
          return
        }

        loadingShow(true)
        store.updateUser(setSendData())
        .then((data)=> {
          if(!data.code){
              showNotify('negative', data)
              loadingShow(false);
              return;
            }
            setTimeout(() => {
              authStore.$patch({ user: data.data })
              // console.log(data.data)
              showNotify('positive', 'Datos actualizados')
              loadingShow(false);
              hideModal()
            }, 1000);
        })
        .catch((e) => { 
          console.log(e)
          loadingShow(false);
          showNotify('negative', 'Error al enviar codigo')
        })
      }
      const validate = () => {
        console.log(copy.value)
        if(copy.value == null || copy.value.length == 0) return false;
        return true;
      }
      onMounted(() => {
        setModelInput()
      })
      return {
        loading,
        user,
        city,
        locality,
        address,
        updateInfoDialog,
        copy,
        hideModal,
        setTitleByOperation,
        setModelInput,
        uptadteInfo,
      }
    }
  };
</script>

