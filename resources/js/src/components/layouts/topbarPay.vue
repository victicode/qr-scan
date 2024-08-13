<template>
  <div id="topbarLayout" class="bg-primary q-pt-md">
    <div class="w-100 flex justify-between items-center h-100 q-pb-sm">
      <div class="">
        <q-btn flat round color="white" size="xl" icon="eva-chevron-left-outline" @click="router.go(-1)" />
      </div>
      <div class="text-weight-bold text-h6 text-white">
        {{ route.meta.title == 'Banco' ? 'Cuenta bancaria' : route.meta.title}}
      </div>
      <div class="boxNoVisible">
      </div>
    </div>
  </div>
</template>
<script >
  import { inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  export default {
    setup () {
      //vue provider
      const icons = inject('ionIcons')
      const route = useRoute();
      const router = useRouter();
      return {
        icons,
        router,
        route
      }
    }
  };
</script>
<style lang="scss" scoped>
.boxNoVisible {
  width: 72px;
  height: 72px;
  visibility: hidden;
}
.h-100{
  height: 100%;
}
#topbarLayout{
  height: 9%;
  width: 100%;
  // border-bottom: 1px solid lightgray;
}
</style>