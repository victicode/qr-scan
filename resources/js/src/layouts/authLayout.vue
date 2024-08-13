<template>
  <div>
    <div id="auth-section" style="position: relative;">
      <div class="bg-terciary row justify-center q-px-lg  column" style="height:17%" >
        <h3 class="text-white text-md-h3 woz-logo">Woz Pay</h3>
        <q-linear-progress rounded size="8px" track-color="white"  :value="0.55" color="backLinear" reverse class="q-mt-sm auth-progress" />
      </div>
      <div style="height:73%; position: relative; " class="">
        <router-view v-slot="{ Component }">
          <transition >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <div class="text-center w-100 d-flex flex-center q-px-xl q-mt-md">
        <div class="text-subtitle2 text-secodary text-weight-medium cursor-pointer" style="opacity: 0.6; ">
          Politica de privacidad - Términos y condiciones
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { onMounted } from 'vue';
  import { useQuasar } from 'quasar'
  export default {
    setup () {
      const q = useQuasar()
      onMounted(() =>{
        // console.log('kkk')
        q.addressbarColor.set('#ffc701')

      })
      return {
      }
    }
  };
</script>

<style lang="scss" scoped>
.woz-logo {
  font-weight: bold;
}
</style>
<style lang="scss">
  .v-enter-active,
  .v-leave-active {
    transition: all 1s ease;
    opacity: 0.3;
  }
  .v-enter-active{
    transform: translateX(0px);
  }
  .v-leave-active{
    transform: translateX(0px);
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    position: absolute;
  }
  .v-enter-from{
    transform: translateX(-500px);
  }
  .v-leave-to {
    transform: translateX(-500px);
  }


  #auth-section{
    height: 100vh; 
    width: 100%;
    overflow: hidden;
  }
  .auth-progress {
    border: 1px solid white;
    width: 30%!important;
    border-radius: 90px;
    & .q-linear-progress__track{
      opacity: 1;
    }
    & .q-linear-progress__model {
      border-top-right-radius: 90px;
      border-bottom-right-radius: 90px;
    }
  }
  @media screen and (max-width: 780px){
    #auth-section{
      height: 100vh; 
    }
    .auth-progress {
      width: 55%!important;

    }
  }

</style>