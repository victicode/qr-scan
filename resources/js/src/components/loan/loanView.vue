<template>
  <div v-if="Object.values(myLoan).length > 0">
    <div>
      <q-toolbar class="bg-grey-5 text-black ">
        <q-toolbar-title> 
          <div class="w-100 flex items-center justify-between">
            <span class="text-subtitle2 text-weight-bold q-mt-sm">Detalle de préstamo</span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <q-list >
        <q-item class="q-py- q-px-sm" >
          <q-item-section>
            <div class="flex items-center justify-between">
              <q-item-label class="q-mt-xs text-weight-bold" >
              <span class="text-caption text-weight-bold">
                Monto desembolsado
              </span>
              </q-item-label>
              <q-item-label caption lines="1" class="text-weight-medium text-caption"> Gs. {{ numberFormat(myLoan.amount) }} </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item class="q-py- q-px-sm" >
          <q-item-section>
            <div class="flex items-center justify-between">
              <q-item-label class="q-mt-xs text-weight-bold" >
              <span class="text-caption text-weight-bold">
                Monto a devolver
              </span>
              </q-item-label>
              <q-item-label caption lines="1" class="text-weight-medium text-caption"> Gs. {{ numberFormat(myLoan.amount_to_pay) }} </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item class="q-py- q-px-sm" >
          <q-item-section>
            <div class="flex items-center justify-between">
              <q-item-label class="q-mt-xs text-weight-bold" >
              <span class="text-caption text-weight-bold">
                Falta por pagar
              </span>
              </q-item-label>
              <q-item-label caption lines="1" class="text-weight-medium text-caption"> Gs. {{ numberFormat(needPay()) }} </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item class="q-py- q-px-sm" >
          <q-item-section>
            <div class="flex items-center justify-between">
              <q-item-label class="q-mt-xs text-weight-bold" >
                <div>
                  <span class="text-caption text-weight-bold">
                    Monto de cuota
                  </span>
                </div>
              </q-item-label>
              <q-item-label caption lines="1" class="text-weight-medium text-caption">
                Gs. {{ numberFormat(amountQuote()) }}
              </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item class="q-py- q-px-sm" >
          <q-item-section>
            <div class="flex items-center justify-between">
              <q-item-label class="q-mt-xs text-weight-bold" >
                <div>
                  <span class="text-caption text-weight-bold">
                    Vencimiento
                  </span>
                </div>
              </q-item-label>
              <q-item-label caption lines="1" class="text-weight-medium text-caption flex items-center">
                <div class=" q-mt-xs">{{ moment(myLoan.due_date).format('DD/MM/YYYY') }}</div>
              </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item class="q-py- q-px-sm" >
          <q-item-section>
            <div class="flex items-center justify-between">
              <q-item-label class="q-mt-xs text-weight-bold" >
                <div>
                  <span class="text-caption text-weight-bold">
                    Días de atrasados
                  </span>
                </div>
              </q-item-label>
              <q-item-label caption lines="1" class="text-weight-medium text-caption flex items-center">
                <div class=" q-mt-xs">{{ '0 días' }}</div>
              </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
      <q-toolbar class="bg-grey-5 text-black q-mt-sm">
          <q-toolbar-title> 
            <div class="w-100 flex items-center justify-between">
              <span class="text-subtitle2 text-weight-bold q-mt-sm">Intereses del préstamo</span>
            </div>
          </q-toolbar-title>
        </q-toolbar>
        <q-list >
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Interés
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ myLoan.interest }}%</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Interés por mora
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ myLoan.interest_for_delay }}%</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
    </div>
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { inject, ref,} from 'vue'
  import { useRouter } from 'vue-router'
  import { useLoanStore } from '@/services/store/loan.store'
  import util from '@/util/numberUtil'
  import moment from 'moment'

  export default {

    setup() {
      //vue provider
      const user = useAuthStore().user;
      const icons = inject('ionIcons')
      const router = useRouter()
      const loanStore = useLoanStore();
      const numberFormat  = util.numberFormat
      const myLoan = ref({})

      const activeLoan = () => {
        loanStore.getLoan(user.id).then((data) => {
          if(!data.code)  throw data
            myLoan.value = data.data
        }).catch((e) => {
          showNotify('negative', 'error al obtener prestamo activo')
        })
      }
      const needPay = () =>{
        let amount = 0
        myLoan.value.pays.forEach(pay => {
          amount += pay.amount
        });
        return myLoan.value.amount_to_pay - amount
      }

      const amountQuote = () => {
        return myLoan.value.amount_to_pay/parseInt(myLoan.value.quotas)
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
        numberFormat,
        moment,
        goTo,
        needPay,
        amountQuote,
      }
    },
  }
</script>
<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>