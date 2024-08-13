<template>
  <div id="topbarLayout">
    <div class="w-100 flex justify-center items-end h-100 q-pb-sm">
      <div class="text-weight-bold text-h6">{{ route.meta.title == 'Banco' ? 'Cuenta bancaria' : route.meta.title}}</div>
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
      return {
        icons,
        route
      }
    }
  };
</script>
<style lang="scss" scoped>
.h-100{
  height: 100%;
}
#topbarLayout{
  height: 9%;
  width: 100%;
  border-bottom: 1px solid lightgray;
}
</style>