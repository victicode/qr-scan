<template>
  <div v-if="Object.values(myLoan).length > 0">
    <div class="q-pa-md">
      <div class="text-h6 text-bold">Paga tu préstamo y pedí un rekutu  </div>
      <div class="text-subtitle2 text-weight-medium">Total a pagar</div>
    </div>
    <div class="q-px-md-xl q-px-lg q-mt-md" >
      <div class="q-px-md-xl">
          <q-input 
            v-model="myLoan.amounToPay" 
            prefix="Gs." 
            disable
            dense  class="amount_input" mask="#.###.###" maxlength="9" reverse-fill-mask
            
          />
      </div>
    </div>
    <div class="q-px-md-xl q-px-md">
      
      <div class="q-mt-lg  q-px-md-xl">
        <q-btn  
          color="primary" class="w-100 q-pa-sm q-pt-md" 
          label="Pagar con Tpago" 
          @click="getPayUrl()"
          :loading="(loading == 'tpago')"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
      <div class="q-mt-lg  q-px-md-xl">
        <q-btn  
          color="grey-9" class="w-100 q-pa-sm q-pt-md" 
          label="Pagar con transferencia bancaria" 
          @click="showModal('transfer')"
          :loading="(loading == 'transfer')"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
      <div class="q-mt-md  q-px-md-xl">
        <q-btn  
          color="positive" class="w-100 q-pa-sm q-pt-md" 
          label="Pagar con tarjeta vinculada" 
          @click="payWithCard()"
          :loading="(loading == 'card')"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
    </div>
    <div class="q-px-md q-pt-lg q-px-md-xl q-mx-md-xl flex justify-between" v-if="Object.values(card).length > 0">
      <div>
        <div class="text-subtitle1 text-weight-medium">Nombre</div>
        <div class="text-weight-medium text-subtitle2">Tarjeta de Crédito ****{{ card.number.substring(card.number.length - 4) }}</div>
      </div>
      <div>
        <div class="text-subtitle1 text-weight-medium text-right">Vencimiento</div>
        <div class="text-weight-medium text-subtitle2 text-right">{{ card.due_date }}</div>
      </div>
    </div>
    <div class="q-px-md q-pt-lg q-px-md-xl q-mx-md-xl flex justify-between" v-else>
      <div>
        <div class="text-subtitle1 text-weight-medium">
          <q-skeleton type="QBadge" />
        </div>
        <div class="text-weight-medium text-subtitle2 q-mt-sm">
          <q-skeleton type="QBadge" />
        </div>
      </div>
      <div>
        <div class="text-subtitle1 text-weight-medium text-right">
          <q-skeleton type="QBadge" />
        </div>
        <div class="text-weight-medium text-subtitle2 text-right q-mt-sm">
          <q-skeleton type="QBadge" />
        </div>
      </div>
    </div>
    <div v-if="showDialog == 'card'">
      <doneModal :dialog="showDialog == 'card' " text="Préstamo pagado" />
    </div>
    <div v-if="showDialog == 'tpago'">
      <waitModal :dialog="showDialog == 'tpago' " text="Préstamo pagado" />
    </div>
    <div v-if="showDialog == 'transfer'">
      <transferModal :dialog="showDialog == 'transfer'" :loan="myLoan" @hideModal="hideModal" @donePay="doneModal()" />
    </div>
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { inject, ref,} from 'vue'
  import { useRouter } from 'vue-router'
  import { useLoanStore } from '@/services/store/loan.store'
  import { useCardStore } from '@/services/store/card.store'
  import { usePayStore } from '@/services/store/pay.store'
  import doneModal from '@/components/layouts/modals/doneModal.vue';
  import waitModal from '@/components/layouts/modals/waitModal.vue';
  import transferModal from '@/components/loan/modals/transferModal.vue';
  import { useQuasar } from 'quasar';
  

  export default {
    components: {
      doneModal,
      waitModal,
      transferModal,
    },
    setup() {
      //vue provider
      const user = useAuthStore().user;
      const icons = inject('ionIcons')
      const router = useRouter()
      const loanStore = useLoanStore();
      const cardStore = useCardStore()
      const payStore = usePayStore()
      const myLoan = ref({})
      const card = ref({})
      const showDialog = ref(false)
      const loading = ref(false)
      const payUrl = ref('')
      const q = useQuasar()

      const activeLoan = () => {
        loanStore.getLoan(user.id).then((data) => {
          if(!data.code)  throw data
            myLoan.value = data.data

            quotaAmount()
        }).catch((e) => {
          showNotify('negative', 'error al obtener prestamo activo')
        })
      }
      
      const getLinkCard = () => {
        cardStore.getCard(user.id).then((data) => {
          if(data.code !== 200) throw data
          setTimeout(()=>{
            card.value = data.data ? Object.assign(data.data) : {}
          }, 1000)
        }).catch((response) => {
          showNotify('negative', response)
        })
      }

      const payWithCard = () => {
        loadingShow('card')

        const data = new FormData
        data.append('loan_id', myLoan.value.id)
        data.append('amount', myLoan.value.amounToPay)
        data.append('type', 1)
        data.append('status', 1)
        data.append('concept', createConceptPay())

        payStore.createPay(data)
        .then((response) => {
          if(response.code !== 200) throw response
          
          setTimeout(() => {
            doneModal()
          }, 4000);

        }).catch((response) => {
          showNotify('negative', response.data.error)
          loadingShow('')
        })
      } 

      const getPayUrl = () => {
        loadingShow('tpago')
        showModal('tpago')
        const data = {
          amount: myLoan.value.amounToPay,
          type: 1,
          debitDay: new Date().getDate()
        }
        payStore.payRequest(data)
        .then((response) => {
          if(response.code !== 200) throw response

          payUrl.value = response.data.payment_link.link_url ?? response.data.subscription_link

          setTimeout(() => {
            loadingShow('')
            hideModal()
            openTpagoWindow()
          }, 1000);
        }).catch(() =>{
          showNotify('negative', 'Error para procesar el pago')
        })

      }

      const openTpagoWindow = () => {
        var ventana = window.open(payUrl.value, 'pago', `height=${q.screen.height},width=${q.screen.width}`);
        setTimeout(() => {
          ventana.document.close();
          ventana.focus();
          return true;
        }, 1000);
      }

      const showModal = (modal) => {
        showDialog.value = modal
      }
      const hideModal = () => {
        showDialog.value = ''
      }
      const doneModal = () => {
        showModal('card')
        setTimeout(() => {
          router.go(-1)
        }, 4000);
      }
      const loadingShow = (show) => {
        loading.value = show
      }

      const quotaAmount = () => {
        myLoan.value.amounToPay = parseFloat(myLoan.value.amount_to_pay)/parseFloat(myLoan.value.quotas)
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
      const createConceptPay = () => {
        return `Pago de cuota ${myLoan.value.pays.length + 1 }/ ${myLoan.value.quotas}`
      }

      onMounted(() => {
        activeLoan();
        getLinkCard();
      })

      // Data
      return{
        icons,
        user,
        router,
        myLoan,
        card,
        showDialog,
        loading,
        payWithCard,
        quotaAmount,
        getPayUrl,
        showModal,
        hideModal,
        doneModal,
      }
    },
  }
</script>
<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>
<style lang="scss" >
.amount_input {
  border-bottom: 1px solid $grey-6 ;
  display: flex;
  justify-content: center;
  position: relative;
  &.q-field--disabled .q-field__inner{
    background: transparent!important;
  }
  &.q-field--disabled .q-placeholder{
    opacity: 1!important;
  }
  & .q-field__control::before {
    border: 0px!important;
  }
  & .q-field__control-container{
    text-align: center;
  }
  & .q-field__prefix{
    position: absolute;
    font-size: 40px;
    margin-right: 10px;
    transform: translateY(3.5px) translateX(230%);
  }
  & .q-field__native{
    font-size: 40px;
    text-align: center;
  }
}
@media screen and (max-width: 780px){
  .amount_input { 
    & .q-field__prefix{
      transform: translateY(3.5px) translateX(40%)!important;
    }
  }
}

</style>
