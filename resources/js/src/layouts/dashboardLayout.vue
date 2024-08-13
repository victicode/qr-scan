<template>
  <div class="layout-dasboard__content" v-if="readyState" style="">
    <div id="content-page" >
      <router-view v-slot="{ Component }">
        <transition name="horizontal" >
          <component :is="Component"  />
        </transition>
      </router-view>
    </div>
    <div id="navbar-buttom">
      <navbarVue />
    </div>
  </div>
</template>
<script >
  import navbarVue from "@/components/layouts/navbar.vue";
  import { inject, onMounted, ref } from 'vue';
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router';
  import utils from '@/util/httpUtil';

  export default {
    components:{
      navbarVue,
    },
    setup () {
      //vue provider
      const icons = inject('ionIcons')
      const $q = useQuasar()
      const store = useAuthStore();
      const router = useRouter();

      const readyState = ref(false)
      // methods
      const getCurrentUser = () =>{
        store.currentUser().then((data)=>{
          if(data.code !== 200 ){
            showNotify('negative', data.error ?? 'Error de servicio')
            utils.errorLogout( () => router.push('/login'))
            return;
          }
          readyState.value = true
        }).catch((e) => { 
          showNotify('negative', 'Error de servicio')
          utils.errorLogout( () => router.push('/login'))
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

      // Mounted
      onMounted(() =>{
        getCurrentUser()
        $q.addressbarColor.set('#ff5a6a')
      })
      
      return {
        icons,
        readyState
      }
    }
  };
</script>

<style lang="scss" scoped>
#content-page{
  height: 90%;
  overflow: hidden;

}
#navbar-buttom{
  height: 10%;
  width: 100%;
  background: #fff;
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
  #content-page{
  height: 92%;
  overflow: hidden;
  }
  #navbar-buttom{
    height: 8%;
  }
}
</style>