<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="body">
      <router-view v-slot="{ Component }">
        <transition name="fades">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
  export default {
    setup () {
    }
  };

</script>
<style scss scoped>
  .body{
      width: 50%;
      margin: auto;
      overflow: hidden;
      position: relative;
  }

  @media screen and (max-width: 780px){
    .body{
      width: 100%;
      margin: auto;
    }
  }
</style>
<style>
.animate__animated {/* referring directly to the animation's @keyframe declaration */
  animation-duration: 0.2s; /* don't forget to set a duration! */
}
</style>