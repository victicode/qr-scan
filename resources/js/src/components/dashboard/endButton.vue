<template>
  <div>
    <div class="flex justify-end q-mb-lg q-px-md" v-if="user.qr_scan.length > 4">
      <q-btn class="q-py-sm  q-px-md" color="secondary" glossy label="Terminar recorrido"  />
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