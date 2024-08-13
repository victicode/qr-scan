<template>
  <div class="q-pt-md q-px-md q-pb-sm">
    <div>
      <div class="text-subtitle1 text-weight-medium">Cuotas</div>
    </div>
    <div class="row q-px-none q-mt-sm">
      <div v-for="index in loan.quotas" :key="index" class="flex justify-between w-100 items-center q-mb-sm q-pb-xs quota_content">
        <div>
          <div class="text-weight-medium">
            Cuota {{ index }} de {{ loan.quotas }}
          </div>
          <div class="text-weight-medium text-grey-6">
            Fecha de vencimiento
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-weight-medium text-body1 q-mt-xs">
            Gs. {{ numberFormat(loan.amount_to_pay/loan.quotas) }}
          </div>
          <div>
            <q-icon 
              v-if="loan.pays[index-1]"
              class="q-ml-xs" 
              :name=" loan.pays[index-1].status == 2 ? 'eva-checkmark-circle-2-outline' : 'eva-clock-outline' " 
              :color="loan.pays[index-1].status == 2 ? 'green-5' : 'yellow-8' "  
              size="sm" 
              @click="showNotify('yellow-9', 'Tú pago esta siendo verificado.')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'
  import wozIcons from '@/assets/icons/wozIcons'
  import util from '@/util/numberUtil'

  export default {
    props: {
      loan: Object,
    },
    setup (props) {
      //vue provider
      const numberFormat  = util.numberFormat
      const $q = useQuasar();
      // Data
      const loan = props.loan
      

      // Methods
      const forPay = () => {
        let amount = 0

        loan.pays.forEach(pay => {
          amount += pay.amount
        });

        // return loan.amount_to_pay - amount
        return loan.amount - amount
      }
      const showNotify = (type, message) => {
        $q.notify({
          message: message,
          color: type,
          actions: [
            { icon: 'eva-close-outline', color: 'white', round: true, handler: () => { /* ... */ } }
          ]
        })
      }
      return {
        loan,
        numberFormat,
        wozIcons,
        forPay,
        showNotify,
      }
    }
  };
</script>
<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
.q-pa-7{
  padding: 13px 13px;
}
.loan_card{
  border-radius: 15px;
  box-shadow: 0px 3px 6px 0px #aaaaaa
}
.loan_container{
  border-bottom: 1px solid #d3d3d3;
}
.quota_content{
  border-bottom: 1px solid $grey-5;
}
</style>
<style lang="scss">
.loan_progress {
  border-radius: 155px!important;
  border: 1px solid $positive;

  & .q-linear-progress__track{
    opacity: 1;
    border-radius: 155px!important;
  }
  & .q-linear-progress__model {
    border-radius: 155px!important;
  }
}
</style>