<template>
  <div class="q-py-xs q-px-md  q-pb-md" style="height: 100%; overflow: hidden;">
    <div>
      <div class="text-subtitle1 text-weight-medium q-mt-none text-dark">¿Qué puedes hacer?</div>
    </div>
    <div class="q-mt-md-md q-mt-xs-md">
      <div class="row">
        <div class="col-3 q-px-xs">
          <q-btn color="transparet" flat no-caps class="q-px-xs q-py-none actions-button w-100" to="/apply">
            <div class="q-mt-xs" v-html="icons.solicitar" />
            <span class="q-mt-none text-dark text-body2">Solicitar</span>
          </q-btn>
        </div>
        <div class="col-3 q-px-xs">
          <q-btn color="transparet" flat no-caps class="q-px-xs q-py-none actions-button w-100" to="/transfer">
            <div class="q-mt-xs" v-html="icons.transferir" />
            <span class="q-mt-none text-dark text-body2">Transfer.</span>
          </q-btn>
        </div>
        <div class="col-3 q-px-xs">
          <q-btn color="transparet" flat no-caps class="q-px-xs q-py-none actions-button w-100" to="/deposit" >
            <div class="q-mt-xs" v-html="icons.cargar" />
            <span class="q-mt-none text-dark text-body2">Cargar</span>
          </q-btn>
        </div>
        <div class="col-3 q-px-xs">   
          <q-btn color="transparet" flat no-caps class="q-px-xs q-py-none actions-button w-100">
            <div v-html="icons.pagoYa" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import wozIcons from '@/assets/icons/wozIcons'

  export default {
    setup() {
      //vue provider
      const user = useAuthStore().user;
      const icons =  wozIcons
      // Data

      // Data
      return{
        icons,
        user,
      }
    },
  }

</script>
<style lang="scss">
  .actions-button{
    border: 1.3px solid #c7c7c7!important;
    border-radius: 15px!important;
    height: 70px!important;
    width: 100%!important;
    
    & .q-btn__content{
      display: flex!important;
      flex-direction: column!important;
      justify-content: space-evenly!important;
      align-items: center!important;
    }
  }


</style>