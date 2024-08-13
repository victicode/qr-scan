<template>
  <div v-if="Object.values(myLoan).length > 0">
    <div>
      <loanProgress :loan="myLoan" />
    </div>
    <div>
      <loanDetails />
    </div>
    <div>
      <loanHistory :loan="myLoan" />
    </div>
    <div class="q-mt-xl q-pt-xl q-mx-md q-mx-md-xl q-px-md-xl">
      <div class="q-mt-xl q-pt-md-md">
        <q-btn 
          @click="goTo()" 
          no-caps
          color="primary" class="w-100 q-pa-sm " 
          label="Pagar préstamo" 
        />
      </div>
    </div>
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { inject,} from 'vue'
  import { useRouter } from 'vue-router'
  import loanDetails from '@/components/loan/loanDetails.vue'
  import loanProgress from '@/components/loan/loanProgress.vue'
  import loanHistory from '@/components/loan/loanHistory.vue'
  import { useLoanStore } from '@/services/store/loan.store'


  export default {
    components: {
      loanDetails,
      loanProgress,
      loanHistory,
    },
    setup() {
      //vue provider
      const user = useAuthStore().user;
      const icons = inject('ionIcons')
      const router = useRouter()
      const loanStore = useLoanStore();
      const myLoan = ref({})

      const activeLoan = () => {
        loanStore.getLoan(user.id).then((data) => {
          if(!data.code)  throw data
            myLoan.value = data.data
        }).catch((e) => {
          showNotify('negative', 'error al obtener prestamo activo')
        })
      }
      const goTo = () => {
        router.push('/loan_pay')
      } 

      onMounted(() => {
        activeLoan()
      })

      // Data
      return{
        icons,
        user,
        router,
        myLoan,
        goTo,
      }
    },
  }

</script>
<style lang="scss" scoped>
.w-100{
  width: 100%;
}
</style>