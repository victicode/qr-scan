<template>
  <div  class="dashboard_container">
    <div class="bg-white" style="height: 100%;">
      <div style="height: 25%;">
        <currentUserPersonalInfo />
      </div>
      <div>
        <endButton />
      </div>
      <div style="height: 65%;">
        <qrScaned />
      </div>
      <div>
        
      </div>
    </div> 

  </div>
</template>
<script>
  import currentUserPersonalInfo from '@/components/dashboard/currentUserPersonalInfo.vue';
  import qrScaned from '@/components/dashboard/qrScaned.vue';
  import endButton from '@/components/dashboard/endButton.vue';
  
  export default {
    components: {
      currentUserPersonalInfo,
      qrScaned,
      endButton,
    },
    setup() {

    },
  }
</script>
<style lang="scss" scoped>
.dashboard_container{
  height: 100%; 
  background:#f1f0f0; 
  
}
@media screen and (max-width: 780px){
  .dashboard_container{
    height: 100%;
    max-height: fit-content; 
    background:#f1f0f0; 
    overflow-y: auto;
  }
}
</style>