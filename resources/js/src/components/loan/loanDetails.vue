<template>
  <div>
    <div class="q-py-xs  q-px-md linked_section bg-white"  >
      <div class="flex items-center justify-between">
        <div class="text-subtitle1 text-weight-medium">
          <div class="flex items-center"> 
            <h6 class=" text-subtitle1 text-weight-medium  q-mr-sm text-dark">
              Detalles de prestamo
            </h6>
          </div>
          <div class="text-body2 text-grey-6" >
            Tasa de interés entre otros.
          </div>
        </div>
        <div class="q-mb-xs">
          <q-btn flat  color="lightgdark" icon="eva-arrow-ios-forward-outline"  @click="router.push('loan_view')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { inject,} from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      //vue provider
      const user = useAuthStore().user;
      const icons = inject('ionIcons')
      const router = useRouter()


      // Data
      return{
        icons,
        user,
        router,
      }
    },
  }

</script>

<style>
.linked_section {

  height: 100%; 
  overflow: hidden; 
  border-top:10px solid lightgray; 
  border-bottom:10px solid lightgray;
 
}
</style>

