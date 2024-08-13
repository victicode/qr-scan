<template>
 <div class="layout-dasboard__content"    style="">
    <div class="bg-white hero_page">
      <div class="flex flex-center h-100">
        <div v-html="wozIcons.transferir" class="transfer-icon__top"/>
      </div>
    </div>
    <div class="container_page" >
      <div class="q-px-md q-mt-xl">
        <q-linear-progress rounded size="7px"  :value="0.55" color="white" reverse class="q-mt-sm w-100 transfer__line" />
      </div>
      <div class="q-px-md q-mt-lg text-white text-h7 text-weight-bold flex justify-start q-mr-xl">
        <div>
          Envía dinero a cualquier <br>cuenta Woz Pay 
        </div>
        <div>
          <div v-html="wozIcons.transferir" class="transfer-icon"/>
        </div>
      </div>
      <div class="q-px-md q-mt-sm text-white text-subtitle1 text-weight-medium">
        Ahora puedes enviar o hacer <br>transferencias de cuenta a cuenta con <br>Woz Pay.
      </div>
      <div class="q-px-md q-mt-xl q-px-md-xl">
        <q-btn 
          color="positive" class="w-100 q-pa-md q-mb-none  link_button" 
          no-caps
          label="Enviar ahora"
          @click="router.push('/transfer_send')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { inject, onMounted, ref } from 'vue'
import wozIcons from '@/assets/icons/wozIcons'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup () {
    const icons = inject('ionIcons')
    // const user = useAuthStore().user;
    const router = useRouter()
    const $q = useQuasar()
    
    onMounted(()=>{
      $q.addressbarColor.set('#0449fb')
    })
    return { icons, wozIcons, router}
  },
}
</script>

<style lang="scss" scoped>
.h-100 {
  height: 100%;
}
.transfer-icon__top {
  transform: rotate(-45deg) scale(3);
   
}
.transfer-icon {
  transform: rotate(-45deg) translatey(-30px) translatex(-95px) scale(0.9);
  filter: brightness(25);
}
.text-h7 {
  font-size: 1.72rem;
}
.w-100 {
  width: 100%;
}

.container_page{
  height: 55%;
  overflow: hidden;
  background: $primary;
}

.hero_page{
  height: 45%;
}
.layout-dasboard__content{
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@media screen and (max-width: 780px){
  .transfer-icon {
    transform: rotate(-45deg) translatey(130px) translatex(185px) scale(0.9);
  }
}
</style>
<style lang="scss">
.transfer__line {
  border-radius: 155px;

  & .q-linear-progress__track{
    opacity: 1;
    border-radius: 155px;
  }
  & .q-linear-progress__model {
    border-radius: 155px;
  }
}
</style>