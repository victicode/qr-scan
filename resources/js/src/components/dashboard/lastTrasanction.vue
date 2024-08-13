<template>
  <div class="q-py-sm q-px-md q-px-md-lg" >
    <div class=" q-pb-sm" >
      <div class="row">
        <div class="col-12 flex items-center justify-between">
          <div class="text-subtitle1 q-mt-sm text-dark text-weight-bold">Mis préstamos</div>
        </div>
      </div>
    </div>
    <div style="" class="q-mb-sm">
      <div class="quote-section" v-if="isReady && Object.values(loan).length > 0">
        <div class="row q-px-none">
          <div class="col-12 bg-white q-pa-md flex items-center justify-between justify-md-start loan_card" style="" >
            <div>
              <div v-html="wozIcons.withdrawal" />
            </div>
            <div class="flex items-center justify-between  w-80 ">
              <div class=" q-mr-md-none q-pl-md-md q-pl-sm w-50">
                <div class="text-weight-medium">Préstamo</div>
                <div class="text-weight-bold q-mt-xs">N° 619{{loan.loan_number}}</div>
              </div>
              <div class="q-ml-md q-ml-md-none q-pl-md-md w-50 text-end">
                <div class="text-weight-medium text-right">Capital pendiente</div>
                <div class="text-weight-medium q-mt-xs text-right">Gs. {{numberFormat(loan.amount)}}</div>
              </div>
            </div>
            <div>
              <q-btn round flat class="q-ml-md-md"> 
                <q-icon
                  name="eva-arrow-ios-forward-outline"
                  size="xs"
                  color="black"
                  @click="router.push('/loan')"
                />
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="isReady && Object.values(loan).length == 0" >
        <div class="w-100 column items-center q-pt-md">
            <q-img
              :src="sadface"
              height="80px"
              width="80px"
            />
      
          <div class="w-100 text-center text-h6 text-weight-medium">
            No tienes ningún préstamo <br>aprobado 
          </div>
        </div>
      </div>
      <div class="quote-section" v-else>
        <div class="row q-px-none">
          <div class="col-12 bg-white q-pa-md flex items-center justify-between justify-md-start loan_card" style="" >
            <div style="" class="w-10">
              <!-- <div v-html="wozIcons.withdrawal" /> -->
              <q-skeleton type="rect"  />
            </div>
            <div class="flex items-center justify-between  w-80 ">
              <div class=" q-mx-sm  w-50">
                <div class="text-weight-medium"><q-skeleton type="rect" /></div>
                <div class="text-weight-bold q-mt-xs"><q-skeleton type="rect" /></div>
              </div>
              <div class="q-mx-sm w-50 text-end">
                <div class="text-weight-medium text-right"><q-skeleton type="rect" /></div>
                <div class="text-weight-medium q-mt-xs text-right"><q-skeleton type="rect" /></div>
              </div>
            </div>
            <div class="w-10">
              <q-skeleton type="rect"  />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import util from '@/util/numberUtil'
  import { inject, ref, onMounted } from 'vue'
  import sadFace from '@/assets/images/sadFace.svg'
  import wozIcons from '@/assets/icons/wozIcons';
  import { useLoanStore } from '@/services/store/loan.store';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      //vue provider
      const q = useQuasar()
      const user = useAuthStore().user;
      const icons = inject('ionIcons')
      const numberFormat = util.numberFormat
      const isReady = ref(false)
      const sadface = sadFace
      const loanStore = useLoanStore() 
      const loan = ref({}) 
      const loading = ref(true);
      const router = useRouter()

      const activeLoan = () => {
        loanStore.getLoan(user.id).then((data) => {
          if(!data.code)  throw data
          loan.value = data.data ? Object.assign(data.data) : {} 
          
          loadingShow(false)
          setTimeout(() => {
            isReady.value = true
          }, 2000)
        }).catch((e) => {
          isReady.value = true

          showNotify('negative', 'error al obtener prestamo activo')
        })
      }
      const showNotify = (type, message) => {
        q.notify({
          message: message,
          color: type,
          actions: [
            { icon: 'eva-close-outline', color: 'white', round: true, handler: () => { /* ... */ } }
          ]
        })
      }
      const loadingShow = (state) => {
        loading.value = state;
      }
      onMounted(() => {
        activeLoan()
      })
      // Data
      return{
        icons,
        user,
        numberFormat,
        isReady,
        sadface,
        wozIcons,
        loan,
        router,
      }
    },
  }

</script>
<style lang="scss" scoped>
.loan_card{
  border-radius:23px;
  box-shadow: 0px 5px 5px 0px #aaaaaa
}
.loan_container{
  border-bottom: 1px solid #d3d3d3;
}
.w-80 {
  width: 85%;
}
.w-50 {
  width: 46%;
}
.w-10 {
  width: 7%;
}
@media screen and (max-width: 780px){
  .w-80 {
    width: 40%;
  }
  .w-50 {
    width: 40%;
  }
  .loan_card > div:nth-child(1){ width: 10%!important; }
  .loan_card > div:nth-child(2){ width: 82%!important; }
  .loan_card > div:nth-child(3){ width: 8%!important; }

}
</style>