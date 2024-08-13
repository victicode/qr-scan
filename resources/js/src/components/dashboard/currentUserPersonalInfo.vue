<template>
  <div class="userInfoContent q-pt-md q-px-lg" >
    <div style="">
      <div class="text-h4 text-white text-weight-regular">Bienvenido</div>
    </div>
    <div class="">
      <div class="w-100 user-info q-mt-md-sm">
        <div class="flex items-center"> 
          <h6 class="text-weight-medium  q-mr-xs  q-mt-xs q-mb-none">
            {{ user.name }} 
          </h6>
        </div>
        <div>
          <q-linear-progress rounded size="4px" track-color="grey-5"  :value="0.55" color="secondary"  class="q-mb-sm dashboard-progress" />
        </div>
        <div class="q-mt-sm">
          <span class="text-body2 text-weight-bold">
            Correo: {{ user.email}} 
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { inject, ref } from 'vue'
  import util from '@/util/numberUtil'

  export default {
    setup() {
      //vue provider
      const user = useAuthStore().user;
      const numberFormat = util.numberFormat
      const icons = inject('ionIcons')

      // Data
      const showing = ref(false)
      
      // Methods
      const showToltip = () => {
        showing.value = true
        setTimeout(() => {
          showing.value = false
        }, 3500);
      }
      
      return{
        icons,
        user,
        numberFormat,
        showing,
        showToltip
      }
    },
  }

</script>
<style lang="scss" scoped>
  .userInfoContent{
    height: 100%; 
    overflow: hidden;
    background: linear-gradient(180deg, $secondary 65%, #fff 60%);
  }
  h5{
    font-size: 1.9rem!important;
  }
  // .user-info{
  //   background: #0185ff;
  //   padding: 13px 10px;
  //   border-radius: 5px;
  // }
  .user-info{
    margin-top: 14px;
    background: white;
    padding: 13px 10px;
    border-radius: 5px;
    box-shadow: 0px 3px 5px 0px rgba(168, 168, 168, 0.651);
  }
  .dashboard-progress {
    width: 50%;
  }
  @media screen and (max-width: 780px){
    .dashboard-progress {
      width: 75%;

    }
  }
</style>