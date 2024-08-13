<template>
  <q-tabs
    no-caps
    right-icon="-"
    active-color="secondary"
    align="justify"
    class="bg-white text-dark shadow-0 fixed-bottom bottom-tab q-py-md-xs q-px-md-lg flex q-py-xs" 
  >
    <q-route-tab class="q-px-xs-sm q-px-md-sm" :to="'/dashboard'"  exact replace  >
      <div class="flex flex-center column">
        <div v-html="wozIcons.home" />
        <span class="q-mt-xs text-dark text-subtitle1">Inicio</span>
      </div>
    </q-route-tab>
    <q-tab class="q-px-xs-sm q-px-md-sm" @click="showScan()">
      <div class="flex flex-center column">
        <q-icon
          :size="'lg'"
          :name="icons.outlinedQrCodeScanner"
        />
        <span class="q-mt-xs text-dark text-subtitle1">Escanear</span>
      </div>
    </q-tab>
    <q-route-tab class="q-px-xs-sm q-px-md-sm" :to="'/profile'"  exact replace > 
      <div class="flex flex-center column">
        <div v-html="wozIcons.profile" />
        <span class="q-mt-xs text-dark text-subtitle1">Perfil</span>
      </div>
    </q-route-tab>
   
  </q-tabs>
</template>

<script>
import { inject } from 'vue'
import wozIcons from '@/assets/icons/wozIcons'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const icons = inject('ionIcons')
    const emitter = inject('emitter'); // Inject `emitter`
    const router = useRouter()
    const showScan = () => {
      router.push('/dashboard')
      setTimeout(()=> {
        emitter.emit('showScanModal');
      }, 500)
    };

    return { icons, wozIcons, showScan}
  },
}
</script>
<style>
.notificationBadge{
  top: -3px!important; right: -7px!important;
}
.q-tab__label{
    font-size: 0.72rem!important;
  }
</style>
<style lang="scss" scoped>
  
  .w-100{
    width: 100%!important;
  }
  .bottom-tab{
    border-top: 1.5px solid $grey-3;
    width: 50%;
    left: 25%;
  }
  @media screen and (max-width: 780px){
    .bottom-tab{
      width: 100%;
      left: 0%;
    }
  }
</style>