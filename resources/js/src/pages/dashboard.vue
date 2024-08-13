<template>
  <div  class="dashboard_container">
    <div style="height: 100%;">
      <div style="height: 28.3%;">
        <currentUserPersonalInfo />
      </div>
    </div> 

  </div>
</template>
<script>
  import currentUserPersonalInfo from '@/components/dashboard/currentUserPersonalInfo.vue';


  export default {
    components: {
      currentUserPersonalInfo,
    },
    setup() {

    },
  }
</script>
<style lang="scss" scoped>
.dashboard_container{
  height: 100%; 
  background:#ffff; 
  
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