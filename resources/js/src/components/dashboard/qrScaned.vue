<template>
  <div class="q-py-xs q-px-md  q-pb-md" style="height: 100%; overflow: hidden;">
    <div class="pa-md" v-if="user.qr_scan.length > 4">
      <div class="row">
        <div v-for="(qr, item) in user.qr_scan" :key="item" class="col-3 q-px-sm">
          <div class="qrScaned_container flex flex-center relative" >
            <q-icon :name="icons.outlinedQrCode2" size="xl"/>
            <div class="overlop">

            </div>            
          </div>
        </div>
        <div v-for="(qr, item) in user.qr_scan" :key="item" class="col-3 q-px-sm">
          <div class="qrScaned_container flex flex-center relative" >
            <q-icon :name="icons.outlinedQrCode2" size="xl"/>
            <div class="overlop">

            </div>            
          </div>
        </div>
        <div v-for="(qr, item) in user.qr_scan" :key="item" class="col-3 q-px-sm">
          <div class="qrScaned_container flex flex-center relative" >
            <q-icon :name="icons.outlinedQrCode2" size="xl"/> 
            <div class="overlop">
            </div>             
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary pa-md" v-else style="height: 100%;">
      <div class="bg-white flex column justify-between items-center" style="height: 100%;">
        <div class="flex column items-center q-pt-xl q-mt-xl">
          <q-icon :name="icons.outlinedSentimentDissatisfied" color="primary" size="7rem"/>
          <div class="text-center text-h5 text-weight-medium text-black q-mt-md">

            No has escaneado ningún Qr 
          </div>
        </div>
        <div class="q-mt-xl flex column flex-center">
          <div>
            Presiona el boton de escanear
          </div>
          <div>
            <q-icon name="eva-arrowhead-down-outline" color="primary" size="xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { inject, ref } from 'vue'
  import wozIcons from '@/assets/icons/wozIcons'

  export default {
    setup() {
      //vue provider
      
      const user = useAuthStore().user;
      const icons = inject('ionIcons')
      // Data

      // Data
      return{
        icons,
        user,
        wozIcons
      }
    },
  }

</script>
<style lang="scss" scoped>
.overlop{
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 background: #bab9b963;
 border-radius: 10px;
}
.qrScaned_container {
  height: 79px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px 0px #cecece82

}
</style>