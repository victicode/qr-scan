<template>
  <div>
    <div>
      <div class="q-pa-md flex flex-center">
        <div class="avatar">
          <div class="q-mt-sm q-pt-sm">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
        </div>
      </div>
      <div class="q-px-md">
        <div class="q-pb-xs q-mb-md border-bottom">
          <div class="text-subtitle2 text-weight-medium text-grey-6">Nombre:</div>
          <div class="text-subtitle1 text-weight-bold">{{user.name}}</div>
        </div>
        <div class="q-pb-xs q-mb-md border-bottom">
          <div class="text-subtitle2 text-weight-medium text-grey-6">Correo:</div>
          <div class="text-subtitle1 text-weight-bold">{{user.email}}</div>
        </div>
        <div class="q-pb-xs q-mb-md border-bottom">
          <div class="text-subtitle2 text-weight-medium text-grey-6">Codigos escaneados:</div>
          <div class="text-subtitle1 text-weight-bold">{{user.qr_scan.length}}</div>
        </div>
        <div class="q-pb-xs q-mb-md border-bottom">
          <div class="text-subtitle2 text-weight-medium text-grey-6">Puntos:</div>
          <div class="text-subtitle1 text-weight-bold">{{3}} pts</div>
        </div>
      </div>
      <div class="q-px-md flex flex-center q-mt-lg">
        <q-btn 
          class="q-py-md q-px-xl" 
          color="secondary" 
          glossy 
          label="Cerrar sesión"  
          :loading="loading"
          @click="logout()"
        >
          <template v-slot:loading>
            <q-spinner-hourglass />
          </template>
        </q-btn>
      </div>
    </div> 
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { inject, ref } from 'vue'
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      //vue provider
      const user = useAuthStore().user;
      const store = useAuthStore();
      const icons = inject('ionIcons')
      const $q = useQuasar()
      const router = useRouter()
      // Data
      const loading = ref(false)
      
      // Methods
      const loadingShow = (value) => {
        loading.value = value
      }
      const logout = () =>{
        loadingShow(true)
        store.logout().then((data)=>{
          if(!data.code) throw data
          showNotify('warning', 'Sesión cerrada')
          setTimeout(() => {
            router.push('/login')
            loadingShow(false);
          }, 2000);
        }).catch((e) => { 
          console.log(e)
          loadingShow(false);
          showNotify('negative', 'Error al cerrar sesión')
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
      return{
        icons,
        user,
        loading,
        logout
      }
    },
  }

</script>
<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid $grey-4;
}
.avatar {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $primary;
  color: white;
  border-radius: 50%;
  font-size: 3rem;
}
</style>